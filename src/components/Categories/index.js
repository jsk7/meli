import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Categories.scss';

export default class Categories extends React.PureComponent {

  render() {
    const { categories } = this.props;

    return (
      <div className="Categories">
        {
          categories.map((category, i) => {
            const isLastItem = i === (categories.length-1);
            const itemClassname = classnames({
              last: isLastItem,
              common: !isLastItem
            })
            return (
              <div key={category+i}>
                <h6 className={itemClassname} >{category}</h6>
                {
                  !isLastItem &&
                  <div className="arrow">&#x227B;</div>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array
}
