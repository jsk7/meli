import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Busqueda from './containers/Busqueda';
import ProductDetails from './containers/ProductDetails';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/items" component={Busqueda}/>
    <Route path="/items/:id" component={ProductDetails}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
