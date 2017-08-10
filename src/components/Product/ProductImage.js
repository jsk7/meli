import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = (props) =>
  <div className="ProductImage">
      <img src={props.src} />
  </div>;

ProductImage.propTypes = {
  src: PropTypes.string.isRequired
}

export default ProductImage;
