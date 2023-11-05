import axios from 'axios';
import { IPlanetResponse } from '../types';
import { ISearchState } from '../App';

const API_URL = 'https://swapi.dev/api/planets/';

export default function getSearchResults(
  searchValue: string,
  updateSearchState: React.Dispatch<React.SetStateAction<ISearchState>>
) {
  const apiEndpoint = !searchValue
    ? API_URL
    : `${API_URL}?search=${searchValue}`;

  axios
    .get<IPlanetResponse>(apiEndpoint)
    .then((response) => {
      console.log(response.data);

      updateSearchState({
        searchValue: searchValue,
        searchResults: response.data ? response.data.results : null,
      });
    })
    .catch(() => {
      console.log('Not Found');
    });
  localStorage.setItem('prevSearchValue', searchValue);
}
