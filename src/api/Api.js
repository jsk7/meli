import Request from './Request';
import config from './config';

export default class Api {
  constructor() {
    this.api = new Request(config);
  }

  search(text) {
    const params = {
      q: text
    };
    return this.get('/sites/MLA/search', params);
  }

  fetchCategories(id) {
    return this.get(`/categories/${id}`);
  }

  fetchItems(ids) {
    const params = {
      ids: ids.join()
    };
    return this.get('/items', params);
  }

  fetchItem(id) {
    return this.get(`/items/${id}`);
  }

  fetchDescription(id) {
    return this.get(`/items/${id}/description`);
  }

  get(endpoint, params) {
    return this.api.request(endpoint, 'GET', params)
  }
}
