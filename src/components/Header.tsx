import { SearchContext } from '@/context/SearchContext';
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Header(): React.JSX.Element {
  const { searchValueState } = useContext(SearchContext);
  const [, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = searchValueState;

  const handleSearch = () => {
    setSearchParams({
      search: searchValue || '',
      page: '1',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchValue !== undefined) {
      setSearchValue(event.target.value);
    }
  };

  return (
    <header>
      <form onSubmit={handleSearch}>
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
