import { expect, test } from "vitest";
import { logDOM, render, screen } from "@testing-library/react";
import Details from "./[id]";
import { detailsResp, searchResp } from "@/mocks/handlers";

test("Details page rendered", () => {
  render(<Details searchResults={searchResp} detailsData={detailsResp} />);

  const detailsTitle = screen.getByRole("heading", {
    level: 4,
    name: "Details:",
  });

  const detailsCloseButton = screen.getByRole("button", {
    name: "Close",
  });

  expect(detailsTitle).toBeInTheDocument();
  expect(detailsCloseButton).toBeInTheDocument();
});
