import React from 'react';
import SearchBar from './index';
import renderer from 'react-test-renderer';

describe('<SearchBar />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <SearchBar value={"textMock"} search={() => {}} onChange={() => {}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});


