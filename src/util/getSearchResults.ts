import axios from 'axios';
import { IAnimalsResponse } from '@/types';

export default async function getSearchResults(
  searchValue: string,
  pageNum: number,
  pageSize: number
): Promise<IAnimalsResponse | null> {
  try {
    const pageNumber = pageNum > 0 ? pageNum - 1 : 0; // API pageNumber is Zero-based
    const response = await axios.post(
      `https://stapi.co/api/v1/rest/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        name: searchValue,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error('API Request Failed', error);
    return null;
  }
}
