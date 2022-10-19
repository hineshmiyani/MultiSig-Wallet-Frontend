import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
  StepConnector,
} from "@mui/material";
import { useContractFunction, useEthers } from "@usedapp/core";
import ConnectWallet from "./ConnectWallet";
import NameOfWallet from "./NameOfWallet";
import AddOwners from "./AddOwners";
import Review from "./Review";
import { customStepperConnector, customStepperStyles } from "../../theme";
import { contract } from "../../constants";
import toast from "react-hot-toast";
import { useGetWallets, useGetWalletsCount } from "../../hooks";

const steps = [
  "Connect Wallet",
  /* "Name", */ "Owners and Confirmations",
  "Review",
];
const getStepDescription = (step: number) => {
  switch (step) {
    case 0:
      return <ConnectWallet />;
    // case 1:
    //   return <NameOfWallet />;
    case 1:
      return <AddOwners />;
    case 2:
      return <Review />;
  }
};

const CreateWallet = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<any>({});
  const [disabledBtn, setDisabledBtn] = useState(false);

  const totalSteps = steps.length;
  const completedSteps = Object.values(completed).filter((step) => step).length;
  const allStepsCompleted = completedSteps === totalSteps;

  const { account } = useEthers();
  const { state, send } = useContractFunction(contract, "createMultiSig", {});
  const totalWallet = useGetWalletsCount([account?.toString()]);
  const walletList = useGetWallets(
    [account?.toString()],
    parseInt(totalWallet)
  );

  const createWallet = async () => {
    setDisabledBtn(true);
    const { ownersList, requiredConfirmations } =
      sessionStorage.getItem("ownersData") &&
      JSON.parse(sessionStorage.getItem("ownersData") || "");
    // console.log({ ownersList, requiredConfirmations });
    send(ownersList, requiredConfirmations);
  };

  useEffect(() => {
    console.log({ state });
    let loadingToast, confirmTxWallet;
    switch (state.status) {
      case "PendingSignature":
        confirmTxWallet = toast.loading("Please Confirm Transaction...");
        break;
      case "Mining":
        toast.dismiss(confirmTxWallet);
        loadingToast = toast.loading("Creating Wallet...");
        break;
      case "Success":
        toast.dismiss(loadingToast);
        toast.success("Wallet successfully created!", { duration: 5000 });
        setDisabledBtn(false);
        setTimeout(() => {
          router.push(`/dashboard/${walletList.at(-1)}`);
        }, 5000);
        break;
      case "Exception":
        toast.dismiss(loadingToast);
        toast.error(state?.errorMessage || "");
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.error(state?.errorMessage || "");
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [state]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCompleted((prevCompleted: any) => {
      return { ...prevCompleted, [activeStep]: false };
    });
  };

  const handleNext = () => {
    setCompleted((prevCompleted: any) => {
      return { ...prevCompleted, [activeStep]: true };
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "80%", m: "20px auto" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StepConnector sx={customStepperConnector} />}
      >
        {steps.map((step, index) => (
          <Step
            key={step}
            completed={completed[index]}
            sx={customStepperStyles}
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {allStepsCompleted ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>All Steps Completed</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              width: "90%",
              m: "auto",
            }}
          >
            {getStepDescription(activeStep)}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                gap: 1,
              }}
            >
              <Button
                onClick={handleBack}
                variant="text"
                disabled={activeStep === 0}
                sx={{
                  color: "primary.buttonColor",
                  p: "auto 12px",
                  width: "100px",
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "primary.buttonColor",
                  color: "primary.contrastText",
                  p: "auto 12px",
                  width: "100px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                  },
                }}
                disabled={disabledBtn}
                onClick={() => {
                  activeStep === totalSteps - 1 ? createWallet() : handleNext();
                }}
              >
                {/* {completedSteps === totalSteps - 1 ? "Create" : "Continue"} */}
                {activeStep === totalSteps - 1 ? "Create" : "Continue"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CreateWallet;
