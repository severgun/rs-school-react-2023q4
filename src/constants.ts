export const BASE_API_URL = "https://stapi.co/api/v1/rest";

export const enum ENDPOINTS {
  AnimalSearch = "/animal/search",
  AnimalByUid = "/animal",
}

export const enum HTTP_METHODS {
  Get = "GET",
  Post = "POST",
}

export const enum ITEMS_PER_PAGE {
  Ten = 10,
  Fifteen = 15,
  Twenty = 20,
  MIN = Ten,
  MAX = Twenty,
}
