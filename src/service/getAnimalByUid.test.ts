import { expect, test, describe } from "vitest";
import { getAnimalByUid } from "./getAnimalByUid";
import { detailsResp } from "@/mocks/handlers";

describe("getAnimalByUid tests", () => {
  test("should return mocked data", async () => {
    const result = await (await getAnimalByUid("ANMA0000032315")).json();

    expect(result).toMatchObject(detailsResp);
  });
});
