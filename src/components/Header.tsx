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
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
      .then((response) => {
        this.props.updateSearchState({
          searchValue: searchValue,
          searchResults: response.data,
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
