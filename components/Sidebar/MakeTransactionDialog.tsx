import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { utils } from "ethers";
import { formatEther, parseEther } from "@ethersproject/units";
import { useContractFunction, useEtherBalance, useEthers } from "@usedapp/core";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Typography,
  Stack,
  Tooltip,
  Divider,
  TextField,
} from "@mui/material";
import {
  TollRounded,
  Close,
  ContentCopyRounded,
  CallMade,
} from "@mui/icons-material";
import { contract } from "../../constants";
import ShareIcon from "../ShareIcon";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

const CustomDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, py: 2, px: 3 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

enum DialogStep {
  CHOOSE_TRANSACTION = "CHOOSE_TRANSACTION",
  DEPOSIT_FUNDS = "DEPOSIT_FUNDS",
  SEND_FUNDS = "SEND_FUNDS",
}

type Props = {
  children?: JSX.Element;
  walletAddress: string;
};
const MakeTransactionDialog: React.FC<Props> = ({
  children,
  walletAddress,
}) => {
  const router = useRouter();
  const { id: walletId } = router?.query;

  const [open, setOpen] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [tooltipTitle, setTooltipTitle] = useState<string>("Copy to clipboard");
  const [showDialogStep, setShowDialogStep] = useState<string>(
    DialogStep.CHOOSE_TRANSACTION
  );
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const { account, library } = useEthers();
  const accountBalance = useEtherBalance(account?.toString());
  const walletBalance = useEtherBalance(walletAddress);
  const { state: depositTxState, send: deposit } = useContractFunction(
    contract,
    "deposit"
  );
  const { state: submitTxState, send: submitTx } = useContractFunction(
    contract,
    "submitTransaction"
  );

  const depositEther = () => {
    setDisabledBtn(true);
    depositAmount !== 0 &&
      deposit(account, 0, {
        value: utils.parseEther(depositAmount.toString()),
      });
  };

  const sendEther = () => {
    setDisabledBtn(true);
    sendAmount !== 0 &&
      recipientAddress &&
      submitTx(
        account,
        0,
        recipientAddress,
        parseEther(sendAmount?.toString()),
        "0x00"
      );
  };

  useEffect(() => {
    console.log({ submitTxState });
    let loadingToast, confirmTxWallet, successToast: any;
    switch (submitTxState?.status) {
      case "PendingSignature":
        confirmTxWallet = toast.loading("Please Confirm Transaction...");
        break;
      case "Mining":
        toast.dismiss(confirmTxWallet);
        loadingToast = toast.loading("Submitting Transaction...");
        break;
      case "Success":
        toast.dismiss(loadingToast);
        successToast = toast.success(
          "Transaction has been successfully submitted! ",
          {
            duration: 5000,
          }
        );
        setDisabledBtn(false);
        setTimeout(() => {
          toast.dismiss(successToast);
          router.push({
            pathname: `/dashboard/${walletAddress}/transactions`,
            query: { id: walletId },
          });
        }, 6000);
        handleClose();
        break;
      case "Exception":
        toast.dismiss(loadingToast);
        toast.error(submitTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.dismiss(loadingToast);
        toast.error(submitTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [submitTxState]);

  useEffect(() => {
    console.log({ depositTxState });
    let loadingToast, confirmTxWallet, successToast: any;
    switch (depositTxState?.status) {
      case "PendingSignature":
        confirmTxWallet = toast.loading("Please Confirm Transaction...");
        break;
      case "Mining":
        toast.dismiss(confirmTxWallet);
        loadingToast = toast.loading("Adding Fund...");
        break;
      case "Success":
        toast.dismiss(loadingToast);
        successToast = toast.success(
          "Ether has been successfully deposited! ",
          {
            duration: 5000,
          }
        );
        setDisabledBtn(false);
        setTimeout(() => {
          toast.dismiss(successToast);
        }, 6000);
        handleClose();
        break;
      case "Exception":
        toast.dismiss(loadingToast);
        toast.error(depositTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.dismiss(loadingToast);
        toast.error(depositTxState?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [depositTxState]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowDialogStep(DialogStep.CHOOSE_TRANSACTION);
      setDepositAmount(0);
    }, 500);
  };

  return (
    <Box>
      {children && React.cloneElement(children, { onClick: handleClickOpen })}
      <CustomDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {showDialogStep === DialogStep.CHOOSE_TRANSACTION && "Send"}
          {showDialogStep === DialogStep.DEPOSIT_FUNDS && "Deposit funds"}
          {showDialogStep === DialogStep.SEND_FUNDS && "Send funds"}
        </CustomDialogTitle>
        <DialogContent
          dividers
          sx={{
            p: "16px 24px",
            textAlign: "center",
            width: "620px",
          }}
        >
          {/* DialogStep -> CHOOSE_TRANSACTION */}
          {showDialogStep === DialogStep.CHOOSE_TRANSACTION && (
            <Stack alignItems="center" m="30px" spacing={4}>
              <Button
                startIcon={<TollRounded sx={{ fontSize: "24px !important" }} />}
                sx={{
                  backgroundColor: "primary.buttonColor",
                  border: "1px solid",
                  borderColor: "primary.buttonColor",
                  color: "primary.contrastText",
                  p: "10px 40px",
                  width: "240px",
                  transition: " all .2s ease-in-out",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => setShowDialogStep(DialogStep.DEPOSIT_FUNDS)}
              >
                Deposit Funds
              </Button>
              <Button
                startIcon={<CallMade sx={{ fontSize: "24px !important" }} />}
                sx={{
                  backgroundColor: "primary.buttonColor",
                  border: "1px solid",
                  borderColor: "primary.buttonColor",
                  color: "primary.contrastText",
                  p: "10px 40px",
                  width: "240px",
                  transition: " all .2s ease-in-out",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => setShowDialogStep(DialogStep.SEND_FUNDS)}
              >
                Send Funds
              </Button>
            </Stack>
          )}

          {/* DialogStep -> DEPOSIT_FUNDS */}
          {showDialogStep === DialogStep.DEPOSIT_FUNDS && (
            <Box textAlign="left">
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "500" }}
              >
                Sending from
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1.2}>
                <Image
                  src="/asset/images/avatar.png"
                  alt=""
                  width={34}
                  height={34}
                  className="rounded-full object-cover"
                />
                <Typography variant="body2">
                  <Typography variant="caption" fontWeight="bold">
                    {library?.network?.name?.substring(0, 2)}
                    {library?.network?.name?.substring(3, 4)}:
                  </Typography>{" "}
                  {account}
                </Typography>

                <Stack spacing={0.5} direction="row" alignItems="center">
                  <Tooltip title={tooltipTitle} placement="top">
                    <IconButton
                      size="medium"
                      sx={{ backgroundColor: "secondary.contrastText" }}
                      onClick={() => {
                        account && navigator.clipboard.writeText(account);
                        setTooltipTitle("Copied");
                        setTimeout(() => {
                          setTooltipTitle("Copy to clipboard");
                        }, 1200);
                      }}
                    >
                      <ContentCopyRounded
                        sx={{ color: "disabled.main", fontSize: "20px" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View on goerli.etherscan.io" placement="top">
                    <IconButton
                      size="small"
                      sx={{ backgroundColor: "secondary.contrastText" }}
                      onClick={() => {
                        window.open(
                          `https://${library?.network?.name}.etherscan.io/address/${account}`,
                          "_blank"
                        );
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Box
                sx={{
                  backgroundColor: "secondary.contrastText",
                  m: "2px 0 0 44px",
                  p: "5px 10px",
                  width: "max-content",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                <Typography variant="body2">
                  Balance :{" "}
                  <Typography variant="body2" component="span" fontWeight="600">
                    {" "}
                    {accountBalance
                      ? parseFloat(formatEther(accountBalance)).toFixed(4)
                      : 0.0}{" "}
                    ETH
                  </Typography>{" "}
                </Typography>
              </Box>

              <Divider sx={{ mt: "24px", mb: "20px" }} />

              <Box>
                <Typography variant="body2" component="p" my={1}>
                  Amount
                </Typography>
                <TextField
                  fullWidth
                  color="error"
                  variant="outlined"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => {
                    setDepositAmount(+e.target.value);
                  }}
                  placeholder="Enter an amount*"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  required
                />
              </Box>
            </Box>
          )}

          {/* DialogStep -> SEND_FUNDS  */}
          {showDialogStep === DialogStep.SEND_FUNDS && (
            <Box textAlign="left">
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "500" }}
              >
                Sending from
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1.2}>
                <Image
                  src="/asset/images/walletAvatar.png"
                  alt=""
                  width={34}
                  height={34}
                  className="rounded-full object-cover"
                />
                <Typography variant="body2">
                  <Typography variant="caption" fontWeight="bold">
                    {library?.network?.name?.substring(0, 2)}
                    {library?.network?.name?.substring(3, 4)}:
                  </Typography>{" "}
                  {walletAddress ? walletAddress : ""}
                </Typography>

                <Stack spacing={0.5} direction="row" alignItems="center">
                  <Tooltip title={tooltipTitle} placement="top">
                    <IconButton
                      size="medium"
                      sx={{ backgroundColor: "secondary.contrastText" }}
                      onClick={() => {
                        account && navigator.clipboard.writeText(account);
                        setTooltipTitle("Copied");
                        setTimeout(() => {
                          setTooltipTitle("Copy to clipboard");
                        }, 1200);
                      }}
                    >
                      <ContentCopyRounded
                        sx={{ color: "disabled.main", fontSize: "20px" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View on goerli.etherscan.io" placement="top">
                    <IconButton
                      size="small"
                      sx={{ backgroundColor: "secondary.contrastText" }}
                      onClick={() => {
                        window.open(
                          `https://${library?.network?.name}.etherscan.io/address/${account}`,
                          "_blank"
                        );
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Box
                sx={{
                  backgroundColor: "secondary.contrastText",
                  m: "2px 0 0 44px",
                  p: "5px 10px",
                  width: "max-content",
                  textAlign: "center",
                  borderRadius: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                <Typography variant="body2">
                  Balance :{" "}
                  <Typography variant="body2" component="span" fontWeight="600">
                    {" "}
                    {walletBalance
                      ? parseFloat(formatEther(walletBalance)).toFixed(4)
                      : 0.0}{" "}
                    ETH
                  </Typography>{" "}
                </Typography>
              </Box>

              <Divider sx={{ mt: "24px", mb: "20px" }} />

              <Box>
                <Typography variant="body2" component="p" my={1}>
                  Recipient *
                </Typography>
                <TextField
                  fullWidth
                  color="error"
                  variant="outlined"
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => {
                    setRecipientAddress(e.target.value);
                  }}
                  placeholder="Enter an recipient address*"
                  InputLabelProps={{ shrink: true }}
                  required
                />

                <Typography variant="body2" component="p" my={1}>
                  Amount *
                </Typography>
                <TextField
                  fullWidth
                  color="error"
                  variant="outlined"
                  type="number"
                  value={sendAmount}
                  onChange={(e) => {
                    setSendAmount(+e.target.value);
                  }}
                  placeholder="Enter an amount*"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  required
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        {/* DialogStep -> DEPOSIT_FUNDS */}
        {showDialogStep === DialogStep.DEPOSIT_FUNDS && (
          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
            <>
              <Button
                sx={{
                  p: "8px 24px",
                  transition: " all .2s ease-in-out",
                  color: "primary.buttonColor",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                onClick={() => depositEther()}
                sx={{
                  backgroundColor: "primary.buttonColor",
                  color: "primary.contrastText",
                  transition: " all .2s ease-in-out",
                  p: "8px 24px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                    transform: "scale(1.05)",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.300",
                  },
                }}
                disabled={depositAmount === 0 || disabledBtn}
              >
                Submit
              </Button>
            </>
          </DialogActions>
        )}

        {/* DialogStep -> SEND_FUNDS  */}
        {showDialogStep === DialogStep.SEND_FUNDS && (
          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
            <>
              <Button
                sx={{
                  p: "8px 24px",
                  transition: " all .2s ease-in-out",
                  color: "primary.buttonColor",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                onClick={() => sendEther()}
                sx={{
                  backgroundColor: "primary.buttonColor",
                  color: "primary.contrastText",
                  transition: " all .2s ease-in-out",
                  p: "8px 24px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                    transform: "scale(1.05)",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.300",
                  },
                }}
                disabled={!recipientAddress || sendAmount === 0 || disabledBtn}
              >
                Submit
              </Button>
            </>
          </DialogActions>
        )}
      </CustomDialog>
    </Box>
  );
};

export default MakeTransactionDialog;
