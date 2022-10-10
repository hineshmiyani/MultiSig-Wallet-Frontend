import type { NextPage } from "next";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Container } from "@mui/material";
import { Login, Header, Main, Loader } from "../components";

const Home: NextPage = () => {
  const { account, chainId, isLoading } = useEthers();
  const etherBalance = useEtherBalance(account);

  // console.log({
  //   account,
  //   chainId,
  //   etherBalance,
  // });

  if (!account) return <Login />;
  if (isLoading) return <Loader />;
  return (
    <>
      {/* Header */}
      <Header />

      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundColor: "secondary.contrastText",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main Ctn */}
        <Main />

        {/* Footer */}
        {/* <Footer /> */}
      </Container>
    </>
  );
};

export default Home;
