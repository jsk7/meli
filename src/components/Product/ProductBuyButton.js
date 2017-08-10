import React from 'react';
import PropTypes from 'prop-types';

const ProductBuyButton = (props) =>
  <div className="ProductBuyButton">
    <button>
      <a href={props.link}
          className="capitalize"
      >
        {props.text}
      </a>
    </button>
  </div>;

ProductBuyButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default ProductBuyButton;
