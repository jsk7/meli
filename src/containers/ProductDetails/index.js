import React from 'react';
import PropTypes from 'prop-types';
import ContentFrame from '../../components/ContentFrame';
import Categories from '../../components/Categories';
import Product from '../../components/Product';
import * as itemSelectors from '../../selectors/items';
import * as itemsBoundActions from '../../actions/items/itemsBoundActions';
import * as searchBoundActions from '../../actions/search/searchBoundActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductDetails extends React.Component {

  componentWillMount() {
    scrollTo(0,0);
    if(!this.props.item) { // => Proviene de un link externo
      this.props.itemsActions.fetchItem(this.props.itemIdFromUrl);
    } else {
      this.props.itemsActions.fetchCategories(this.props.item.category_id)
      this.props.itemsActions.fetchDescription(this.props.item.id);
    }
  }


  render() {
    const { categories, item, lang } = this.props;

    if(!item) {
      // IRL manejariamos este caso con placeholders en cada componente
      return null;
    }

    return (
      <ContentFrame>
        <Categories categories={categories} />
        <ContentFrame.WhiteBox>
          <ContentFrame.LeftPanel>
            <Product.Image src={item.image} />
            <Product.Description
              item={item}
              lang={lang}
            />
          </ContentFrame.LeftPanel>
          <ContentFrame.RightPanel>
            <Product.ShortInfo
              item={item}
              lang={lang}
            />
            <Product.BuyButton
              link={item.permalink}
              text={lang.buy}
            />
          </ContentFrame.RightPanel>
        </ContentFrame.WhiteBox>
      </ContentFrame>
    )
  }
}

ProductDetails.propTypes = {
  categories: PropTypes.array,
  item: PropTypes.object,
  lang: PropTypes.object.isRequired,
  itemIdFromUrl: PropTypes.string,
  itemsActions: PropTypes.object,
  searchActions: PropTypes.object
}

const mapStateToProps = (state, props) => {
  return {
    categories: itemSelectors.getCategories(state, props),
    item: itemSelectors.getItem(state, props),
    lang: state.lang.productDetails,
    itemIdFromUrl: itemSelectors.getUrlId(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    itemsActions: bindActionCreators(itemsBoundActions, dispatch),
    searchActions: bindActionCreators(searchBoundActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
