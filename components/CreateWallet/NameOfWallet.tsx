import React from "react";
import { Paper, Typography, Chip, TextField, Box } from "@mui/material";
import { useEthers } from "@usedapp/core";

const NameOfWallet = () => {
  const { library } = useEthers();

  return (
    <Paper
      sx={{
        p: "24px",
        my: "30px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Box>
        <Typography variant="subtitle1" component="span" gutterBottom>
          You are about to create a new wallet with one or more owners. First,
          let&apos;s give your new wallet a name. This name is only stored
          locally and will never be shared with us or any third parties. The new
          Wallet will ONLY be available on{" "}
        </Typography>
        <Chip
          label={library?.network?.name}
          sx={{
            backgroundColor: "warning.light",
            fontWeight: "500",
            color: "white",
          }}
        />
      </Box>

      <Box>
        <Typography variant="body2" component="p" my={1.8}>
          Name of the new wallet
        </Typography>
        <TextField
          label="Wallet Name"
          sx={{ width: "25ch" }}
          color="error"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          placeholder="Enter wallet name"
        />
      </Box>
    </Paper>
  );
};

export default NameOfWallet;
