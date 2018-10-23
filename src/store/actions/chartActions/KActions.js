import * as types from '../../actionType';
import { CHART_DATA_LIMITED } from '../../../global/config';
import _ from 'lodash';
import store from '../../../store/index';
import moment from 'moment';
let isReady = 0;
let total_Volumn = null;
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
// 消除range以下的數字，回傳是seconds
function getRangeTime(dateTimeString,kStoreSnap) {
  let range = ''
  switch (kStoreSnap.klineType) {
    case 'TIME_SHARING': range = 0;
      break;
    case 'KLINE_1MIN': range = 1;
      break;
    case 'KLINE_5MIN': range = 5;
      break;
    case 'KLINE_15MIN': range = 15;
      break;
    case 'KLINE_30MIN': range = 30;
      break;
    case 'KLINE_1DAY': range = 1440;
      break;
  }
  const milliseconds = moment(dateTimeString).valueOf();
  const onlySeconds = Math.round(milliseconds / 1000);
  // 先除以 (60 * range)
  const timeFractionRemoved = parseInt(onlySeconds / (60 * range));
  return timeFractionRemoved * 60 * range;
}
/*
    我決定把每一次的OnRtnQuote - TotalVolumn記錄下來 判斷和下一次的修改量 
    if 若在一分鐘內的變化 
            都放在最後的bar(volumn上) 
    else 
        超出一分鐘 就放在下一個bar
*/
function getVolumn(totalVolumn) {
  let newVolumn = 0;
  if (total_Volumn === null) {
    total_Volumn = totalVolumn;
    return newVolumn; //表示volumn無變化
  }
  newVolumn = totalVolumn - total_Volumn;
  total_Volumn = totalVolumn; //更新最新的totalVolumn
  return newVolumn;
}
export function action_addKStore(param) {
  let dotSize = 2;
  let kStoreSnap = store.getState().KStore;
  isReady++;
  if (isReady < 5 || kStoreSnap.klineType === 1440 || kStoreSnap.klineType === 720 || kStoreSnap.klineType === 240 || kStoreSnap.klineType === 120 || kStoreSnap.klineType === 60) {  //日k不需要更新
    return (dispatch) => {
      dispatch({
        type: types.K_STORE_DEFALUT,
      });
    }
  }
  const dataSent = param.data;
  const oldestDateTimeString = kStoreSnap.times[kStoreSnap.times.length - 1];
  const oldTime = Math.round(moment(oldestDateTimeString).valueOf() / 1000);
  const newTime = getRangeTime(dataSent[1],kStoreSnap);
  const lastPrice = _.toNumber(dataSent[3].toFixed(dotSize));
  if (oldTime === newTime) {
    const length = kStoreSnap.prices.length;
    let shadowH = kStoreSnap.prices[length - 1].shadowH;
    let shadowL = kStoreSnap.prices[length - 1].shadowL;
    const open = kStoreSnap.prices[length - 1].open;
    const close = lastPrice;
    if (lastPrice >= shadowH) {
      shadowH = lastPrice;
    }
    if (shadowL >= shadowH) {
      shadowL = lastPrice;
    }
    // kStoreSnap.prices[length - 1] = { shadowH, shadowL, open, close };
    // kStoreSnap.volumns[kStoreSnap.volumns.length - 1] += getVolumn(dataSent[6]);
    let addVolumns = getVolumn(dataSent[6]);
    return (dispatch) => {
      dispatch({
        type: types.K_STORE_SAME_TIME_UPDATE,
        newPrices: { shadowH, shadowL, open, close },
        addVolumns: addVolumns,
      });
    }
  } else {
    // 2017-09-01 10:30:00('YYYY-MM-DD HH:mm:ss') -> 不需要ss
    const dateTimeString = moment.unix(newTime).format('YYYY-MM-DD HH:mm');
    const dateTimeArr = dateTimeString.split(' ');
    // if (kStoreSnap.times.length === 40) {
    //   kStoreSnap.times.shift();
    //   kStoreSnap.dateLabels.shift();
    //   kStoreSnap.timeLabels.shift();
    //   kStoreSnap.prices.shift();
    //   kStoreSnap.volumns.shift();
    // }
    // kStoreSnap.times.push(dateTimeString);
    // kStoreSnap.dateLabels.push(dateTimeArr[0]);
    // kStoreSnap.timeLabels.push(dateTimeArr[1]);
    // kStoreSnap.prices.push({ shadowH: lastPrice, shadowL: lastPrice, open: lastPrice, close: lastPrice });
    // kStoreSnap.volumns.push(getVolumn(dataSent[6]));
    let addVolumns = getVolumn(dataSent[6]);
    return (dispatch) => {
      dispatch({
        type: types.K_STORE_DIFFERENT_TIME_UPDATE,
        addTimes: dateTimeString,
        addDateLabels: dateTimeArr[0],
        addTimeLabels: dateTimeArr[1],
        addPrices: { shadowH: lastPrice, shadowL: lastPrice, open: lastPrice, close: lastPrice },
        addVolumns: addVolumns,
      });
    }
  }
}