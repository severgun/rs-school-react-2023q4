import { Pagination } from "@/components";
import { ITEMS_PER_PAGE } from "@/constants";
import { getAnimalSearchResults } from "@/service/getAnimalSearchResults";
import { IAnimalsResponse } from "@/types";
import { GetServerSideProps } from "next";
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

  const data = await (
    await getAnimalSearchResults(search, pageNum, pageSize)
  ).json();

  return { props: { data } };
}) satisfies GetServerSideProps<PropsType>;

export default function Home({ data }: PropsType): React.JSX.Element {
  return (
    <>
      <h1>Star Track Animals</h1>
      <Pagination data={data} />
    </>
  );
}
