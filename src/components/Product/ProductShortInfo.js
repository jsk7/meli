import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ProductShortInfo = (props) => {
  const lang = props.lang;
  const {title, price, condition, sold_quantity} = props.item;
  const stateText = `${_.capitalize(lang[condition])} - ${sold_quantity} ${lang.sold}`;
  const enteros = `$ ${price}`;
  return (
    <div className="ProductShortInfo">
        <p className="state"> {stateText} </p>
        <h1 className="title"> {title} </h1>
        <h1 className="price"> {enteros} </h1>
    </div>
  )
}

ProductShortInfo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string,
    condition: PropTypes.string,
    sold_quantity: PropTypes.number,
  }),
  lang: PropTypes.shape({
    sold: PropTypes.string.isRequired
  })
}

export default ProductShortInfo;
