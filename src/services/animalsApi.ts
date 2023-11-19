import { IAnimalFullResponse, IAnimalsResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_ANIMALS_URL = 'https://stapi.co/api/v1/rest';

const enum ENDPOINTS {
  AnimalSearch = '/animal/search',
  AnimalByUid = '/animal',
}

interface SearchQueryArgs {
  searchValue: string;
  pageNum: number;
  pageSize: number;
}

export const animalsApiSlice = createApi({
  tagTypes: ['AnimalsSearch', 'AnimalDetails'],

  reducerPath: 'animalsApi',

  baseQuery: fetchBaseQuery({ baseUrl: BASE_ANIMALS_URL }),

  endpoints: (builder) => ({
    getAnimalsBySearchValue: builder.mutation<
      IAnimalsResponse,
      SearchQueryArgs
    >({
      query: ({ searchValue, pageNum, pageSize }) => {
        const pageNumber = pageNum > 0 ? pageNum - 1 : 0; // API pageNumber is Zero-based
        const body = new URLSearchParams(`name=${searchValue}`);

        return {
          url: `${ENDPOINTS.AnimalSearch}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'AnimalsSearch', id: arg.searchValue },
      ],
    }),
    getAnimalByUid: builder.query<IAnimalFullResponse, string>({
      query: (uid) => `${ENDPOINTS.AnimalByUid}?uid=${uid}`,
      providesTags: ['AnimalDetails'],
    }),
  }),
});

export const { useGetAnimalByUidQuery, useGetAnimalsBySearchValueMutation } =
  animalsApiSlice;
