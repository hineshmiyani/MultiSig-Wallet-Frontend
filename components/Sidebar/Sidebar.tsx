import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useEtherBalance, useEthers } from "@usedapp/core";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddCircleOutlined, ContentCopyRounded } from "@mui/icons-material";
import { useGetOwners, useGetWallets, useGetWalletsCount } from "../../hooks";
import ShareIcon from "../ShareIcon";
import Image from "next/image";
import { formatEther } from "@ethersproject/units";
import MakeTransactionDialog from "./MakeTransactionDialog";
import SideDrawer from "./SideDrawer";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const { account, library } = useEthers();
  const [tooltipTitle, setTooltipTitle] = useState<string>("Copy to clipboard");

  const totalWallet = useGetWalletsCount([account?.toString()]);
  const walletList = useGetWallets(
    [account?.toString()],
    parseInt(totalWallet)
  );

  const etherBalance = useEtherBalance(walletList?.[0]);

  useEffect(() => {
    console.log({
      walletList,
    });
  }, []);

  return (
    <Box
      sx={{
        height: "max(calc(100vh - 66px), 100%)",
        backgroundColor: "primary.contrastText",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        position: "fixed",
        width: "inherit",
      }}
    >
      {/* <Box textAlign="center" p={3}>
        <Image
          src="/asset/images/lockWallet.svg"
          height={45}
          width={45}
          className="rounded-full object-cover"
          alt=""
        />
      </Box> */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        p={2}
        spacing={0.5}
      >
        <IconButton
          sx={{
            color: "primary.buttonColor",
            transition: " all .2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          size="small"
          onClick={() => router.push("/welcome")}
        >
          <AddCircleOutlined sx={{ fontSize: "36px" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: "500", ml: 1 }}
        >
          Add Wallet
        </Typography>
      </Stack>

      <Divider light />

      {router.route.includes("dashboard") &&
        walletList?.slice(1, 2)?.map((wallet: "string") => (
          <Box key={wallet}>
            <Stack p={2} spacing={1.75} alignItems="center">
              <Image
                src="/asset/images/walletAvatar.png"
                width="48"
                height="48"
                alt=""
                className="rounded-full object-cover"
              />
              <Typography variant="body2">
                <Typography variant="caption" fontWeight="bold">
                  {library?.network?.name?.substring(0, 2)}
                  {library?.network?.name?.substring(3, 4)}:
                </Typography>{" "}
                {wallet?.slice(0, 6)}
                ...{wallet?.slice(-4)}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={tooltipTitle} placement="top">
                  <IconButton
                    size="medium"
                    sx={{ backgroundColor: "secondary.contrastText" }}
                    onClick={() => {
                      wallet && navigator.clipboard.writeText(wallet);
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
                        `https://${library?.network?.name}.etherscan.io/address/${wallet}`,
                        "_blank"
                      );
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Stack alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    color: "primary.main",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Balance
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  {etherBalance ? formatEther(etherBalance) : 0.0} ETH
                </Typography>
              </Stack>

              <MakeTransactionDialog walletAddress={wallet}>
                <Button
                  sx={{
                    backgroundColor: "primary.buttonColor",
                    border: "1px solid",
                    borderColor: "primary.buttonColor",
                    color: "primary.contrastText",
                    p: "8px 12px",
                    transition: " all .2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "primary.buttonColor",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  New Transaction
                </Button>
              </MakeTransactionDialog>
            </Stack>
          </Box>
        ))}

      <Divider light />
      <SideDrawer walletList={walletList} />
    </Box>
  );
};

export default Sidebar;
