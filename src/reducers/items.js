import initialState from './initialState';
import * as types from '../constants/itemsTypes';

export default (state = initialState.items, action) => {
  let newState;

  switch(action.type) {
    case types.SAVE_ITEMS:
      newState = {...state};
      newState.all = [...state.all, ...action.payload];
      return newState;

    case types.FETCH_DESCRIPTION_SUCCESS:
      newState = {...state};
      newState.descriptions = [...state.descriptions, action.payload]
      return newState;

    case types.FETCH_CATEGORIES_SUCCESS:
      newState = {...state};
      newState.categories = [...state.categories, action.payload];
      return newState;

    case types.CLEAR_ITEMS:
      return initialState.items;

    default:
      return state;
  }
};
