import * as types from '../../constants/searchTypes';

export const searchChanged = (text) => ({
  type: types.SEARCH_INPUT_CHANGED,
  payload: text
});

export const saveSearchData = (payload) => ({
  type: types.SAVE_SEARCH_DATA,
  payload
});

export const searchRequest = () => ({
  type: types.SEARCH_REQUEST
});

export const searchSuccess = () => ({
  type: types.SEARCH_SUCCESS
});

export const searchFailed = (e) => ({
  type: types.SEARCH_FAILED,
  payload: e
});

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH
});


export const toggleFetch = () => ({
  type: types.TOGGLE_FETCH
})
