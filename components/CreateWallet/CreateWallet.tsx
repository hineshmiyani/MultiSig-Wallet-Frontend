import React, { useState } from "react";
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import ConnectWallet from "./ConnectWallet";
import NameOfWallet from "./NameOfWallet";
import AddOwners from "./AddOwners";
import Review from "./Review";
import { customStepperConnector, customStepperStyles } from "../../theme";
import { useCall, useContractFunction } from "@usedapp/core";
import { contract } from "../../constants";

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
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<any>({});

  const totalSteps = steps.length;
  const completedSteps = Object.values(completed).filter((step) => step).length;
  const allStepsCompleted = completedSteps === totalSteps;

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

  // {console.log({
  //   allStepsCompleted,
  //   totalSteps,
  //   completedSteps,
  //   completed,
  // })}

  const { state, send } = useContractFunction(contract, "createMultiSig", {});
  // const data = useCall({
  //   contract: contract,
  //   method: "getOwners",
  //   args: ["0x630A676DEca0952791Ea3A6BB9751d2f06540ee1", 0],
  // });
  const createWallet = async () => {
    // const { ownersList, requiredConfirmations } =
    //   sessionStorage.getItem("ownersData") &&
    //   JSON.parse(sessionStorage.getItem("ownersData") || "");
    // console.log({ ownersList, requiredConfirmations });
    // send(ownersList, requiredConfirmations);
    // console.log({ data });
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

      <div>
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
      </div>
    </Box>
  );
};

export default CreateWallet;
