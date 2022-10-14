import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Chip,
  TextField,
  Divider,
  Stack,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { useEthers } from "@usedapp/core";
import { Add, DeleteOutline } from "@mui/icons-material";

const AddOwners = () => {
  const { library } = useEthers();
  const [ownerCount, setOwnerCount] = useState<number>(() => {
    if (localStorage.getItem("ownersData")) {
      const { ownersList } = JSON.parse(
        localStorage.getItem("ownersData") || ""
      );
      return ownersList.length;
    }
    return 1;
  });
  const [ownersList, setOwnersList] = useState<any[]>(() => {
    if (localStorage.getItem("ownersData")) {
      const { ownersList } = JSON.parse(
        localStorage.getItem("ownersData") || ""
      );
      return ownersList;
    }
    return [];
  });

  const [requiredConfirmations, setRequiredConfirmations] = useState<string>(
    () => {
      if (localStorage.getItem("ownersData")) {
        const { requiredConfirmations } = JSON.parse(
          localStorage.getItem("ownersData") || ""
        );
        return requiredConfirmations;
      }
      return "1";
    }
  );

  const handleChange = (event: SelectChangeEvent) => {
    setRequiredConfirmations(event.target.value.toString());
  };

  useEffect(() => {
    console.log({ ownersList, requiredConfirmations, ownerCount });

    return () => {
      localStorage.setItem(
        "ownersData",
        JSON.stringify({
          ownersList,
          requiredConfirmations,
        })
      );
    };
  }, [ownersList, requiredConfirmations]);

  const handleOwnersList = (e: any, index: any) => {
    setOwnersList((prevOwnersList) => {
      let newList = [...prevOwnersList];
      newList[index] = e.target.value;
      return newList;
    });
  };

  return (
    <Paper
      sx={{
        py: "24px",
        my: "30px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Box px={3}>
        <Typography variant="subtitle1" mb={2}>
          Your Wallet will have one or more owners. We have prefilled the first
          owner with your connected wallet details, but you are free to change
          this to a different owner.
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          Add additional owners (e.g. wallets of your teammates) and specify how
          many of them have to confirm a transaction before it gets executed. In
          general, the more confirmations required, the more secure your Wallet
          is.
        </Typography>
        <Box mb={4}>
          <Typography variant="subtitle1" component="span">
            The new Safe will ONLY be available on{" "}
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
      </Box>

      <Divider />

      <Stack direction="row" px={3}>
        <Typography variant="body2" my={1} maxWidth="26%" flexBasis="26%">
          Name
        </Typography>
        <Typography variant="body2" my={1} maxWidth="58%" flexBasis="58%">
          Address
        </Typography>
      </Stack>

      <Divider />

      <Box p={3} textAlign="center">
        {Array(ownerCount)
          .fill("")
          .map((val: string, index: number) => (
            <Stack direction="row" key={index} mb={2.5} alignItems="center">
              <Typography
                variant="body1"
                my={1}
                maxWidth="22.9%"
                flexBasis="22.9%"
                textAlign="left"
              >
                Owner {index + 1}
              </Typography>
              <TextField
                label="Owner Address"
                color="error"
                variant="outlined"
                required
                sx={{
                  maxWidth: "59%",
                  flexBasis: "59%",
                  ml: 2.5,
                }}
                placeholder="Owner Address*"
                InputLabelProps={{ shrink: true }}
                value={ownersList[index]}
                onChange={(e) => handleOwnersList(e, index)}
              />
              {index !== 0 && (
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setOwnerCount((prevOwnerCount) => prevOwnerCount - 1);
                      setOwnersList((prevOwnersList) =>
                        prevOwnersList.filter(
                          (owner, ownerIndex) => ownerIndex !== index
                        )
                      );
                    }}
                  >
                    <DeleteOutline fontSize="medium" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          ))}
        <Button
          variant="text"
          sx={{
            color: "primary.buttonColor",
            p: "8px 12px",
            m: "10px auto",
          }}
          startIcon={<Add />}
          onClick={() => setOwnerCount((prevOwnerCount) => prevOwnerCount + 1)}
        >
          Add another Owner
        </Button>
      </Box>

      <Box p={3}>
        <Typography variant="body2" mb={1.5}>
          Any transaction requires the confirmation of:
        </Typography>

        <Select
          value={requiredConfirmations}
          onChange={handleChange}
          color="error"
          sx={{ width: "62px" }}
        >
          {Array(ownerCount)
            .fill("")
            .map((val, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
        </Select>
        <Typography variant="body2" component="span" ml={1}>
          out of {ownerCount} owner(s)
        </Typography>
      </Box>

      {/* <pre>{JSON.stringify(ownersData)}</pre> */}
    </Paper>
  );
};

export default AddOwners;
