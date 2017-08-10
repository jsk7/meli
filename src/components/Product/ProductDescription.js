import React from 'react';
import PropTypes from 'prop-types';

const ProductDescription = (props) =>
  <div className="ProductDescription">
      <div className="no-vertical-margin">
        <h2 className="lang-description capitalize">{props.lang.description}</h2>
        {
          props.item.html ?
          <div dangerouslySetInnerHTML={createMarkup(props.item.html)} /> :
          <p className="text">{props.item.plain_text}</p>
        }
      </div>
  </div>;

const createMarkup = (html) => ({__html: html});

ProductDescription.propTypes = {
  lang: PropTypes.shape({
    description: PropTypes.isRequired
  }),
  item: PropTypes.shape({
    html: PropTypes.string,
    plain_text: PropTypes.string
  })
}

export default ProductDescription;
