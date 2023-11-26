import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Pagination from "./Pagination";
import { searchResp } from "@/mocks/handlers";
import mockRouter from "next-router-mock";
import { IAnimalsResponse } from "@/types";
import { ITEMS_PER_PAGE } from "@/constants";

describe("Pagination component tests", () => {
  test("should render pagination controls", () => {
    render(<Pagination data={searchResp} />);

    const prevPageButton = screen.getByRole("button", {
      name: "<",
    });
    const nextPageButton = screen.getByRole("button", {
      name: ">",
    });
    const itemsPerPageSelect = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Items Per Page:",
    });

    expect(prevPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
    expect(itemsPerPageSelect).toBeInTheDocument();
  });

  test("should render cards as set by combobox", () => {
    render(<Pagination data={searchResp} />);

    const itemsPerPageSelect = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Items Per Page:",
    });

    expect(screen.queryAllByRole("listitem")).toHaveLength(
      +itemsPerPageSelect.value
    );
  });

  test("should render valid data in card", async () => {
    render(<Pagination data={searchResp} />);

    const firstCard = screen.queryAllByRole("listitem")[0];

    expect(firstCard).toHaveTextContent("'Owon");
  });

  test("should perform route.push on nextPage button click", () => {
    render(<Pagination data={searchResp} />);
    const nextPageButton = screen.getByRole("button", {
      name: ">",
    });

    fireEvent.click(nextPageButton);

    expect(mockRouter).toMatchObject({
      pathname: "/",
      query: { search: "", pageNum: 2, pageSize: "10" },
      asPath: "/?search=&pageNum=2&pageSize=10",
    });
  });

  test("should perform route.push on itemsPerPage change event", () => {
    render(<Pagination data={searchResp} />);
    const itemsPerPageSelect = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Items Per Page:",
    });

    fireEvent.change(itemsPerPageSelect, {
      target: { value: ITEMS_PER_PAGE.Fifteen },
    });

    expect(mockRouter).toMatchObject({
      pathname: "/",
      query: {
        search: "",
        pageNum: 1,
        pageSize: ITEMS_PER_PAGE.Fifteen.toString(),
      },
      asPath: `/?search=&pageNum=1&pageSize=${ITEMS_PER_PAGE.Fifteen}`,
    });
  });

  test("should render not found message if animals array empty", () => {
    const data: IAnimalsResponse = {
      page: {
        pageNumber: 0,
        pageSize: 10,
        numberOfElements: 0,
        totalElements: 563,
        totalPages: 57,
        firstPage: true,
        lastPage: false,
      },
      sort: {
        clauses: [],
      },
      animals: [],
    };

    render(<Pagination data={data} />);

    const notFoundMessage = screen.getByText("Nothing was found.");

    expect(notFoundMessage).toBeInTheDocument();
  });
});
