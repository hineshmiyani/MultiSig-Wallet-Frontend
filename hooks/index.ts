import { useCall, useEtherBalance } from "@usedapp/core";
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
  return { value, error };
}

export function useGetWallets(args: any[]) {
  // console.log("contract", contract);
  // let calls = [];
  // for (let index = 0; index < index++; index++) {
  //   let params = {
  //     contract: contract,
  //     method: "userToWallets",
  //     args: [...args, index],
  //   };
  //   calls.push(params);
  // }
  const { value, error } =
    useCall(
      args[0] &&
        args[1] !== undefined && {
          contract: contract,
          method: "userToWallets",
          args: args,
        }
    ) ?? {};

  if (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
  return value;
}
