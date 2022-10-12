import type { NextPage } from "next";
import { useEthers } from "@usedapp/core";
import { Loader, Main } from "../components";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { account, isLoading } = useEthers();

  if (isLoading) return <Loader />;
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
