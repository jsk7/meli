import reducer from './search';
import * as searchActionCreators from '../actions/search/searchActionCreators';
import initialState from './initialState';

describe('Search Reducer', () => {
  const textMock = "text";

  it('should return the initial state on undefined action', () => {
    expect(reducer(undefined, {})).toEqual(initialState.search)
  })

  it('should change input value', () => {
    let newState = reducer(
      undefined,
      searchActionCreators.searchChanged(textMock)
    );
    expect(newState.input).toEqual(textMock);
  })

  it('should clear search data', () => {
    let newState = reducer(
      undefined,
      searchActionCreators.clearSearch()
    );
    expect(newState).toEqual(initialState.search);
  })

})
