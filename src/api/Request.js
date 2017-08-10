import 'whatwg-fetch';

export default class Request {
  constructor(config) {
    this.apiURL = config.apiURL
  }

  getParams(object) {
    if(!object) {
      return '';
    }
    let params = Object.keys(object);
    params = params
            .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(object[p])}`)
            .join('&');
    params = `?${params}`;

    return params;
  }

  request(endpoint, method, params, body) {
    const config = {
      method,
      body,
      headers: new Headers()
    };
    const url = this.apiURL + endpoint + `${this.getParams(params)}`;

    return fetch(url, config)
            .then(res => res.json());
  }
}
