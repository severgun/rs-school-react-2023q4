import React from 'react';
import { ISearchState } from '../App';
import getSearchResults from '../util/getSearchResults';

interface HeaderProps {
  searchState: ISearchState;
  setSearchState: React.Dispatch<React.SetStateAction<ISearchState>>;
}

export default function Header(props: HeaderProps) {
  const { searchState, setSearchState } = props;
  const { searchValue } = searchState;

  const handleSearch = () => {
    getSearchResults(searchValue, setSearchState);
    localStorage.setItem('prevSearchValue', searchValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      ...searchState,
      searchValue: event.target.value,
    });
  };

  return (
    <header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          Search for Star Track Animals:
          <input
            type="text"
            name="search"
            placeholder="Type your request..."
            value={searchValue}
            onChange={handleChange}
          />
        </label>
        <input type="button" value="Search" onClick={handleSearch} />
      </form>
    </header>
  );
}
