import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "./Sidebar/Sidebar";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
import { useGetWallets, useGetWalletsCount, useIsOwner } from "../hooks";
interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { walletAddress, id: walletId } = router.query;

  const { account, isLoading } = useEthers();
  // const totalWallet = useGetWalletsCount([account?.toString()]);
  // const walletList = useGetWallets(
  //   [account?.toString()],
  //   parseInt(totalWallet)
  // );
  const isOwner = useIsOwner([
    account && account?.toString(),
    walletAddress && walletAddress,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (!account && router?.isReady) {
        if (router?.route?.includes("dashboard")) {
          router.push({
            pathname: "/login",
            query: { redirect_url: "/welcome" },
          });
        } else {
          router.push({
            pathname: "/login",
            query: { redirect_url: router?.pathname },
          });
        }
      } else if (account && router?.isReady) {
        // const walletIndex = walletList.indexOf(walletAddress);
        if (isOwner?.[0]) {
          // router.push({
          //   pathname: `/dashboard/${walletAddress}`,
          //   query: { id: walletIndex >= 0 ? walletIndex : 0 },
          // });
        } else {
          router.push("/welcome");
        }
      }
    }, 1500);
  }, [account]);

  if (router?.route?.includes("login")) {
    return (
      <>
        <Head>
          <title>Pakit</title>
        </Head>
        {children}
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Pakit</title>
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
