import * as actions from './searchActionCreators';
import * as itemsActions from '../items/itemsActionCreators';
import api from '../../api';
import { push } from 'react-router-redux';

export const searchInputChanged = (e) =>
  dispatch => {
    let searchText;
    if(e.preventDefault) { // Is Event
      e.preventDefault();
      searchText = e.target.value;
    } else {
      searchText = e;
    }

    dispatch(actions.searchChanged(searchText));
  };

export const search = (e) =>
  (dispatch, getState) => {
    if(e && e.preventDefault) {
      e.preventDefault();
    }

    const searchText = getState().search.input;

    dispatch(itemsActions.clearItems());
    dispatch(clearSearch());
    dispatch(changeToSearchLocation(searchText));
    dispatch(actions.searchRequest());
    return (
      api.search(searchText)
      .then((res) => {
        dispatch(actions.searchSuccess());
        dispatch(actions.saveSearchData(res));
        dispatch(actions.toggleFetch(true));
      })
      .catch(e => dispatch(actions.searchFailed(e)) )
    )
  };

export const clearSearch = () =>
  dispatch => dispatch(actions.clearSearch());

export const changeToSearchLocation = (searchText) =>
  (dispatch, getState) => {
    const currentLocation = getState().routing.locationBeforeTransitions.pathname;
    const wasSearching = currentLocation.search("/search") === 0;
    const nextLocation = wasSearching ?
                        currentLocation+searchText :
                        `/items?search=${searchText}`;
    dispatch(push(nextLocation));
  }


export const toggleFetch = (boolean) =>
  dispatch =>
    dispatch(actions.toggleFetch(boolean));
