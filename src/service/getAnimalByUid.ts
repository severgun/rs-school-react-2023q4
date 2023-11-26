import { BASE_API_URL, ENDPOINTS, HTTP_METHODS } from "@/constants";

export const getAnimalByUid = async (
  uid: string | string[]
): Promise<Response> => {
  const url = `${BASE_API_URL}${ENDPOINTS.AnimalByUid}?uid=${uid}`;

  const res = await fetch(url, {
    method: HTTP_METHODS.Get,
  });

  return res;
};
