import { Box, Chip, Paper, Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";
import React from "react";

const ConnectWallet = () => {
  const { library } = useEthers();

  return (
    <Paper
      sx={{
        p: "24px",
        my: "30px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Typography variant="body1" gutterBottom>
        Wallet Connected.
      </Typography>
      <Typography variant="body1" component="span" gutterBottom>
        Creating a Wallet on{" "}
      </Typography>
      <Chip
        label={library?.network?.name}
        sx={{
          backgroundColor: "warning.light",
          fontWeight: "500",
          color: "white",
        }}
      />
    </Paper>
  );
};

export default ConnectWallet;
