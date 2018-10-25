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
  isActive: false
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
        isActive: true
      };
    case types.K_STORE_SAME_TIME_UPDATE:
      {
        let pricesReg = state.prices.concat();
        let volumnsReg = state.volumns.concat();
        pricesReg[pricesReg.length - 1] = action.newPrices;
        volumnsReg[volumnsReg.length - 1] += action.addVolumns;
        return {
          ...state,
          prices: pricesReg,
          volumns: volumnsReg,
        };
      }
    case types.K_STORE_DIFFERENT_TIME_UPDATE:
      {
        let timesReg = state.times.concat();
        let dateLabelsReg = state.dateLabels.concat();
        let timeLabelsReg = state.timeLabels.concat();
        let pricesReg = state.prices.concat();
        let volumnsReg = state.volumns.concat();
        if (state.times.length === 40) {
          timesReg.shift();
          dateLabelsReg.shift();
          timeLabelsReg.shift();
          pricesReg.shift();
          volumnsReg.shift();
        }
        timesReg.push(action.addTimes);
        dateLabelsReg.push(action.addDateLabels);
        timeLabelsReg.push(action.addTimeLabels);
        pricesReg.push(action.addPrices);
        volumnsReg.push(action.addVolumns);
        return {
          ...state,
          times: timesReg,
          dateLabels: dateLabelsReg,
          timeLabels: timeLabelsReg,
          prices: pricesReg,
          volumns: volumnsReg,
        };
      }
    case types.K_STORE_RESET:
      return {
        ...state,
        isActive: false
      };
    case types.K_STORE_CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
export default reducer;