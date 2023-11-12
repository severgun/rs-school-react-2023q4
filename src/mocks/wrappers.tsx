import { BrowserRouter } from 'react-router-dom';
import { SearchContext } from '@/context/SearchContext';
import { IAnimalsResponse } from '@/types';
import React, { useState } from 'react';

export const SearchContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const searchValueState = useState<string>('');
  const searchResultsState = useState<IAnimalsResponse | null>(null);

  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ searchValueState, searchResultsState }}>
        {children}
      </SearchContext.Provider>
    </BrowserRouter>
  );
};
