import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { formatEther } from "ethers/lib/utils";
import { useEthers } from "@usedapp/core";
import {
  useGetTransactionCount,
  useGetTransactionDetails,
} from "../../../../hooks";

type Props = {};

const Transactions = (props: Props) => {
  const { account, library } = useEthers();
  const totalTransaction = useGetTransactionCount([account?.toString(), 0]);
  const transactionDetails = useGetTransactionDetails([
    account?.toString(),
    0,
    parseInt(totalTransaction) - 1,
  ]);

  useEffect(() => {
    // console.log({ totalTransaction: parseInt(totalTransaction) });
    // console.log({ transactionDetails: +transactionDetails[4] });
  }, [totalTransaction, transactionDetails]);

  return (
    <>
      <Container>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            my: "24px",
          }}
        >
          Transactions
        </Typography>

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            maxWidth: "100%",
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Card
            sx={{
              maxWidth: "100%",
              flexBasis: "100%",
              borderRadius: "8px",
              boxShadow: "0",
            }}
          >
            <CardContent sx={{ p: "24px 24px 0", position: "relative" }}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <Typography variant="body1" component="span" fontWeight="bold">
                  qqqq
                </Typography>{" "}
                {"walletAddress"}
              </Typography>
              <Chip
                label={library?.network?.name}
                sx={{
                  backgroundColor: "warning.light",
                  fontWeight: "500",
                  color: "white",
                  position: "absolute",
                  right: "24px",
                  top: "24px",
                }}
              />

              <Stack alignItems="center" direction="row" mt={1.5}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary.main",
                      fontSize: "14px",
                    }}
                  >
                    Total Balance
                  </Typography>
                  <Typography variant="h6" sx={{ color: "primary.main" }}>
                    ETH
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </>
  );
};

export default Transactions;
