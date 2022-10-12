import { Box } from "@mui/material";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 66px)",
        backgroundColor: "primary.contrastText",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      }}
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
