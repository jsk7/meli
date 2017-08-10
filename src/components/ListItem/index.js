import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './ListItem.scss';

export default class ItemQuickView extends React.Component {

  render() {
    const { item, lang } = this.props;

    const priceClassname = classnames({
      price: true,
      placeholder: !item.price
    });
    const titleClassname = classnames({
      title: true,
      placeholder: !item.title
    })
    const subtitleClassname = classnames({
      title: true,
      placeholderSubtitle: !item.condition
    })
    return (
      <div className="ItemQuickView" >
        <img src={item.thumbnail} className="ItemQuickImage" />
        <div className="description">
          <div className="header">
            <h2 className={priceClassname}>{`$ ${item.price}`}</h2>
            <img className="shipping"
                  src={require('../../assets/ic_shipping@2x.png.png')}
            />
            <h4 className="location">{item.seller_address.state.name}</h4>
          </div>
          <h3 className={titleClassname}>
            <span className="capitalize">
              {item.title}
            </span>
          </h3>
          <h3 className={subtitleClassname}>
            <span className="capitalize">
              {lang[item.condition]}
            </span>
          </h3>
        </div>
      </div>
    )
  }
}

ItemQuickView.propTypes = {
  item: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired
}
