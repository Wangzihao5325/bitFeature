import * as types from '../../actionType';
import { processColor } from 'react-native';

const initialState = {
  times: [],
  dateLabels: [],
  timeLabels: [],
  prices: [],
  volumns: [],
  isLoading: true,
  klineType: 5,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.K_STORE_START:
      return {
        ...state,
        times: action.times,
        dateLabels: action.dateLabels,
        timeLabels: action.timeLabels,
        prices: action.prices,
        volumns: action.volumns,
        isLoading: action.isLoading,
        klineType: action.klineType,
      };
    default: return state;
  }
};
export default reducer;