import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { APP_NAME } from "../constants";
import { Add, AccountBalanceWalletOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

type Props = {};

const Welcome = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Container maxWidth={false}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: "bold",
            mt: "26px",
          }}
        >
          Welcome to the {APP_NAME}.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            lineHeight: "26px",
            fontWeight: "normal",
            my: "18px",
          }}
        >
          {APP_NAME} is the most trusted platform to manage digital assets.
          <br />
          Here is how to get started:
        </Typography>

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            maxWidth: "fit-content",
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            height: "250px",
          }}
        >
          <Card
            sx={{
              maxWidth: 424.5,
              borderRadius: "8px 0 0 8px",
              boxShadow: "0",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ p: "24px 24px 0" }}>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
                Create Wallet
              </Typography>
              <Typography variant="body1">
                Create a new Wallet that is controlled by one or multiple
                owners. You will be required to pay a network fee for creating
                your new Safe.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: "30px 24px" }}>
              <Button
                sx={{
                  backgroundColor: "primary.buttonColor",
                  border: "1px solid",
                  borderColor: "primary.buttonColor",
                  color: "primary.contrastText",
                  p: "8px 12px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                  },
                }}
                startIcon={<Add />}
                onClick={() => router.push("/create")}
              >
                Create new Wallet
              </Button>
            </CardActions>
          </Card>

          <Divider orientation="vertical" flexItem />

          <Card
            sx={{
              maxWidth: 424.5,
              borderRadius: "0 8px 8px 0",
              boxShadow: "0",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ p: "24px 24px 0" }}>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
                Load Existing Safe
              </Typography>
              <Typography variant="body1">
                Already have a Wallet or want to access it from a different
                device? Easily load your Wallet using your MultiSig Wallet
                address.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: "30px 24px" }}>
              <Button
                variant="outlined"
                sx={{
                  color: "primary.buttonColor",
                  borderColor: "primary.buttonColor",
                  p: "8px 12px",
                  "&:hover": {
                    backgroundColor: "primary.buttonColor",
                    color: "primary.contrastText",
                    borderColor: "primary.buttonColor",
                  },
                }}
                startIcon={<AccountBalanceWalletOutlined />}
              >
                Add existing Wallet
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </>
  );
};

export default Welcome;
