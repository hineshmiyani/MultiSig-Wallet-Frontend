import type { AppProps } from "next/app";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Mainnet, DAppProvider, Config, Goerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { theme } from "../theme";
import Layout from "../components/Layout";
import "../styles/globals.css";

const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Goerli.chainId]: process.env.NEXT_PUBLIC_GOERLI_RPC_URL || "",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <DAppProvider config={config}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DAppProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
