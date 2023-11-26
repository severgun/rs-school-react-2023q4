import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import { searchResp } from "@/mocks/handlers";

test("Home page rendered", () => {
  render(<Home data={searchResp} />);

  const mainTitle = screen.getByRole("heading", {
    level: 1,
    name: "Star Track Animals",
  });

  expect(mainTitle).toBeInTheDocument();
});
