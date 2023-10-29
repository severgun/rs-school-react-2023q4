import { Component } from 'react';
import { ISearchState } from '../App';

interface Props {
  searchState: ISearchState;
}

class Main extends Component<Props> {
  render() {
    return (
      <main>
        <p>{this.props.searchState.searchResults.name}</p>
      </main>
    );
  }
}

export default Main;
