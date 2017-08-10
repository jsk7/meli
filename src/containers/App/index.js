import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchBoundActions from '../../actions/search/searchBoundActions';

class App extends React.PureComponent {

  render() {
    const { searchInput, searchActions } = this.props;

    return (
      <div id="App">
        <NavBar searchInput={searchInput}
                onSearchChange={searchActions.searchInputChanged}
                search={searchActions.search}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  searchInput: PropTypes.string.isRequired,
  searchActions: PropTypes.shape({
    searchInputChanged: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
  }),
  children: PropTypes.array
}

const mapStateToProps = state => ({
  searchInput: state.search.input
})

const mapDispatchToProps = (dispatch) => {
  return {
    searchActions: bindActionCreators(searchBoundActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
