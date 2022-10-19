import { useCall, useCalls, useEtherBalance } from "@usedapp/core";
import { contract } from "../constants";

export function useGetOwners(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "getOwners",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useIsOwner(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "isOwner",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useIsUserExists(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "userExists",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useGetWalletsCount(args: any[]) {
  const { value, error } =
    useCall(
      args[0] && {
        contract: contract,
        method: "returnWalletCount",
        args: args,
      }
    ) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useGetWallets(args: any[], totalWallet: number) {
  // console.log("contract", contract);
  const calls: any = totalWallet
    ? Array(totalWallet)
        ?.fill("")
        ?.map((ele, index: number) => {
          return {
            contract: contract,
            method: "returnWallet",
            args: [...args, index],
          };
        })
    : [];
  const results: any = useCalls(calls && calls) ?? {};

  results.forEach((result: any, idx: number) => {
    if (result?.error) {
      console.error(
        `Error encountered calling 'returnWallet' on ${
          calls[idx + 1]?.contract.address
        }: ${result.error.message}`
      );
      return undefined;
    }
  });
  console.log({ results });
  return results?.map((result: any) => result?.value?.[0]);
}

export function useGetTransactionCount(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "getTransactionCount",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useGetTransactionDetails(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "getTransaction",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useNumConfirmationsRequired(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "returnNumConfirmationsRequired",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}

export function useIsTxConfirmed(args: any[]) {
  const { value, error } =
    useCall({
      contract: contract,
      method: "isConfirmed",
      args: args,
    }) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}
