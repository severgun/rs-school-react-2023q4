import React from "react";
import { Pagination } from "..";
import { IAnimalsResponse } from "@/types";

export default function DetailsLayout({
  children,
  data,
}: {
  children: React.JSX.Element;
  data: IAnimalsResponse;
}) {
  return (
    <>
      <Pagination data={data} />
      {children}
    </>
  );
}
