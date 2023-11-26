import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import DetailsCard from "./DetailsCard";
import { detailsResp } from "@/mocks/handlers";

describe("DetailsCard tests", () => {
  test("should render proper data on DetailsCard", () => {
    render(<DetailsCard data={detailsResp} />);

    const name = screen.getByRole("heading", {
      level: 3,
      name: "'Owon",
    });
    expect(name).toBeInTheDocument();

    const earthAnimalDetail = screen.getByText("Earth Animal: False");
    expect(earthAnimalDetail).toBeInTheDocument();

    const earthInsectDetail = screen.getByText("Earth Insect: False");
    expect(earthInsectDetail).toBeInTheDocument();

    const avianDetail = screen.getByText("It is avian: False");
    expect(avianDetail).toBeInTheDocument();

    const felineDetail = screen.getByText("It is feline: False");
    expect(felineDetail).toBeInTheDocument();

    const canineDetail = screen.getByText("It is canine: False");
    expect(canineDetail).toBeInTheDocument();
  });
});
