import { DetailsCard, Pagination } from "@/components";
import { ITEMS_PER_PAGE } from "@/constants";
import { getAnimalByUid } from "@/service/getAnimalByUid";
import { getAnimalSearchResults } from "@/service/getAnimalSearchResults";
import { IAnimalFullResponse, IAnimalsResponse } from "@/types";
import { GetServerSideProps } from "next";
import styles from "./details.module.css";
import React from "react";

type PropsType = {
  searchResults: IAnimalsResponse;
  detailsData: IAnimalFullResponse;
};

export const getServerSideProps = (async (context) => {
  const {
    id = "",
    search = "",
    pageNum = "1",
    pageSize = ITEMS_PER_PAGE.MIN.toString(),
  } = context.query;

  const searchResults = await (
    await getAnimalSearchResults(search, pageNum, pageSize)
  ).json();
  const detailsData = id ? await (await getAnimalByUid(id)).json() : {};

  return { props: { searchResults, detailsData } };
}) satisfies GetServerSideProps<PropsType>;

export default function Details({
  searchResults,
  detailsData,
}: PropsType): React.JSX.Element {
  return (
    <div className={styles.content}>
      <Pagination data={searchResults} />
      <DetailsCard data={detailsData} />
    </div>
  );
}
