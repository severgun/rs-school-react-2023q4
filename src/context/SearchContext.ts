import { IAnimalsResponse } from '@/types';
import React, { createContext } from 'react';

export interface ISearchContext {
  searchValueState:
    | [
        searchValue: string,
        setSearchValue: React.Dispatch<React.SetStateAction<string>>,
      ]
    | [];
  searchResultsState:
    | [
        searchResults: IAnimalsResponse | null,
        setSearchResults: React.Dispatch<
          React.SetStateAction<IAnimalsResponse | null>
        >,
      ]
    | [];
}
export const SearchContext = createContext<ISearchContext>({
  searchValueState: [],
  searchResultsState: [],
});
