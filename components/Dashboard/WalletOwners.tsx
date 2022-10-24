import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import {
  Typography,
  Paper,
  Stack,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useGetOwners } from "../../hooks";
import { ContentCopyRounded } from "@mui/icons-material";
import ShareIcon from "../ShareIcon";
import { useRouter } from "next/router";

const AddressCell = (params: GridRenderCellParams) => {
  const [tooltipTitle, setTooltipTitle] = useState<string>("Copy to clipboard");
  const { library } = useEthers();

  return (
    <Stack py={1} px={3} spacing={1} direction="row" alignItems="center">
      <Typography variant="caption" component="p" sx={{ width: "340px" }}>
        <Typography variant="caption" fontWeight="bold">
          {library?.network?.name?.substring(0, 2)}
          {library?.network?.name?.substring(3, 4)}:
        </Typography>{" "}
        {params?.value}
      </Typography>
      <Tooltip title={tooltipTitle} placement="top">
        <IconButton
          size="medium"
          sx={{ backgroundColor: "secondary.contrastText" }}
          onClick={() => {
            params?.value && navigator.clipboard.writeText(params?.value);
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
              `https://${library?.network?.name}.etherscan.io/address/${params?.value}`,
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

type Props = {};
const WalletOwners: React.FC<Props> = () => {
  const router = useRouter();
  const { id: walletId } = router?.query;
  const [rows, setRows] = useState<any[]>([{ id: 1, avatar: "", address: "" }]);

  const { account, library } = useEthers();
  const ownersList = useGetOwners([account?.toString(), walletId]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.value}
          width="34"
          height="34"
          alt=""
          className="rounded-full object-cover"
        />
      ),
    },
    {
      field: "address",
      headerName: "Owner Address",
      maxWidth: 738,
      width: 738,
      align: "center",
      headerAlign: "center",
      renderCell: AddressCell,
    },
  ];

  useEffect(() => {
    // console.log(ownersList);
    setRows(() => {
      const modifyOwnerList =
        ownersList?.length > 0 &&
        ownersList?.[0]?.map((owner: string, index: number) => {
          return {
            id: index + 1,
            avatar: "/asset/images/avatar.png",
            address: owner,
          };
        });
      return modifyOwnerList
        ? modifyOwnerList
        : [{ id: 1, avatar: "", address: "" }];
    });
  }, [ownersList]);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "700",
          mt: "24px",
        }}
        gutterBottom
      >
        Owners
      </Typography>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          maxWidth: "100%",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Box sx={{ height: 271, width: "100%", p: 0.4 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            disableSelectionOnClick
            disableColumnSelector
          />
        </Box>
      </Paper>
    </>
  );
};

export default WalletOwners;
