import React from 'react';
import ListItem from './index';
import renderer from 'react-test-renderer';
import itemsMock from '../../mocks/items';

describe('<ListItem />', () => {
  it('should render correctly if it has an item', () => {
    const tree = renderer.create(
      <ListItem item={itemsMock[0]} lang={{}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should render placeholders if it has no item', () => {
    const tree = renderer.create(
      <ListItem item={{}} lang={{}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
