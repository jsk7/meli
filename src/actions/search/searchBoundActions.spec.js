import * as actionCreators from './searchActionCreators';
import * as searchActions from './searchBoundActions';
import * as itemsActionCreators from '../items/itemsActionCreators';
import { push } from 'react-router-redux';
import api from '../../api';
import sinon from 'sinon';
import searchMock from '../../mocks/search';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('Items Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store, dispatch, actionsCalled, mockText = "text";
  let initialState = {
    search: {
      input: "input mocked"
    },
    routing: {
      locationBeforeTransitions: {
        pathname: ""
      }
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
    dispatch = store.dispatch;
    store.clearActions();
  });

  describe('Change search URL', () => {
    store = mockStore(initialState);

    it('should only append text in url if user was already searching', () => {
      const currentSlug = "/search"
      initialState.routing.locationBeforeTransitions.pathname = currentSlug

      dispatch(searchActions.changeToSearchLocation(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(push(currentSlug + mockText));
    })

    it('should change to search if user wasnt searching', () => {
      const currentSlug = "/"
      initialState.routing.locationBeforeTransitions.pathname = currentSlug;
      const expectedPathname = "/items?search=" + mockText

      dispatch(searchActions.changeToSearchLocation(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( push(expectedPathname) );
    })
  })

  describe('Search Input', () => {
    store = mockStore(initialState);

    it('should dispatch input changed action', () => {
      dispatch(searchActions.searchInputChanged(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.searchChanged(mockText));
    })
  })

  describe('Search Fetch', () => {
    beforeEach(() => {
      sinon.stub(api, 'search');
      store.clearActions();
    });
    afterEach(() => {
      api.search.restore();
    });

    it('should execute search', async () => {
      api.search.resolves(searchMock);

      await dispatch(searchActions.search(mockText));

      expect( api.search.called ).toBe(true);
    })

    it('should dispatch clear items on search', async () => {
      api.search.resolves(searchMock);

      await dispatch(searchActions.search(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(itemsActionCreators.clearItems());
    })

    it('should dispatch request action on search', async () => {
      api.search.resolves(searchMock);

      await dispatch(searchActions.search(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.searchRequest());
    })

    it('should dispatch success action on search resolve', async () => {
      api.search.resolves(searchMock);

      await dispatch(searchActions.search(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.searchSuccess());
    })

    it('should dispatch save search data action on search resolve', async () => {
      api.search.resolves(searchMock);

      await dispatch(searchActions.search(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.saveSearchData(searchMock));
    })

    it('should fail on search reject', async () => {
      const mocked_error = new Error("mocked_error");
      api.search.rejects(mocked_error);

      await dispatch(searchActions.search(mockText));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.searchFailed(mocked_error));
    })

  })
});
