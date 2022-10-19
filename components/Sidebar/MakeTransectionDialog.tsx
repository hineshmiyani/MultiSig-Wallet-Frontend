import React, { useEffect, useState } from "react";
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
import { TollRounded, Close, ContentCopyRounded } from "@mui/icons-material";
import { useContractFunction, useEtherBalance, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import toast from "react-hot-toast";
import Image from "next/image";
import { formatEther } from "@ethersproject/units";
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

type Props = {
  children?: JSX.Element;
};

const MakeTransectionDialog: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [tooltipTitle, setTooltipTitle] = useState<string>("Copy to clipboard");
  const [showDepositForm, setShowDepositForm] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);

  const { account, library } = useEthers();
  const walletBalance = useEtherBalance(account?.toString());
  const { state, send } = useContractFunction(contract, "deposit");

  const depositEther = () => {
    setDisabledBtn(true);
    depositAmount &&
      send(account, 0, { value: utils.parseEther(depositAmount.toString()) });
  };

  useEffect(() => {
    console.log({ state });
    let loadingToast, confirmTxWallet, successToast: any;
    switch (state.status) {
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
        toast.error(state?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      case "Fail":
        toast.dismiss(loadingToast);
        toast.error(state?.errorMessage || "", {
          duration: 5000,
        });
        setDisabledBtn(false);
        break;
      default:
        break;
    }
  }, [state]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowDepositForm(false);
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
          Send
        </CustomDialogTitle>
        <DialogContent
          dividers
          sx={{
            p: "16px 24px",
            textAlign: "center",
            width: "620px",
          }}
        >
          {!showDepositForm && (
            <Button
              startIcon={<TollRounded sx={{ fontSize: "24px" }} />}
              sx={{
                backgroundColor: "primary.buttonColor",
                border: "1px solid",
                borderColor: "primary.buttonColor",
                color: "primary.contrastText",
                p: "10px 40px",
                m: "30px",
                transition: " all .2s ease-in-out",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "primary.buttonColor",
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => setShowDepositForm(true)}
            >
              Deposit Funds
            </Button>
          )}

          {showDepositForm && (
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
                  width: "160px",
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
                      ? parseFloat(formatEther(walletBalance)).toFixed(2)
                      : 0.0}{" "}
                    GOR
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
        </DialogContent>
        {showDepositForm && (
          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
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
          </DialogActions>
        )}
      </CustomDialog>
    </Box>
  );
};

export default MakeTransectionDialog;
