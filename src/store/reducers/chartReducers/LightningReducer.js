import * as types from '../../actionType';

const initialState = {
  times: [],
  prices: [],
  dotSize: null,
  isActive: false,
  isLoading:true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIGHTNING_STORE_START:
      return {
        ...state,
        dotSize: action.dotSize,
        isActive: true
      };
    case types.LIGHTNING_STORE_UPDATE:
      let timesReg = state.times.concat();
      let pricesReg = state.prices.concat();
      if (timesReg.length === 40) {
        timesReg.shift();
        pricesReg.shift();
      }
      timesReg.push(action.addTime);
      pricesReg.push(action.addLast);
      return {
        ...state,
        times: timesReg,
        prices: pricesReg,
        isLoading:false
      };
    case types.LIGHTNING_STORE_RESET:
      return initialState;
    default:
      return state;
  }
};
export default reducer;