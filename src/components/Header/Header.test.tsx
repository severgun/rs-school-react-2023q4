import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Header component rendered", () => {
  render(<Header />);

  const headerHtmlTagName = screen.getByRole("banner").tagName;

  expect(headerHtmlTagName).toEqual("HEADER");
});
