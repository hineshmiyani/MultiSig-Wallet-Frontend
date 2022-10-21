import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContractFunction, useEthers } from "@usedapp/core";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  Box,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  Typography,
  Button,
} from "@mui/material";
import { Check, CircleOutlined } from "@mui/icons-material";
import AccountAvatar from "../AccountAvatar";
import { useIsTxConfirmed } from "../../hooks";
import { contract } from "../../constants";
import toast from "react-hot-toast";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#f02525",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#f02525",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#bdbdbd",
    borderTopWidth: 3,
    borderRadius: 1,
    minHeight: "14px",
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#bdbdbd",
    display: "flex",
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    ...(ownerState.active && {
      color: "#f02525",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#f02525",
      zIndex: 1,
      fontSize: 22,
    },
    "& .QontoStepIcon-circle": {
      fontSize: "16px",
      // width: 16,
      // height: 16,
      // borderRadius: "50%",
      // backgroundColor: "currentColor",
    },
  })
);

const QontoStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <CircleOutlined className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
};

type Props = {
  transaction: any;
  confirmationsRequired: number;
  txIndex: number;
};
const TransactionProgressStepper: React.FC<Props> = ({
  transaction,
  confirmationsRequired,
  txIndex,
}) => {
  const router = useRouter();
  const { walletAddress, id: walletId } = router.query;
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const { account } = useEthers();
  const isTxConfirmed = useIsTxConfirmed([
    walletAddress && walletAddress,
    txIndex && txIndex,
    account && account?.toString(),
  ]);

  useEffect(() => {
    if (transaction?.executed === true) {
      setActiveStep(4);
    } else if (
      parseInt(transaction?.numConfirmations) >= confirmationsRequired
    ) {
      setActiveStep(3);
    } else {
      setActiveStep(1);
    }
  }, [transaction?.numConfirmations]);

  const { state: rejectConfirmationState, send: reject } = useContractFunction(
    contract,
    "revokeConfirmation"
  );

  const { state: confirmTxState, send: confirmTx } = useContractFunction(
    contract,
    "confirmTransaction"
  );

  const { state: executeTxState, send: executeTx } = useContractFunction(
    contract,
    "executeTransaction"
  );

  const executeTransaction = () => {
    setDisabledBtn(true);
    executeTx(account, walletId, txIndex);
  };

  const confirmTransaction = () => {
    setDisabledBtn(true);
    confirmTx(account, walletId, txIndex);
  };

  const rejectConfirmation = () => {
    setDisabledBtn(true);
    reject(account, walletId, txIndex);
  };

  useEffect(() => {
    console.log({ executeTxState });
    let loadingToast, confirmTxWallet, successToast: any;
    switch (executeTxState?.status) {
      case "PendingSignature":
        confirmTxWallet = toast.loading("Please Confirm Transaction...");
        break;
      case "Mining":
        toast.dismiss(confirmTxWallet);
        loadingToast = toast.loading("Executing Transaction...");
        break;
      case "Success":
        toast.dismiss(loadingToast);
        successToast = toast.success(
          "A Transaction has been successfully Executed! ",
          {
            duration: 5000,
          }
        );
        setDisabledBtn(false);
        setTimeout(() => {
          toast.dismiss(successToast);
        }, 6000);
        break;
      case "Exception":
        toast.dismiss(loadingToast);
        toast.error(executeTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.dismiss(loadingToast);
        toast.error(executeTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [executeTxState]);

  useEffect(() => {
    console.log({ confirmTxState });
    let loadingToast, confirmTxWallet, successToast: any;
    switch (confirmTxState?.status) {
      case "PendingSignature":
        confirmTxWallet = toast.loading("Please Confirm Transaction...");
        break;
      case "Mining":
        toast.dismiss(confirmTxWallet);
        loadingToast = toast.loading("Confirming Transaction...");
        break;
      case "Success":
        toast.dismiss(loadingToast);
        successToast = toast.success(
          "A Transaction has been successfully Confirmed! ",
          {
            duration: 5000,
          }
        );
        setDisabledBtn(false);
        setTimeout(() => {
          toast.dismiss(successToast);
        }, 6000);
        break;
      case "Exception":
        toast.dismiss(loadingToast);
        toast.error(confirmTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.dismiss(loadingToast);
        toast.error(confirmTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [confirmTxState]);

  useEffect(() => {
    console.log({ rejectConfirmationState });
    let loadingToast, confirmTxWallet, successToast: any;
    switch (rejectConfirmationState?.status) {
      case "PendingSignature":
        confirmTxWallet = toast.loading("Please Confirm Transaction...");
        break;
      case "Mining":
        toast.dismiss(confirmTxWallet);
        loadingToast = toast.loading("Rejecting Confirmation...");
        break;
      case "Success":
        toast.dismiss(loadingToast);
        successToast = toast.success(
          "A confirmation has been successfully rejected! ",
          {
            duration: 5000,
          }
        );
        setDisabledBtn(false);
        setTimeout(() => {
          toast.dismiss(successToast);
        }, 6000);
        break;
      case "Exception":
        toast.dismiss(loadingToast);
        toast.error(rejectConfirmationState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.dismiss(loadingToast);
        toast.error(rejectConfirmationState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [rejectConfirmationState]);

  const steps = [
    "Created",
    <Typography key="second" variant="body2">
      Confimations ({parseInt(transaction?.numConfirmations)} of{" "}
      {confirmationsRequired})
    </Typography>,
    <AccountAvatar key="third" toAddress={transaction?.to} truncate={true} />,
    "Executed",
  ];
  return (
    <Stack sx={{ width: "100%" }}>
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              sx={{
                py: "4px",
                "& .MuiStepLabel-label.Mui-active, .MuiStepLabel-label.Mui-completed":
                  {
                    color: "primary.buttonColor",
                    fontWeight: "600",
                  },
                "& .MuiStepLabel-label.Mui-active > *, .MuiStepLabel-label.Mui-completed > *":
                  {
                    fontWeight: "600",
                  },
              }}
              StepIconComponent={QontoStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {transaction?.executed === false && (
        <Box
          sx={{
            my: 2,
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          {parseInt(transaction?.numConfirmations) >= confirmationsRequired ? (
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "primary.buttonColor",
                color: "primary.contrastText",
                px: "12px",
                width: "100px",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.buttonColor",
                  transform: "scale(1.1)",
                },
              }}
              disabled={disabledBtn}
              onClick={() => executeTransaction()}
            >
              Execute
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "primary.buttonColor",
                color: "primary.contrastText",
                px: "12px",
                width: "100px",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.buttonColor",
                  transform: "scale(1.1)",
                },
              }}
              disabled={isTxConfirmed?.[0] || disabledBtn}
              onClick={() => confirmTransaction()}
            >
              Confirm
            </Button>
          )}

          <Button
            variant="outlined"
            disabled={disabledBtn}
            sx={{
              color: "primary.buttonColor",
              borderColor: "primary.buttonColor",
              px: "12px",
              width: "100px",
              transition: " all .2s ease-in-out",
              "&:hover": {
                borderColor: "primary.buttonColor",
                transform: "scale(1.1)",
              },
            }}
            onClick={() => rejectConfirmation()}
          >
            Reject
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default TransactionProgressStepper;
