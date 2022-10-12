import React, { useEffect } from "react";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import multiSigWalletAbi from "../../constants/MultiSigWalletAbi.json";
import contractAddresses from "../../constants/contractAddresses.json";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import CreateWallet from "./CreateWallet";
import { Container } from "@mui/material";

const Main = () => {
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

  return (
    <Container maxWidth="xl">
      <CreateWallet />
    </Container>
  );
};

export default Main;
