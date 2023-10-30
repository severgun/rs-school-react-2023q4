import axios from 'axios';
import { Component } from 'react';
import { ISearchState } from '../App';

interface Props {
  searchState: ISearchState;
  updateSearchState: (newState: ISearchState) => void;
}

class Header extends Component<Props> {
  handleSearch() {
    const { searchValue } = this.props.searchState;

    const apiEndpoint =
      searchValue === ''
        ? `https://swapi.dev/api/planets/`
        : `https://swapi.dev/api/planets/?search=${searchValue}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        this.props.updateSearchState({
          searchValue: searchValue,
          searchResults: response.data.results,
        });
      })
      .catch(() => {
        console.log('Not Found');
      });
    localStorage.setItem('prevSearchValue', searchValue);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateSearchState({
      ...this.props.searchState,
      searchValue: event.target.value.trimEnd(),
    });
  };

  render() {
    return (
      <header>
        <form>
          <label>
            Search for SW Planets:
            <input
              type="text"
              name="search"
              placeholder="Type your request..."
              value={this.props.searchState.searchValue}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="button"
            value="Search"
            onClick={() => this.handleSearch()}
          />
        </form>
      </header>
    );
  }
}

export default Header;
