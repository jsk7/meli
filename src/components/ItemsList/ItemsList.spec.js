import React from 'react';
import ItemsList from './index';
import renderer from 'react-test-renderer';
import itemsMock from '../../mocks/items';


describe('<ItemsList />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ItemsList items={itemsMock} lang={{}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});



