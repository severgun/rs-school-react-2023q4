import React, { Component } from 'react';
import { Header, Main } from './components';
import axios from 'axios';

export interface ISearchState {
  searchValue: string;
  searchResults: Record<string, never>;
}

class App extends Component {
  state = {
    searchValue: '',
    searchResults: {},
  };

  updateState = (newState: ISearchState) => {
    this.setState(newState);
  };

  componentDidMount() {
    const searchValue = localStorage.getItem('prevSearchValue') || '';

    const getSearchResults = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchValue}`
        );
        this.setState({
          searchValue,
          searchResults: res,
        });

        console.log(res);
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
