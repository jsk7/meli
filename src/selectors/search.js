import { createSelector } from 'reselect'
import { getItemsIds, getItems } from './items';
import * as UtilHelper from '../domain/UtilHelper';

const getAllFilters = state => state.search.filters;
const getResults = state => state.search.results;
const getMaxFetch = state => state.search.maxFetch;
const shouldFetch = state => state.search.shouldFetch;
const getCurrentSearch = state => state.search.currentSearch;

export const getResultsIds = createSelector(
  getResults,
  (results) => results.map(result => result.id)
)

export const getFilters = createSelector(
  getAllFilters,
  (filters) => filters.map(filter => filter.name)
)

export const itemsToFetch = createSelector(
  getItemsIds,
  getResultsIds,
  getMaxFetch,
  shouldFetch,
  (itemsAlreadyLoaded, searchResults, maxFetch, shouldFetch) => {
    const itemsToFetch = searchResults.filter(id => !itemsAlreadyLoaded.includes(id))
                                      .slice(0, maxFetch);

    return shouldFetch ? itemsToFetch : [];
  }

)

export const itemsProcessed = createSelector(
  getResults, getItems,
  (results, itemsLoaded) => {
    results = results.map(result => {
      const resultCopy = {...result};
      const fullItemData = itemsLoaded.find(item =>
        item.id === result.id
      );
      if(!fullItemData) {
        return;
      }
      const fullItemImg = fullItemData && fullItemData.pictures[0].url;

      resultCopy.price = UtilHelper.formatMoney(resultCopy.price);
      resultCopy.thumbnail = fullItemImg || result.thumbnail
      resultCopy.title = fullItemData && fullItemData.title;
      resultCopy.subtitle = fullItemData && fullItemData.warranty;
      return resultCopy;
    })
    .filter(r => !!r);

    return results;
  }
)

export const searchHadNoResults = createSelector(
  getResultsIds,
  getCurrentSearch,
  (resultsFromSearch, searchedText) => {
    return !resultsFromSearch.length && !!searchedText;
  }

)
