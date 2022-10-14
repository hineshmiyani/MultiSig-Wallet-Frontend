import React from "react";
import { useRouter } from "next/router";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBackIos, StayPrimaryLandscape } from "@mui/icons-material";
import { CreateWallet } from "../components";

type Props = {};

const Create = (props: Props) => {
  const router = useRouter();
  return (
    <Container maxWidth={false}>
      <Stack direction="row" alignItems="center" spacing={1} mb="32px">
        <IconButton
          aria-label="delete"
          sx={{ textAlign: "right" }}
          onClick={() => router.push("/welcome")}
        >
          <ArrowBackIos
            sx={{
              position: "relative",
              left: "4px",
              color: "primary.buttonColor",
            }}
          />
        </IconButton>
        <Typography variant="h6">Create new Wallet</Typography>
      </Stack>
      <CreateWallet />
    </Container>
  );
};

export default Create;
