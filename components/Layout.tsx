import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { account, isLoading } = useEthers();

  useEffect(() => {
    if (!account) {
      router.push({
        pathname: "/login",
        query: { redirect_url: router?.route },
      });
    }
  }, [account]);

  if (router?.route?.includes("login")) {
    return (
      <>
        <Head>
          <title>Multisig Wallet</title>
        </Head>
        {children}
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Multisig Wallet</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Main */}
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundColor: "secondary.contrastText",
          pt: "66px",
          px: "0 !important",
        }}
      >
        <Grid container>
          {/* Sidebar */}
          <Grid xs={2}>
            <Sidebar />
          </Grid>
          {/* Main Ctn */}
          <Grid xs={10} sx={{ py: 3 }}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Layout;
