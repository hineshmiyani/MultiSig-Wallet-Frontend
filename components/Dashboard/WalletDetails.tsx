import React from "react";
import Image from "next/image";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Stack,
  Box,
  Button,
} from "@mui/material";
import MakeTransectionDialog from "../Sidebar/MakeTransectionDialog";

type Props = { walletAddress: string };

const WalletDetails: React.FC<Props> = ({ walletAddress }) => {
  const { library } = useEthers();
  const etherBalance = useEtherBalance(walletAddress);

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          my: "24px",
        }}
      >
        Dashboard
      </Typography>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          maxWidth: "100%",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Card
          sx={{
            maxWidth: "100%",
            flexBasis: "100%",
            borderRadius: "8px",
            boxShadow: "0",
          }}
        >
          <CardContent sx={{ p: "24px 24px 0", position: "relative" }}>
            <Image
              src="/asset/images/walletAvatar.png"
              width="48"
              height="48"
              alt=""
              className="rounded-full object-cover"
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              <Typography variant="body1" component="span" fontWeight="bold">
                {library?.network?.name?.substring(0, 2)}
                {library?.network?.name?.substring(3, 4)}:
              </Typography>{" "}
              {walletAddress}
            </Typography>
            <Chip
              label={library?.network?.name}
              sx={{
                backgroundColor: "warning.light",
                fontWeight: "500",
                color: "white",
                position: "absolute",
                right: "24px",
                top: "24px",
              }}
            />

            <Stack alignItems="center" direction="row" mt={1.5}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "primary.main",
                    fontSize: "14px",
                  }}
                >
                  Total Balance
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  {etherBalance ? formatEther(etherBalance) : 0.0} ETH
                </Typography>
              </Box>

              <Box ml="auto">
                <MakeTransectionDialog>
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
                </MakeTransectionDialog>
              </Box>
            </Stack>
          </CardContent>
          {/* <CardActions sx={{ p: "30px 24px" }}>
      <Button
        sx={{
          backgroundColor: "primary.buttonColor",
          border: "1px solid",
          borderColor: "primary.buttonColor",
          color: "primary.contrastText",
          p: "8px 12px",
          "&:hover": {
            backgroundColor: "primary.buttonColor",
          },
        }}
      >
        View Assets
      </Button>
    </CardActions> */}
        </Card>
      </Paper>
    </>
  );
};

export default WalletDetails;
