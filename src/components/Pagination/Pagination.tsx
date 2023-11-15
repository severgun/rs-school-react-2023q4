import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import getSearchResults from '@/util/getSearchResults';
import { IAnimalsResponse } from '@/types';
import { SearchContext } from '@/context/SearchContext';

interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export default function Pagination(): React.JSX.Element {
  const navigate = useNavigate();

  const { searchValueState, searchResultsState } = useContext(SearchContext);
  const [searchValue] = searchValueState;
  const [searchResults, setSearchResults] = searchResultsState;

  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationState, setPaginationState] = useState<IPaginationState>({
    currentPage: parseInt(searchParams.get('page') || '1'),
    itemsPerPage: 10,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pageNum = parseInt(searchParams.get('page') || '1');
    setPaginationState((paginationState) => {
      return { ...paginationState, currentPage: pageNum };
    });

    const getPageData = async () => {
      setLoading(true);

      const res = await getSearchResults(
        searchValue || '',
        pageNum,
        paginationState.itemsPerPage
      );

      if (setSearchResults !== undefined) {
        setSearchResults(res);
      }

      setLoading(false);
    };

    getPageData();
  }, [
    searchValue,
    setSearchResults,
    searchParams,
    paginationState.itemsPerPage,
  ]);

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaginationState({
      ...paginationState,
      itemsPerPage: +event.target.value,
    });

    setSearchParams((searchParams) => {
      searchParams.set('page', '1');
      return searchParams;
    });
  };

  const handlePrevPage = async () => {
    const prevPageNum =
      paginationState.currentPage > 1 ? paginationState.currentPage - 1 : 1;

    setSearchParams((searchParams) => {
      searchParams.set('page', prevPageNum.toString());
      return searchParams;
    });
  };

  const handleNextPage = () => {
    const nextPageNum = paginationState.currentPage + 1;

    setSearchParams((searchParams) => {
      searchParams.set('page', nextPageNum.toString());
      return searchParams;
    });

    setPaginationState({
      ...paginationState,
      currentPage: nextPageNum,
    });
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
    if (loading) {
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
        <span>{paginationState.currentPage}</span>
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
