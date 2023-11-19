import { useGetAnimalsBySearchValueMutation } from '@/services/animalsApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectItemsPerPage } from '@/store/slices/itemsPerPageSlice';
import { setSearchValue } from '@/store/slices/searchValueSlice';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Header(): React.JSX.Element {
  const [searchInputState, setSearchInputState] = useState<string>('');
  const dispatch = useAppDispatch();
  const { itemsPerPage } = useAppSelector(selectItemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getAnimalsBySearchValue] = useGetAnimalsBySearchValueMutation();

  useEffect(() => {
    const searchValue = searchParams.get('search');
    if (searchValue) {
      setSearchInputState(searchValue);
      dispatch(setSearchValue(searchValue));
    }
  }, [dispatch, searchParams]);

  const handleSearch = async () => {
    setSearchParams({
      search: searchInputState || '',
      page: '1',
    });

    await getAnimalsBySearchValue({
      searchValue: searchInputState,
      pageNum: 1,
      pageSize: itemsPerPage,
    });

    dispatch(setSearchValue(searchInputState));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputState(event.target.value);
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
            value={searchInputState}
            onChange={handleChange}
          />
        </label>
        <input type="button" value="Search" onClick={handleSearch} />
      </form>
    </header>
  );
}
