import Pagination, { ITEMS_PER_PAGE } from "@/components/Pagination/Pagination";
import { BASE_API_URL, ENDPOINTS } from "@/constants";
import { IAnimalsResponse } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

type PropsType = {
  data: IAnimalsResponse;
};

export const getServerSideProps = (async (context) => {
  const {
    search = "",
    pageNum = "1",
    pageSize = ITEMS_PER_PAGE.MIN.toString(),
  } = context.query;

  let pageNumber = Array.isArray(pageNum) ? 0 : (parseInt(pageNum) ?? 1) - 1; // API index from 0
  pageNumber = pageNumber > 0 ? pageNumber : 0;

  const url = `${BASE_API_URL}${ENDPOINTS.AnimalSearch}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const body = `name=${search}`;

  console.log("URL: ", url);
  console.log("BODY: ", body);

  const res = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await res.json();

  console.log("DATA: ", data);

  return { props: { data } };
}) satisfies GetServerSideProps<PropsType>;

export default function Home({ data }: PropsType): React.JSX.Element {
  return <Pagination data={data} />;
}
