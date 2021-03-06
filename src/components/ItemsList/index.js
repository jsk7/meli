import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import LoadMoreContents from '../LoadMoreContents';
import { Link } from 'react-router';
import './ItemsList.scss';

export default class ItemsList extends React.PureComponent {

  render() {
    let { items, fetch  } = this.props;

    if(!items.length) { // Placeholders
      for(let i = 0; i < 4; i++)
        items = [...items, {
          id: 'placeholder-' + i,
          title: "",
          price: "",
          condition: "",
          seller_address: {state: {}}
        }];
    }

    return (
      <div className="ItemsList">
        <ul>
          {
            items.map(item =>
              <li key={item.id}>
                <div className="row">
                  <div className="item">
                    <Link to={`/items/${item.id}`}>
                      <ListItem item={item}
                                lang={this.props.lang}
                      />
                    </Link>
                  </div>
                  <hr />
                </div>
              </li>
            )
          }
        </ul>
        <LoadMoreContents load={fetch} />
      </div>
    )
  }
}

ItemsList.propTypes = {
  items: PropTypes.array,
  lang: PropTypes.object.isRequired
}
