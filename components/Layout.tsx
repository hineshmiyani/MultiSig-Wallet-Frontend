import Head from "next/head";
import React from "react";

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Multisig Wallet</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;
