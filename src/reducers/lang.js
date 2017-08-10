import initialState from './initialState';

export default (state = initialState.lang, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
