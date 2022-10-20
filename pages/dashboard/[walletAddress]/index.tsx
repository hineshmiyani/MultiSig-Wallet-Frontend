import React, { useEffect } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { Button, Container, Typography } from "@mui/material";
import { WalletDetails, WalletOwners } from "../../../components";
import { useRouter } from "next/router";

type Props = {
  params: {
    walletAddress: string;
  };
};

const Dashboard: React.FC<Props> = ({ params }) => {
  const { library } = useEthers();
  const router = useRouter();
  const { walletAddress }: any = router?.query;
  const { id: walletId } = router?.query;
  useEffect(() => {
    console.log({ walletAddress });
  }, []);

  return (
    <>
      <Container>
        {walletAddress && <WalletDetails walletAddress={walletAddress} />}
        <WalletOwners />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            mt: "24px",
          }}
          gutterBottom
        >
          Transactions
        </Typography>

        <Button
          onClick={() =>
            router.push({
              pathname: `/dashboard/${walletAddress}/transactions`,
              query: { id: walletId },
            })
          }
          sx={{
            backgroundColor: "primary.buttonColor",
            border: "1px solid",
            borderColor: "primary.buttonColor",
            color: "primary.contrastText",
            p: "8px 12px",
            transition: " all .2s ease-in-out",
            "&:hover": {
              backgroundColor: "primary.buttonColor",
              transform: "scale(1.05)",
            },
          }}
        >
          Transactions
        </Button>
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
