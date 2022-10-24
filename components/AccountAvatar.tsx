import { ContentCopyRounded } from "@mui/icons-material";
import { Stack, Typography, Tooltip, IconButton } from "@mui/material";
import { useEthers } from "@usedapp/core";
import Image from "next/image";
import React, { useState } from "react";
import ShareIcon from "./ShareIcon";

type Props = {
  toAddress: "string";
  truncate?: boolean;
};

const AccountAvatar: React.FC<Props> = ({ toAddress, truncate }) => {
  const { library } = useEthers();
  const [tooltipTitle, setTooltipTitle] = useState<string>("Copy to clipboard");

  return (
    <Stack spacing={1.8} direction="row" alignItems="center">
      <img
        src="/asset/images/avatar.png"
        width="34"
        height="34"
        alt=""
        className="rounded-full object-cover"
      />
      {truncate ? (
        <Typography variant="body2">
          <Typography variant="body2" component="span" fontWeight="bold">
            {library?.network?.name?.substring(0, 2)}
            {library?.network?.name?.substring(3, 4)}:
          </Typography>{" "}
          {toAddress?.slice(0, 6)}
          ...{toAddress?.slice(-4)}
        </Typography>
      ) : (
        <Typography variant="body2">
          <Typography variant="body2" component="span" fontWeight="bold">
            {library?.network?.name?.substring(0, 2)}
            {library?.network?.name?.substring(3, 4)}:
          </Typography>{" "}
          {toAddress}
        </Typography>
      )}

      <Tooltip title={tooltipTitle} placement="top">
        <IconButton
          size="medium"
          sx={{ backgroundColor: "secondary.contrastText" }}
          onClick={() => {
            toAddress && navigator.clipboard.writeText(toAddress);
            setTooltipTitle("Copied");
            setTimeout(() => {
              setTooltipTitle("Copy to clipboard");
            }, 1200);
          }}
        >
          <ContentCopyRounded
            sx={{ color: "disabled.main", fontSize: "20px" }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="View on goerli.etherscan.io" placement="top">
        <IconButton
          size="small"
          sx={{ backgroundColor: "secondary.contrastText" }}
          onClick={() => {
            window.open(
              `https://${library?.network?.name}.etherscan.io/address/${toAddress}`,
              "_blank"
            );
          }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default AccountAvatar;
