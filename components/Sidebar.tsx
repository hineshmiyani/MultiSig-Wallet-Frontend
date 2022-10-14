import { Box } from "@mui/material";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <Box
      sx={{
        height: "max(calc(100vh - 66px), 100%)",
        backgroundColor: "primary.contrastText",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        position: "fixed",
        width: "inherit",
      }}
    ></Box>
  );
};

export default Sidebar;
