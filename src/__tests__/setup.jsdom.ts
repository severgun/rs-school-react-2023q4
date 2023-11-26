import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "@/mocks/node";

beforeAll(() => {
  server.listen();
  vi.mock("next/router", () => require("next-router-mock"));
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
