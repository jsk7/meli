import initialState from './initialState';
import * as types from '../constants/searchTypes';

export default (state = initialState.search, action) => {
  let newState;

  switch(action.type) {
    case types.SEARCH_INPUT_CHANGED:
      newState = {...state};
      newState.input = action.payload;
      return newState;

    case types.SAVE_SEARCH_DATA:
      newState = {...state};
      newState.filters = action.payload.filters && action.payload.filters.length ?
                        action.payload.filters[0].values[0].path_from_root :
                        [];
      newState.results = action.payload.results;
      newState.paging = action.payload.paging;
      newState.currentSearch = action.payload.query;
      return newState;

    case types.CLEAR_SEARCH:
      newState = {...initialState.search};
      newState.filters = state.filters
      return newState;

    case types.TOGGLE_FETCH:
      newState = {...state};
      newState.shouldFetch = !state.shouldFetch;
      return newState;

    default:
      return state;
  }
};
