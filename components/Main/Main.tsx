import React, { useEffect } from "react";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import multiSigWalletAbi from "../../constants/MultiSigWalletAbi.json";
import contractAddresses from "../../constants/contractAddresses.json";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import CreateWallet from "../CreateWallet/CreateWallet";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
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
    router.push("/welcome");
  }, []);

  return <Container maxWidth="xl">Main</Container>;
};

export default Main;
