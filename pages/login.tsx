import React, { useEffect } from "react";
import Image from "next/image";
import { useEthers } from "@usedapp/core";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();
  const { redirect_url } = router.query;

  useEffect(() => {
    if (account) {
      if (redirect_url && !redirect_url.includes("login")) {
        router.push(`${redirect_url}`);
      } else {
        router.push("/welcome");
      }
    }
  }, [account]);

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
          <img
            src="/asset/images/pakitLogo.png"
            height={160}
            width={160}
            className="object-cover"
            alt=""
          />
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: "14px",
            }}
          >
            Open your Pakit
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Get Started by Logging in with your Metamsk Wallet.
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
