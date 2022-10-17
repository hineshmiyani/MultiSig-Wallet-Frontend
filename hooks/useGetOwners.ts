import { useCall } from "@usedapp/core";
import { contract } from "../constants";

export function useGetOwners(args: any[]) {
  // console.log("contract", contract);
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
