import reducer from './items';
import * as itemsActionCreators from '../actions/items/itemsActionCreators';
import initialState from './initialState';
import itemsMock from '../mocks/items';
import descriptionMock from '../mocks/description';

describe('Items Reducer', () => {
  const id_mock = "id_random"

  it('should return the initial state on undefined action', () => {
    expect(reducer(undefined, {})).toEqual(initialState.items)
  })

  it('should save items', () => {
    let newState = reducer(
      undefined,
      itemsActionCreators.saveItems(itemsMock)
    );
    expect(newState.all).toEqual(itemsMock)
  })

  it('should clear items', () => {
    let newState = reducer(
      undefined,
      itemsActionCreators.clearItems()
    );
    expect(newState.all).toEqual([]);
  })

  it('should save descriptions', () => {
    const expectedReducedDescription = {...descriptionMock, id: id_mock};
    let newState = reducer(
      undefined,
      itemsActionCreators.fetchDescriptionSuccess(descriptionMock, id_mock)
    );
    expect(newState.descriptions).toEqual([expectedReducedDescription]);

  })

  it('should only save one description', () => {
    const firstExpectedReducedDescription = {...descriptionMock, id: id_mock};
    let newState = reducer(
      undefined,
      itemsActionCreators.fetchDescriptionSuccess(firstExpectedReducedDescription, id_mock)
    );
    expect(newState.descriptions).toEqual([firstExpectedReducedDescription]);

    const secondExpectedReducedDescription = {...descriptionMock, id: "id random 2"};
    newState = reducer(
      undefined,
      itemsActionCreators.fetchDescriptionSuccess(secondExpectedReducedDescription, "id random 2")
    );
    expect(newState.descriptions).toEqual([secondExpectedReducedDescription]);
  })
})
