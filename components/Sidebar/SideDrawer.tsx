import { AddCircleOutlined, Folder, Inbox, Mail } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useEthers } from "@usedapp/core";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  walletList: string[];
};
type Anchor = "left";
const SideDrawer: React.FC<Props> = ({ walletList }) => {
  const router = useRouter();
  const { walletAddress } = router?.query;
  const [state, setState] = React.useState({
    left: false,
  });

  const { library } = useEthers();

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
      sx={{ width: 290 }}
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
      <List>
        {walletList.map((wallet, index) => (
          <ListItem key={wallet} disablePadding>
            <ListItemButton
              sx={{
                backgroundColor: wallet === walletAddress ? "grey.300" : "",
                py: "10px",
                px: 4,
              }}
              onClick={() =>
                router.push({
                  pathname: `/dashboard/${wallet}`,
                  query: { id: index },
                })
              }
            >
              <ListItemAvatar>
                <Avatar
                  src="/asset/images/walletAvatar.png"
                  sx={{ width: 38, height: 38 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography variant="body1">
                      <Typography
                        variant="body1"
                        component="span"
                        fontWeight="bold"
                      >
                        {library?.network?.name?.substring(0, 2)}
                        {library?.network?.name?.substring(3, 4)}:
                      </Typography>{" "}
                      {wallet?.slice(0, 6)}
                      ...{wallet?.slice(-4)}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
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
