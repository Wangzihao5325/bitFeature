import * as types from '../actionType';

const initialState = {
  scheme: null,
  contract: null,
  choose: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DEPOSIT_STORE_INIT:
      return {
        ...state,
        scheme: action.scheme,
        contract: action.contract,
        choose: Object.keys(action.scheme)[0]
      };
    case types.DEPOSIT_CHOOSE_SCHEME:
      return {
        ...state,
        choose: action.choose
      };
    default: return state;
  }
};
export default reducer;