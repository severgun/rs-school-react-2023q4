import axios from 'axios';
import { ISearchState } from '../App';

export default function getSearchResults(
  searchValue: string,
  updateSearchState: React.Dispatch<React.SetStateAction<ISearchState>>
) {
  axios
    .post(
      'https://stapi.co/api/v1/rest/animal/search',
      {
        name: searchValue,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      console.log(response.data);

      updateSearchState({
        searchValue: searchValue,
        searchResults: response.data ? response.data.animals : null,
      });
    })
    .catch(() => {
      console.log('API Error');
    });
}
