import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import LogoMercadoLibre from '../LogoMercadoLibre';
import { Link } from 'react-router';
import './NavBar.scss';

export default class NavBar extends React.PureComponent {

  render() {
    return (
      <div className="NavBar">
        <div className="container">
          <div className="row">
            <div className="col-1 col-2-sm logo">
              <Link to="/">
                <LogoMercadoLibre />
              </Link>
            </div>
            <div className="col-11 col-10-sm bar">
              <SearchBar value={this.props.searchInput}
                          onChange={this.props.onSearchChange}
                          search={this.props.search}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
}
