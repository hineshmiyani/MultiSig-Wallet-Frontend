import React from "react";
import Image from "next/image";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { AddCircleOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: "max(calc(100vh - 66px), 100%)",
        backgroundColor: "primary.contrastText",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        position: "fixed",
        width: "inherit",
      }}
    >
      {/* <Box textAlign="center" p={3}>
        <Image
          src="/asset/images/lockWallet.svg"
          height={45}
          width={45}
          className="rounded-full object-cover"
          alt=""
        />
      </Box> */}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        p={2}
        spacing={0.5}
      >
        <IconButton
          sx={{
            color: "primary.buttonColor",
          }}
          size="small"
          onClick={() => router.push("/welcome")}
        >
          <AddCircleOutlined sx={{ fontSize: "48px" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: "500", ml: 1 }}
        >
          Add Wallet
        </Typography>
      </Stack>

      <Divider />
    </Box>
  );
};

export default Sidebar;
