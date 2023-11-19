import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { IAnimalsResponse } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSearchValue } from '@/store/slices/searchValueSlice';
import {
  selectItemsPerPage,
  setItemsPerPageValue,
} from '@/store/slices/itemsPerPageSlice';
import { useGetAnimalsBySearchValueMutation } from '@/services/animalsApi';

export default function Pagination(): React.JSX.Element {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { itemsPerPage } = useAppSelector(selectItemsPerPage);
  const { searchValue } = useAppSelector(selectSearchValue);
  const dispatch = useAppDispatch();
  const [searchResults, setSearchResults] = useState<IAnimalsResponse | null>(
    null
  );
  const [getAnimalsBySearchValue, { isLoading }] =
    useGetAnimalsBySearchValueMutation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getSearchResults = async () => {
      const data = await getAnimalsBySearchValue({
        searchValue,
        pageNum: currentPage,
        pageSize: itemsPerPage,
      }).unwrap();

      setSearchResults(data);
    };

    getSearchResults();
  }, [currentPage, getAnimalsBySearchValue, itemsPerPage, searchValue]);

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemsPerPageValue(+event.target.value));

    setCurrentPage(1);

    setSearchParams((searchParams) => {
      searchParams.set('page', '1');
      return searchParams;
    });
  };

  const handlePrevPage = async () => {
    const prevPageNum = currentPage > 1 ? currentPage - 1 : 1;

    setSearchParams((searchParams) => {
      searchParams.set('page', prevPageNum.toString());
      return searchParams;
    });

    setCurrentPage(prevPageNum);
  };

  const handleNextPage = () => {
    const nextPageNum = currentPage + 1;

    setSearchParams((searchParams) => {
      searchParams.set('page', nextPageNum.toString());
      return searchParams;
    });

    setCurrentPage(nextPageNum);
  };

  const getListOfAnimals = (searchResults: IAnimalsResponse) => {
    return searchResults.animals.map((item) => (
      <li key={item.uid}>
        <NavLink
          to={{
            pathname: `details/${item.uid}`,
            search: searchParams.toString(),
          }}
        >
          {item.name}
        </NavLink>
      </li>
    ));
  };

  const handleListRender = (): React.ReactNode => {
    if (isLoading) {
      return 'Loading...';
    } else {
      if (searchResults && searchResults.animals.length === 0) {
        return 'Sorry! Nothing was found';
      } else {
        return searchResults && <ul>{getListOfAnimals(searchResults)}</ul>;
      }
    }
  };

  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'A') {
          navigate({ pathname: '/', search: searchParams.toString() });
        }
      }}
    >
      <div>
        <button
          disabled={searchResults?.page.firstPage}
          onClick={handlePrevPage}
        >
          &lt;
        </button>
        <span>{currentPage}</span>
        <button
          disabled={searchResults?.page.lastPage}
          onClick={handleNextPage}
        >
          &gt;
        </button>
        <label htmlFor="items-per-page">Items Per Page:</label>
        <select
          name="items-per-page"
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(e)}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>{handleListRender()}</div>
    </div>
  );
}
