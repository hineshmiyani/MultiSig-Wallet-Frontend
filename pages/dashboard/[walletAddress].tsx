import React, { useEffect } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import {
  MakeTransectionDialog,
  WalletDetails,
  WalletOwners,
} from "../../components";
import { useRouter } from "next/router";

type Props = {
  params: {
    walletAddress: string;
  };
};

const Dashboard: React.FC<Props> = ({ params }) => {
  const { library } = useEthers();
  const router = useRouter();
  const walletAddress: any = router?.query?.walletAddress;
  useEffect(() => {
    console.log({ walletAddress });
  }, []);

  return (
    <>
      <Container>
        {walletAddress && <WalletDetails walletAddress={walletAddress} />}
        <WalletOwners />
      </Container>
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = [
//     {
//       params: { walletAddress: "0xE3CCa69d138F26E272159d64efD8a62aFe3cC1A5" },
//     },
//   ];
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   return {
//     props: { params },
//   };
// };

export default Dashboard;
