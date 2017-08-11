import { createSelector } from 'reselect'
import * as UtilHelper from '../domain/UtilHelper';

export const getItems = state => state.items.all;
export const getUrlId = (state, props) => props.router.params.id
export const getDescriptions = (state) => state.items.descriptions;
const getAllCategories = (state) => state.items.categories;

export const getItemsIds = createSelector(
  getItems,
  (itemsLoaded) => itemsLoaded.map(item => item.id)
)

export const getItem = createSelector(
  getItems,
  getUrlId,
  getDescriptions,
  (itemsLoaded, itemIdFromUrl, descriptions) => {
    let item = itemsLoaded.find(item => item.id === itemIdFromUrl);
    if(!item) {
      return;
    }

    item = Object.assign({}, item);
    const description = descriptions.find(d => d.id === item.id);
    item.plain_text = description && description.plain_text;
    item.html = description && description.text;
    item.price = UtilHelper.formatMoney(item.price);
    item.image = item.pictures && item.pictures.length && item.pictures[0].secure_url;
    return item;
  }
)

export const getCategories = createSelector(
  getItem,
  getAllCategories,
  (item, categoriesInStore) => {
    let category = categoriesInStore.find(c => c.id === item.category_id);
    if(!category) {
      return [];
    }
    const categories = category.path_from_root.map(c => c.name);

    return categories
  }
)
