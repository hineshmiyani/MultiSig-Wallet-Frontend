import React from "react";
import Image from "next/image";
import { useEthers } from "@usedapp/core";
import { Button, Container, Stack, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Login = () => {
  const { activateBrowserWallet, account } = useEthers();

  console.log("account", account);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.contrastText",
          backgroundImage: "url('../asset/images/background.webp')",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundPosition: "50% 25%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <Stack alignItems="center">
          <Image
            src="/asset/images/wallet.svg"
            height={140}
            width={140}
            className="rounded-full object-cover"
            alt=""
          />
          {/* <AccountBalanceWalletIcon
            sx={{ color: "primary.contrastText", fontSize: "100px" }}
          /> */}
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mt: "24px",
              mb: "10px",
            }}
          >
            MultiSignature Wallet
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
            Get Started by Logging in with your Wallet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
              },
              color: "primary.contrastText",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "16px",
              mt: "20px",
            }}
            onClick={() => activateBrowserWallet()}
          >
            Login with Metamask
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
