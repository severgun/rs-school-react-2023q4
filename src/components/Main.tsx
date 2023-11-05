import React from 'react';
import { ISearchState } from '../App';
import { IPlanet } from '../types';

interface MainProps {
  searchState: ISearchState;
}

export default function Main(props: MainProps) {
  const { searchState } = props;

  const getListOfPlanets = (arr: IPlanet[]) => {
    return arr.map((planetData) => {
      return (
        <li key={planetData.url}>
          <h3>{planetData.name}</h3>
          {arr.length === 1 ? (
            <ul>
              <li>Diameter: {planetData.diameter} km</li>
              <li>Gravity: {planetData.gravity} G</li>
              <li>Population: {planetData.population}</li>
              <li>Rotation Period: {planetData.rotation_period} hours</li>
              <li>Orbital Period: {planetData.orbital_period} days</li>
              <li>Terrain: {planetData.terrain}</li>
              <li>Surface water: {planetData.surface_water} %</li>
              <li>Climate: {planetData.climate}</li>
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
      <h1>Star Wars Planets:</h1>
      <ul>
        {searchState.searchResults ? (
          getListOfPlanets(searchState.searchResults)
        ) : (
          <p>Nothing was found.</p>
        )}
      </ul>
    </main>
  );
}
