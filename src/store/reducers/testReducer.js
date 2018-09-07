import * as types from '../actionType';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case types.INCREMENT: return state + 1;
    case types.DECREMENT: return state - 1;
    default: return state;
  }
};
export default reducer;