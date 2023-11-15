import React, { useState } from 'react';
import { Header, Main } from '@/components';
import { SearchContext } from '@/context/SearchContext';
import { useSearchParams } from 'react-router-dom';
import { IAnimalsResponse } from './types';

export default function App(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const searchValueState = useState<string>(searchParams.get('search') ?? '');
  const searchResultsState = useState<IAnimalsResponse | null>(null);

  return (
    <>
      <SearchContext.Provider value={{ searchValueState, searchResultsState }}>
        <Header />
        <Main />
      </SearchContext.Provider>
    </>
  );
}
