import React from "react";
import Image from "next/image";
import { Container, Stack, Typography } from "@mui/material";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.contrastText",
          backgroundImage: "url('../asset/images/background.webp')",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundPosition: "50% 25%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: "40px" }}
        >
          <Image
            src="/asset/images/pakitLogo.png"
            height={100}
            width={100}
            className="rounded-full object-cover shadow-slate-400 shadow-md"
            alt=""
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "primary.main",
              fontWeight: "semi-bold",
            }}
          >
            Loading the Multisig Wallet...
          </Typography>
        </Stack>
        <PropagateLoader color="#374151" className="bg-fuchsia-500" size={20} />
      </Container>
    </>
  );
};

export default Loader;
