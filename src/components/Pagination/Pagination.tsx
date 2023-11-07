import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import getSearchResults from '../../util/getSearchResults';
import { IAnimalsResponse } from '../../types';

interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export default function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchResults, setSearchResults] = useState<IAnimalsResponse | null>(
    null
  );

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
        searchParams.get('search') || '',
        pageNum,
        paginationState.itemsPerPage
      );

      setSearchResults(res);

      setLoading(false);
    };

    getPageData();
  }, [searchParams, paginationState.itemsPerPage]);

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
      console.log(prevPageNum);
      searchParams.set('page', prevPageNum.toString());
      return searchParams;
    });
  };

  const handleNextPage = () => {
    const nextPageNum = paginationState.currentPage + 1;

    setSearchParams((searchParams) => {
      console.log(nextPageNum);
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
      <li key={item.uid}>{item.name}</li>
    ));
  };

  return (
    <div className={styles.pagination}>
      <div>
        <div>
          <button
            disabled={searchResults?.page.firstPage}
            onClick={handlePrevPage}
          >
            &lt;
          </button>
          <span>{paginationState.currentPage}</span>{' '}
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
        <div>
          {loading
            ? 'Loading...'
            : searchResults && <ul>{getListOfAnimals(searchResults)}</ul>}
        </div>
      </div>
      <div></div>
    </div>
  );
}
