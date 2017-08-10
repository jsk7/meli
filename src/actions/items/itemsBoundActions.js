import * as actions from '../items/itemsActionCreators';
import api from '../../api';

export const fetchItems = (ids) =>
  dispatch => {
    dispatch(actions.fetchRequest());

    return api.fetchItems(ids)
      .then(results => {
        dispatch(actions.fetchSuccess());
        dispatch(actions.saveItems(results));
        return results
      })
      .catch(e => dispatch(actions.fetchFailed(e)) )
  };

export const fetchItem = (id) =>
  dispatch => {
    dispatch(actions.fetchRequest());

    return api.fetchItem(id)
      .then(result => {
        dispatch(actions.fetchSuccess());
        dispatch(actions.saveItems([result]));
        dispatch(fetchCategories(result.category_id));
        return dispatch(fetchDescription(id));
      })
      .catch(e => dispatch(actions.fetchFailed(e)) )
  };


export const fetchDescription = (id) =>
  dispatch => {
    dispatch(actions.fetchDescriptionRequest());

    return api.fetchDescription(id)
      .then(results => dispatch(actions.fetchDescriptionSuccess(results, id)) )
      .catch(e => dispatch(actions.fetchDescriptionFailed(e)))
  };

export const fetchCategories = (id) =>
  dispatch => {
    dispatch(actions.fetchCategoriesRequest());

    return api.fetchCategories(id)
      .then(results => dispatch(actions.fetchCategoriesSuccess(results, id)) )
      .catch(e => dispatch(actions.fetchCategoriesFailed(e)) )
  }
