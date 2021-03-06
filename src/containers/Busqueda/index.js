import React from 'react';
import PropTypes from 'prop-types';
import Categories from '../../components/Categories';
import ItemsList from '../../components/ItemsList';
import ContentFrame from '../../components/ContentFrame';
import * as searchSelectors from '../../selectors/search';
import * as itemsBoundActions from '../../actions/items/itemsBoundActions';
import * as searchBoundActions from '../../actions/search/searchBoundActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Busqueda extends React.PureComponent {

  componentWillMount() {
    // En caso se comparta el link, tomamos la busqueda de la url
    const searchText = this.props.location.query.search;

    if(searchText) {
      this.props.searchActions.searchInputChanged(searchText);
      this.props.searchActions.search();
    }
  }

  componentDidUpdate() {
    if(this.props.itemsToFetch.length) {
      this.props.itemsActions.fetchItems(this.props.itemsToFetch)
    }
  }

  componentWillUnmount() {
    this.props.searchActions.clearSearch();
  }

  render() {
    const { filters, items, searchActions, searchHadNoResults, lang } = this.props;
    const isActuallySearching = !!this.props.location.query.search;
    const message = !isActuallySearching ? lang.search_something : lang.no_results_found

    return (
      <ContentFrame>
        <Categories categories={filters} />
          <ContentFrame.WhiteBox>
            {
              searchHadNoResults || !isActuallySearching ?
              <ContentFrame.Message message={message} />
              :
              <ItemsList
                items={items}
                lang={lang}
                fetch={searchActions.toggleFetch}
              />
            }
        </ContentFrame.WhiteBox>
      </ContentFrame>
    );
  }
}

Busqueda.propTypes = {
  items: PropTypes.array.isRequired,
  itemsToFetch: PropTypes.array,
  filters: PropTypes.array,
  lang: PropTypes.object.isRequired,
  location: PropTypes.object,
  searchHadNoResults: PropTypes.bool.isRequired,
  itemsActions: PropTypes.shape({
    fetchItems: PropTypes.func.isRequired
  }),
  searchActions: PropTypes.shape({
    toggleFetch: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    searchInputChanged: PropTypes.func.isRequired
  })
}

const mapStateToProps = state => ({
  items: searchSelectors.itemsProcessed(state),
  itemsToFetch: searchSelectors.itemsToFetch(state),
  searchHadNoResults: searchSelectors.searchHadNoResults(state),
  filters: searchSelectors.getFilters(state),
  lang: state.lang.search
})

const mapDispatchToProps = (dispatch) => {
  return {
    itemsActions: bindActionCreators(itemsBoundActions, dispatch),
    searchActions: bindActionCreators(searchBoundActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Busqueda);
