import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import mockRouter from "next-router-mock";

describe("Search component tests", () => {
  test("should render title, input field and search button", () => {
    render(<Search />);

    const searchTitle = screen.getByText("Search for Star Track Animals:");
    const searchInput = screen.getByPlaceholderText("Type your request...");
    const searchButton = screen.getByRole("button", {
      name: "Search",
    });

    expect(searchTitle).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("should perform route.push on Search button click", () => {
    render(<Search />);
    const searchField = screen.getByRole<HTMLInputElement>("textbox");
    const searchButton = screen.getByRole("button", {
      name: "Search",
    });
    fireEvent.change(searchField, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(mockRouter).toMatchObject({
      asPath: "/?search=test&pageNum=1&pageSize=10",
      pathname: "/",
      query: { pageNum: "1", pageSize: 10, search: "test" },
    });
  });
});
