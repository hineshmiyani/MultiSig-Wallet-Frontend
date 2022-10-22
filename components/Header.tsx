import React, { useEffect } from "react";
import Image from "next/image";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import NavButton from "./NavButton";
import { useEthers } from "@usedapp/core";
import Link from "next/link";
import { KeyboardArrowDown } from "@mui/icons-material";
import AccountDialog from "./AccountDialog";

const Header = () => {
  const { library, account } = useEthers();

  // useEffect(() => {
  //   console.log(data);
  //   console.log("library", data.library.network.name);
  // }, []);

  return (
    <header className="header">
      {/* Logo Section  */}
      <Link href="/welcome">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Image
            src="/asset/images/pakitLogo.png"
            height={34}
            width={34}
            className="rounded-full object-cover"
            alt=""
          />
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "600", ml: 1 }}
          >
            Pakit
          </Typography>
        </Box>
      </Link>

      {/* Account Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Image src="/asset/images/metamask.svg" alt="" width={30} height={30} />
        <Stack>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            MetaMask @
            {library?.network?.name?.substring(0, 1)?.toUpperCase() +
              "" +
              library?.network?.name?.substring(1)}
          </Typography>
          <Stack direction="row" alignItems="center" spacing="8px">
            <Image
              src="/asset/images/avatar.png"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover"
            />
            <Typography variant="body1" className="text-xs truncate">
              <Typography variant="caption" fontWeight="bold">
                {library?.network?.name?.substring(0, 2)}
                {library?.network?.name?.substring(3, 4)}:
              </Typography>{" "}
              {account?.slice(0, 6)}
              ...{account?.slice(-4)}
            </Typography>
          </Stack>
        </Stack>

        <AccountDialog />
      </Box>

      {/* Logout  */}
      {/* <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{ backgroundColor: "#0A1F1C", p: "4px" }}
          className="space-x-2"
        >
          <NavButton
            title="Logout"
            onClick={async () => await data.deactivate()}
          />
        </Box>
      </Box> */}
    </header>
  );
};

export default Header;
