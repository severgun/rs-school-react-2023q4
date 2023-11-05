import { useEffect, useState } from 'react';
import { Header, Main } from './components';
import { IAnimal } from './types';
import getSearchResults from './util/getSearchResults';

export interface ISearchState {
  searchValue: string;
  searchResults: IAnimal[] | null;
}

export default function App() {
  const [searchState, setSearchState] = useState<ISearchState>({
    searchValue: '',
    searchResults: null,
  });

  useEffect(() => {
    const searchValue = localStorage.getItem('prevSearchValue') || '';
    getSearchResults(searchValue, setSearchState);
  }, []);

  return (
    <>
      <Header searchState={searchState} setSearchState={setSearchState} />
      <Main searchState={searchState} />
    </>
  );
}
