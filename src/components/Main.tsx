import { Component } from 'react';
import { ISearchState } from '../App';

interface Props {
  searchState: ISearchState;
}

class Main extends Component<Props> {
  render() {
    return (
      <main>
        <h1>Star Wars Planets:</h1>
        <ul>
          {this.props.searchState.searchResults?.map((p, i) => (
            <li key={i}>
              <h3>{p.name}</h3>
              Diameter: {p.diameter}, Population: {p.population}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default Main;
