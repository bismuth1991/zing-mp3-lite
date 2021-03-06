import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './search_result';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { songState, receiveQuerySongs } = this.props;

    receiveQuerySongs(songState);

    this.setState({
      query: '',
    });

    window.location.hash = '/search-results';
  }

  handleChange(e) {
    this.setState(
      { query: e.target.value },
      () => { document.addEventListener('click', this.closeDropdown); },
    );

    const { fetchQueryData } = this.props;
    fetchQueryData(e.target.value);
  }

  closeDropdown() {
    this.setState(
      { query: '' },
      () => { document.removeEventListener('click', this.closeDropdown); },
    );
  }

  render() {
    const { query } = this.state;
    const { songs, artists, albums } = this.props;

    return (
      <div className="search-bar">
        <form className="input-wrapper" onSubmit={this.handleSubmit}>
          <button type="submit"><i className="fa fa-search" /></button>

          <input
            type="text"
            placeholder="Search for songs, artists or albums..."
            value={query}
            onChange={this.handleChange}
          />
        </form>

        <SearchResult
          query={query}
          songs={songs}
          artists={artists}
          albums={albums}
        />
      </div>
    );
  }
}

SearchBar.defaultProps = {
  artists: [],
  albums: [],
};

SearchBar.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  albums: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),

  fetchQueryData: PropTypes.func.isRequired,
  receiveQuerySongs: PropTypes.func.isRequired,
};

export default SearchBar;
