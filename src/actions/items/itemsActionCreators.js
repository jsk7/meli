import * as types from '../../constants/itemsTypes';

export const saveItems = (items) => ({
    type: types.SAVE_ITEMS,
    payload: items
  });

export const clearItems = () => ({
  type: types.CLEAR_ITEMS
})

// items request
export const fetchRequest = () => ({
    type: types.FETCH_ITEMS_REQUEST
  })

export const fetchSuccess = () => ({
    type: types.FETCH_ITEMS_SUCCESS
  });

export const fetchFailed = (e) => ({
    type: types.FETCH_ITEMS_FAILED,
    payload: e
  })

// description requests
export const fetchDescriptionRequest = () => ({
  type: types.FETCH_DESCRIPTION_REQUEST
})

export const fetchDescriptionSuccess = (payload, id) => ({
  type: types.FETCH_DESCRIPTION_SUCCESS,
  payload: {...payload, id}
});

export const fetchDescriptionFailed = (e) => ({
  type: types.FETCH_DESCRIPTION_FAILED,
  payload: e
})

// categories requests
export const fetchCategoriesRequest = () => ({
  type: types.FETCH_CATEGORIES_REQUEST
})

export const fetchCategoriesSuccess = (payload, id) => ({
  type: types.FETCH_CATEGORIES_SUCCESS,
  payload: {...payload, id}
})

export const fetchCategoriesFailed = (e) => ({
  type: types.FETCH_CATEGORIES_FAILED,
  payload: e
})
