import React from "react";
import { AddCircleOutlined } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Wallet from "../Wallet/Wallet";
import { useRouter } from "next/router";

type Props = {
  walletList: string[];
};
type Anchor = "left";
const SideDrawer: React.FC<Props> = ({ walletList }) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Stack
          direction="row"
          alignItems="center"
          px={3}
          py={0.5}
          spacing={1.2}
        >
          <IconButton
            sx={{
              color: "primary.buttonColor",
              transition: " all .2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            size="small"
            onClick={() => router.push("/welcome")}
          >
            <AddCircleOutlined sx={{ fontSize: "46px" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontSize: "18px", fontWeight: "700" }}
          >
            Add Wallet
          </Typography>
        </Stack>
      </List>
      <Divider />
      <List sx={{ p: 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor: "grey.200",
              py: 0.2,
              px: 4,
            }}
          >
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Total Wallet :
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    {walletList.length}
                  </Typography>{" "}
                </Stack>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {walletList.map((wallet, index) => (
          <Wallet key={wallet} wallet={wallet} walletId={index} />
        ))}

        {walletList.length === 0 && (
          <ListItem disablePadding>
            <ListItemText
              sx={{
                py: "10px",
                px: 4,
                textAlign: "center",
              }}
              primary={
                <>
                  <Typography variant="body1" gutterBottom>
                    Wallet not found!
                  </Typography>
                  <Typography variant="body1" component="span">
                    Please create new wallet.
                  </Typography>
                </>
              }
            />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box p={2} textAlign="center">
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{
              backgroundColor: "primary.buttonColor",
              border: "1px solid",
              borderColor: "primary.buttonColor",
              color: "primary.contrastText",
              p: "8px 12px",
              width: "145px",
              transition: " all .2s ease-in-out",
              "&:hover": {
                backgroundColor: "primary.buttonColor",
                transform: "scale(1.05)",
              },
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            Select Wallet
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SideDrawer;
