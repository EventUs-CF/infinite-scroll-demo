
import React from 'react';
import Scroll from '../scroll/scroll';


const applyUpdateResult = result => prevState => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
});

const applySetResult = result => () => ({
  hits: result.hits,
  page: result.page,
});

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=100`;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
    };
  }

  onInitialSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    this.fetchStories(value, 0);
  }

  onPaginatedSearch = () =>
    this.fetchStories(this.input.value, this.state.page + 1);

  fetchStories = (value, page) =>
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));

  onSetResult = (result, page) =>
    (page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result)));

  render() {
    return (
      <div className="page">
      <h1>Infinite Scroll Spike</h1>
      <p>Please search for a topic from Hacker News</p>
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={(node) => {
              this.input = node;
              return node;
            }}/> 
            <button type="submit">Search</button>
          </form>
        </div>
        <Scroll
          list={this.state.hits}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}
