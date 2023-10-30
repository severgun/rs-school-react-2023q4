import React, { Component } from 'react';
import { Header, Main } from './components';
import axios from 'axios';

export interface IPlanet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface ISearchState {
  searchValue: string;
  searchResults?: IPlanet[];
}

class App extends Component {
  state = {
    searchValue: '',
    searchResults: undefined,
  };

  updateState = (newState: ISearchState) => {
    this.setState(newState);
  };

  componentDidMount() {
    const searchValue = localStorage.getItem('prevSearchValue') || '';

    const apiEndpoint =
      searchValue === ''
        ? `https://swapi.dev/api/planets/`
        : `https://swapi.dev/api/planets/?search=${searchValue}`;

    const getSearchResults = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        this.setState(() => {
          return {
            searchValue,
            searchResults: res.data.results,
          };
        });
      } catch (error) {}
    };
    getSearchResults();
  }

  render() {
    return (
      <>
        <Header searchState={this.state} updateSearchState={this.updateState} />
        <Main searchState={this.state} />
      </>
    );
  }
}

export default App;
