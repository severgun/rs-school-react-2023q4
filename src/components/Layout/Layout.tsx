import React from "react";
import { Header } from "@/components";

export default function Layout({ children }: { children: React.JSX.Element }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
