import React, { useEffect } from "react";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const { account, isLoading } = useEthers();
  // const { chainId } = useEthers();
  // let contractAddressList: any = contractAddresses;

  // const multiSigWalletInterface = new utils.Interface(multiSigWalletAbi);
  // const multiSigWalletAddress =
  //   chainId && contractAddressList?.[`${chainId}`]?.["MultiSigWallet"][0];
  // const contract = new Contract(multiSigWalletAddress, multiSigWalletInterface);

  // const { value } = useCall({
  //   contract: contract,
  //   method: "getOwners",
  //   args: [],
  // });

  // const callOwners = async () => {
  //   console.log("owners:", value);
  // };

  useEffect(() => {
    if (!account) {
      router.push({
        pathname: "/login",
        query: { redirect_url: router?.route },
      });
    } else {
      router.route !== "/welcome" && router.push("/welcome");
    }
  }, [account]);

  return <Container maxWidth="xl">Main</Container>;
};

export default Main;
