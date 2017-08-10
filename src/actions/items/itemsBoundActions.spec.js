import * as actionCreators from './itemsActionCreators';
import * as itemsActions from './itemsBoundActions';
import api from '../../api';
import sinon from 'sinon';
import itemsMock from '../../mocks/items';
import descriptionMock from '../../mocks/description';
import categoriesMock from '../../mocks/categories';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('Items Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let initialState, store, dispatch, actionsCalled;
  let mockedIds = itemsMock.map(item => item.id);

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
    dispatch = store.dispatch;
    store.clearActions();
  });

  describe('Items Fetch', () => {
    beforeEach(() => {
      sinon.stub(api, 'fetchItems');
      sinon.stub(api, 'fetchDescription').resolves(descriptionMock);
      sinon.stub(api, 'fetchCategories').resolves(categoriesMock);
      store.clearActions();
    });
    afterEach(() => {
      api.fetchItems.restore();
      api.fetchDescription.restore();
      api.fetchCategories.restore();
    })

    it('should dispatch success on items fetch', async () => {
      api.fetchItems.resolves(itemsMock);

      await dispatch(itemsActions.fetchItems(mockedIds));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchSuccess() );
    })

    it('should save items on fetch success', async () => {
      api.fetchItems.resolves(itemsMock);

      await dispatch(itemsActions.fetchItems(mockedIds));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.saveItems(itemsMock) );
    })

    it('should dispatch action to save items when fetched', async () => {
      api.fetchItems.resolves(itemsMock);

      await dispatch(itemsActions.fetchItems(mockedIds));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.saveItems(itemsMock));
    })

    it('should dispatch failure on items fetch reject', async () => {
      const mocked_error = new Error("mocked_error");
      api.fetchItems.rejects(mocked_error);

      await dispatch(itemsActions.fetchItems(mockedIds));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual(actionCreators.fetchFailed(mocked_error));
    })
  })


  describe('Item Fetch', () => {
    const itemMock = itemsMock[0];

    beforeEach(() => {
      sinon.stub(api, 'fetchItem');
      store.clearActions();
    });
    afterEach(() => {
      api.fetchItem.restore();
    });

    it('should dispatch success on item fetch', async () => {
      api.fetchItem.resolves(itemMock);

      await dispatch( itemsActions.fetchItem(itemMock.id) );
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchSuccess() );
    });

    it('should save item on fetch success', async () => {
      api.fetchItem.resolves(itemMock);

      await dispatch(itemsActions.fetchItem(itemMock.id));
      expect( actionsCalled ).toContainEqual( actionCreators.saveItems( [ itemMock ] ) );
    });

    it('should dispatch failure on item fetch reject', async () => {
      const mocked_error = new Error("mocked_error");
      api.fetchItem.rejects(mocked_error);

      await dispatch(itemsActions.fetchItem(itemMock.id));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchFailed(mocked_error) );
    });

    it('should dispatch description request', async () => {
      api.fetchItem.resolves(itemMock);

      await dispatch(itemsActions.fetchItem(itemMock.id));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchDescriptionRequest() );
    })

    it('should dispatch categories request', async () => {
      api.fetchItem.resolves(itemMock);

      await dispatch(itemsActions.fetchItem(itemMock.id));
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchCategoriesRequest() );
    })
  });

  describe('Item Description Fetch', () => {

    beforeEach(() => {
      sinon.stub(api, 'fetchDescription');
      store.clearActions();
    });
    afterEach(() => {
      api.fetchDescription.restore();
    });

    it('should dispatch success on description fetch', async () => {
      api.fetchDescription.resolves(descriptionMock);

      await dispatch( itemsActions.fetchItem('mockId') );
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchDescriptionSuccess(descriptionMock, 'mockId') );
    })

    it('should dispatch failed on description fetch reject', async () => {
      const mocked_error = new Error("mocked_error");
      api.fetchDescription.rejects(mocked_error);

      await dispatch( itemsActions.fetchItem('mockId') );
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchDescriptionFailed(mocked_error, 'mockId') );
    })
  })

  describe('Item Categories Fetch', () => {

    beforeEach(() => {
      sinon.stub(api, 'fetchCategories');
      store.clearActions();
    });
    afterEach(() => {
      api.fetchCategories.restore();
    });

    it('should dispatch success on description fetch', async () => {
      api.fetchCategories.resolves(categoriesMock);

      await dispatch( itemsActions.fetchCategories(categoriesMock.id) );
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchCategoriesSuccess(categoriesMock, categoriesMock.id) );
    })

    it('should dispatch failed on description fetch reject', async () => {
      const mocked_error = new Error("mocked_error");
      api.fetchCategories.rejects(mocked_error);

      await dispatch( itemsActions.fetchCategories(categoriesMock.id) );
      actionsCalled = store.getActions();

      expect( actionsCalled ).toContainEqual( actionCreators.fetchCategoriesFailed(mocked_error, categoriesMock.id) );
    })
  })
})
