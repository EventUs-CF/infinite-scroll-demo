import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

export default class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.props.list.length
    ) {
      this.props.onPaginatedSearch();
    }
  }

  render() {
    return (
      <div className="list">
        {this.props.list.map((item) => {
          return <div className="list-row" key={uuid()}>
            <a href={item.url}>{item.title}</a>
          </div>; 
          })
        } 
      </div>
    );
  }
}

Scroll.propTypes = {
  onPaginatedSearch: PropTypes.func,
  list: PropTypes.array,
};
