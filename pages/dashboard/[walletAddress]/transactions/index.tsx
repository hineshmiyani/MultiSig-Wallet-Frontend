import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatEther } from "ethers/lib/utils";
import { useEthers } from "@usedapp/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { CallMade, ExpandMore, PeopleAltOutlined } from "@mui/icons-material";
import {
  useGetTransactionCount,
  useGetTransactions,
  useNumConfirmationsRequired,
} from "../../../../hooks";
import {
  AccountAvatar,
  TransactionProgressStepper,
  TxNotFound,
} from "../../../../components";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2.5 }}>{children}</Box>}
    </Box>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

type Props = {};
const queueText = "Queued transactions will appear here";
const completedText = "Completed transactions will appear here";
const Transactions = (props: Props) => {
  const router = useRouter();
  const { id: walletId } = router?.query;
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { account } = useEthers();
  const confirmationsRequired = useNumConfirmationsRequired([
    account?.toString(),
    walletId ? +walletId : 0,
  ]);

  const totalTransaction = useGetTransactionCount([
    account?.toString(),
    walletId ? +walletId : 0,
  ]);
  const transactionsList = useGetTransactions(
    [account?.toString(), walletId && +walletId],
    totalTransaction ? parseInt(totalTransaction) : 0
  );

  useEffect(() => {
    // console.log({ totalTransaction: parseInt(totalTransaction) });
    // console.log({ transactionsList });
  }, [totalTransaction, transactionsList]);

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

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "primary.buttonColor",
                },
              }}
            >
              <Tab
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  "&.Mui-selected": {
                    color: "primary.buttonColor",
                  },
                }}
                label="Queue"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  "&.Mui-selected": {
                    color: "primary.buttonColor",
                  },
                }}
                label="Completed"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box>
              {transactionsList
                ?.reverse()
                ?.map((transaction: any, index: number) => {
                  if (transaction?.executed === false) {
                    return (
                      <Accordion
                        key={transaction?.to + index}
                        sx={{
                          my: 1.5,
                          borderRadius: "4px !important",
                          "&::before": { height: 0 },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          sx={{
                            "&.MuiAccordionSummary-root.Mui-expanded": {
                              minHeight: "50px",
                            },
                            "& > .MuiAccordionSummary-content.Mui-expanded": {
                              m: "12px 0",
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            width="100%"
                          >
                            <Box flexBasis="10%" maxWidth="10%">
                              <Typography>
                                <Typography component="span" fontWeight="600">
                                  Tx:{" "}
                                </Typography>
                                {transactionsList.length - index}
                              </Typography>
                            </Box>

                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1.2}
                              flexBasis="20%"
                              maxWidth="20%"
                            >
                              <CallMade sx={{ color: "primary.buttonColor" }} />
                              <Typography>Send</Typography>
                            </Box>

                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1.2}
                              flexBasis="25%"
                              maxWidth="25%"
                            >
                              <Image
                                src="/asset/images/ethLogo.png"
                                height={26}
                                width={26}
                                className="rounded-full object-cover"
                                alt=""
                              />
                              <Typography>
                                {transaction?.value &&
                                  formatEther(transaction?.value)}{" "}
                                ETH
                              </Typography>
                            </Box>

                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1.2}
                              flexBasis="25%"
                              maxWidth="25%"
                            >
                              <PeopleAltOutlined />
                              <Typography>
                                {parseInt(transaction?.numConfirmations)} out of{" "}
                                {parseInt(confirmationsRequired)}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: "primary.buttonColor",
                                flexBasis: "20%",
                                maxWidth: "20%",
                                fontWeight: "600",
                              }}
                            >
                              Needs Confirmation
                            </Typography>
                          </Stack>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails sx={{ pt: 2 }}>
                          <Box display="flex" alignItems="top" gap={3}>
                            <Box>
                              <Typography variant="body1">
                                Send{" "}
                                <Typography
                                  variant="body1"
                                  component="span"
                                  sx={{ fontWeight: "700" }}
                                >
                                  {formatEther(transaction?.value)}{" "}
                                </Typography>
                                ETH to:
                              </Typography>
                              <Box my={1}>
                                <AccountAvatar toAddress={transaction?.to} />
                              </Box>
                            </Box>

                            <Divider orientation="vertical" flexItem />
                            <Box>
                              <TransactionProgressStepper
                                transaction={transaction}
                                txIndex={transactionsList?.length - index - 1}
                                confirmationsRequired={parseInt(
                                  confirmationsRequired
                                )}
                              />
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                  return null;
                })}
              {transactionsList.filter(
                (transaction: any) => transaction?.executed === false
              )?.length === 0 && <TxNotFound text={queueText} />}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box>
              {transactionsList
                ?.reverse()
                ?.map((transaction: any, index: number) => {
                  if (transaction?.executed === true) {
                    return (
                      <Accordion
                        key={transaction?.to + index}
                        sx={{
                          my: 1.5,
                          borderRadius: "4px !important",
                          "&::before": { height: 0 },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          sx={{
                            "&.MuiAccordionSummary-root.Mui-expanded": {
                              minHeight: "50px",
                            },
                            "& > .MuiAccordionSummary-content.Mui-expanded": {
                              m: "12px 0",
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            width="100%"
                          >
                            <Box flexBasis="10%" maxWidth="10%">
                              <Typography>
                                <Typography component="span" fontWeight="600">
                                  Tx:{" "}
                                </Typography>
                                {index + 1}
                              </Typography>
                            </Box>

                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1.2}
                              flexBasis="20%"
                              maxWidth="20%"
                            >
                              <CallMade sx={{ color: "primary.buttonColor" }} />
                              <Typography>Sent</Typography>
                            </Box>

                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1.2}
                              flexBasis="25%"
                              maxWidth="25%"
                            >
                              <Image
                                src="/asset/images/ethLogo.png"
                                height={26}
                                width={26}
                                className="rounded-full object-cover"
                                alt=""
                              />
                              <Typography>
                                {formatEther(transaction?.value)} ETH
                              </Typography>
                            </Box>

                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1.2}
                              flexBasis="25%"
                              maxWidth="25%"
                            >
                              <PeopleAltOutlined />
                              <Typography>
                                {parseInt(transaction?.numConfirmations)} out of{" "}
                                {parseInt(confirmationsRequired)}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: "primary.buttonColor",
                                flexBasis: "20%",
                                maxWidth: "20%",
                                textAlign: "center",
                                fontWeight: "600",
                              }}
                            >
                              Success
                            </Typography>
                          </Stack>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails sx={{ pt: 2 }}>
                          <Box display="flex" alignItems="top" gap={3}>
                            <Box>
                              <Typography variant="body1">
                                Send{" "}
                                <Typography
                                  variant="body1"
                                  component="span"
                                  sx={{ fontWeight: "700" }}
                                >
                                  {formatEther(transaction?.value)}{" "}
                                </Typography>
                                ETH to:
                              </Typography>
                              <Box my={1}>
                                <AccountAvatar toAddress={transaction?.to} />
                              </Box>
                            </Box>

                            <Divider orientation="vertical" flexItem />
                            <Box>
                              <TransactionProgressStepper
                                transaction={transaction}
                                txIndex={transactionsList?.length - index - 1}
                                confirmationsRequired={parseInt(
                                  confirmationsRequired
                                )}
                              />
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                  return null;
                })}
              {transactionsList.filter(
                (transaction: any) => transaction?.executed === true
              )?.length === 0 && <TxNotFound text={completedText} />}
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
};

export default Transactions;
