import * as types from '../actionType';

const initialState = {
  page: '7×24',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEWS_PAGE_CHANGE:
      return {
        ...state,
        page: action.page,
      };
    default: return state;
  }
};
export default reducer;