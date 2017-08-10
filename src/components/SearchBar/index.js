import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import './SearchBar.scss';

class SearchBar extends React.PureComponent {

  render() {
    const { value, onChange, search } = this.props;

    return (
      <div className="SearchBar">
        <form onSubmit={search}>
          <input type="text"
                  placeholder="Nunca dejes de buscar"
                  value={value}
                  onChange={onChange}
          />
          <button type="submit"
                  className="searchButton"
          >
            <i className="search" />
          </button>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func
}

export default withRouter(SearchBar);
