import { IAnimalsResponse } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type PaginationProps = {
  data: IAnimalsResponse;
};

export const enum ITEMS_PER_PAGE {
  Ten = 10,
  Fifteen = 15,
  Twenty = 20,
  MIN = Ten,
  MAX = Twenty,
}

export default function Pagination({
  data,
}: PaginationProps): React.JSX.Element {
  const router = useRouter();
  const { search, pageNum, pageSize } = router.query;

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    router.push({
      pathname: router.pathname,
      query: {
        search,
        pageNum: getCurrentPage(),
        pageSize: event.target.value,
      },
    });
  };

  const handlePrevPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    router.push({
      pathname: router.pathname,
      query: {
        search,
        pageNum: getCurrentPage() - 1,
        pageSize,
      },
    });
  };

  const handleNextPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    router.push({
      pathname: router.pathname,
      query: {
        search,
        pageNum: getCurrentPage() + 1,
        pageSize,
      },
    });
  };

  const getCurrentPage = (): number => {
    const currentPage = Array.isArray(pageNum)
      ? 1
      : parseInt(pageNum ?? "1") || 1;

    return currentPage > 0 ? currentPage : 1;
  };

  const getItemsPerPage = (): number => {
    const currentPageSize = Array.isArray(pageSize)
      ? ITEMS_PER_PAGE.MIN
      : parseInt(pageSize ?? "1") || 1;

    return currentPageSize >= ITEMS_PER_PAGE.MIN &&
      currentPageSize <= ITEMS_PER_PAGE.MAX
      ? currentPageSize
      : ITEMS_PER_PAGE.MIN;
  };

  if (data.animals.length === 0) {
    return <p>Nothing was found.</p>;
  }

  return (
    <div>
      <div>
        <button disabled={data?.page.firstPage} onClick={handlePrevPage}>
          &lt;
        </button>
        <span>{getCurrentPage()}</span>
        <button disabled={data?.page.lastPage} onClick={handleNextPage}>
          &gt;
        </button>
        <label htmlFor="items-per-page">Items Per Page:</label>
        <select
          name="items-per-page"
          id="items-per-page"
          value={getItemsPerPage()}
          onChange={handleItemsPerPageChange}
        >
          <option value={ITEMS_PER_PAGE.Ten}>{ITEMS_PER_PAGE.Ten}</option>
          <option value={ITEMS_PER_PAGE.Fifteen}>
            {ITEMS_PER_PAGE.Fifteen}
          </option>
          <option value={ITEMS_PER_PAGE.Twenty}>{ITEMS_PER_PAGE.Twenty}</option>
        </select>
      </div>
      <ul>
        {data.animals.map((animal) => (
          <li key={animal.uid}>
            <Link href={`/details/${encodeURIComponent(animal.uid)}`}>
              {animal.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
