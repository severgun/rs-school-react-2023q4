import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );

  const handleSearch = () => {
    setSearchParams({
      search: searchValue,
      page: '1',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
