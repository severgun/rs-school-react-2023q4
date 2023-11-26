import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Custom404 from "./404";

describe("404 page tests", () => {
  test("should render 404 page", () => {
    render(<Custom404 />);

    const notFoundText = screen.getByText("404 - Page Not Found");

    expect(notFoundText).toBeInTheDocument();
  });
});
