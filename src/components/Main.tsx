import React from 'react';
import { ISearchState } from '../App';
import { IAnimal } from '../types';

interface MainProps {
  searchState: ISearchState;
}

export default function Main(props: MainProps) {
  const { searchState } = props;

  const getListOfAnimals = (arr: IAnimal[]) => {
    return arr.map((animalsData) => {
      console.log(animalsData.earthAnimal);

      return (
        <li key={animalsData.uid}>
          <h3>{animalsData.name}</h3>
          {arr.length === 1 ? (
            <ul>
              <li>
                Earth Animal: {animalsData.earthAnimal ? 'True' : 'False'}
              </li>
              <li>
                Earth Insect: {animalsData.earthInsect ? 'True' : 'False'}
              </li>
              <li>It is avian: {animalsData.avian ? 'True' : 'False'}</li>
              <li>It is feline: {animalsData.feline ? 'True' : 'False'}</li>
              <li>It is canine: {animalsData.canine ? 'True' : 'False'}</li>
            </ul>
          ) : (
            <></>
          )}
        </li>
      );
    });
  };

  return (
    <main>
      <h1>Star Track Animals:</h1>
      <ul>
        {searchState.searchResults ? (
          getListOfAnimals(searchState.searchResults)
        ) : (
          <p>Nothing was found.</p>
        )}
      </ul>
    </main>
  );
}
