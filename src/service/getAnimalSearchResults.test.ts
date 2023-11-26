import { expect, test, describe } from "vitest";
import { searchResp } from "@/mocks/handlers";
import { getAnimalSearchResults } from "./getAnimalSearchResults";

describe("getAnimalSearchResults tests", () => {
  test("should return mocked data", async () => {
    const result = await (await getAnimalSearchResults("", "1", "10")).json();

    expect(result).toMatchObject(searchResp);
  });
});
