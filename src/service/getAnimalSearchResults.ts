import { BASE_API_URL, ENDPOINTS, HTTP_METHODS } from "@/constants";

export const getAnimalSearchResults = async (
  search: string | string[],
  pageNum: string | string[],
  pageSize: string | string[]
): Promise<Response> => {
  let pageNumber = Array.isArray(pageNum) ? 0 : (parseInt(pageNum) ?? 1) - 1; // API index from 0
  pageNumber = pageNumber > 0 ? pageNumber : 0;

  const url = `${BASE_API_URL}${ENDPOINTS.AnimalSearch}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const body = `name=${search}`;

  const res = await fetch(url, {
    method: HTTP_METHODS.Post,
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res;
};
