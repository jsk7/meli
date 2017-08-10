import { combineReducers } from 'redux';
import search from './search';
import items from './items';
import lang from './lang';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  search,
  items,
  lang,
  routing: routerReducer
});

export default rootReducer;
