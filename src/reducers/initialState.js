// Usualmente el idioma se configuraria con una accion en la raiz de nuestra app
import lang from '../language/es';

export default {
  search: {
    input: '',
    maxFetch: 4,
    shouldFetch: false,
    filters: [],
    paging: {},
    results: [],
    currentSearch: ""
  },
  items: {
    all: [],
    descriptions: [],
    categories: []
  },
  lang
};
