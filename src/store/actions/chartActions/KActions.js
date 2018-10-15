import * as types from '../../actionType';
import { CHART_DATA_LIMITED } from '../../../global/config';
import _ from 'lodash';
export function action_startKStore(data) {
  const dataSent = data.Lines;
  const kLineType = data.period;

  let times = [];
  let dateLabels = [];
  let timeLabels = [];
  let prices = [];
  let volumns = [];

  let startIndex = 0;
  let dotSize = 2;
  if (dataSent.length >= CHART_DATA_LIMITED) {
    startIndex = dataSent.length - CHART_DATA_LIMITED;
  }
  let j = 0;
  for (let i = startIndex; i < dataSent.length; i++) {
    const dateTimeString = dataSent[i][0];
    times[j] = dateTimeString; // 2017-09-01 10:30:00 
    const dateTimeArr = dateTimeString.split(' ');
    dateLabels[j] = dateTimeArr[0];   // 2017-09-01
    const timeString = dateTimeArr[1]; // 10:30:00 
    const timeArr = timeString.split(':');
    timeLabels[j] = `${timeArr[0]}:${timeArr[1]}`; // 10:30  
    prices[j] = {
      shadowH: _.toNumber((dataSent[i][3]).toFixed(dotSize)),
      shadowL: _.toNumber((dataSent[i][4]).toFixed(dotSize)),
      open: _.toNumber((dataSent[i][1]).toFixed(dotSize)),
      close: _.toNumber((dataSent[i][2]).toFixed(dotSize))
    };
    volumns[j] = _.toNumber((dataSent[i][5]).toFixed(dotSize));
    j++;
  }
  let isLoading = false;
  return (dispatch) => {
    dispatch({
      type: types.K_STORE_START,
      times: times,
      dateLabels: dateLabels,
      timeLabels: timeLabels,
      prices: prices,
      volumns: volumns,
      isLoading: isLoading,
      klineType: kLineType
    });
  }
}