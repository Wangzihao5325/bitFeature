/**
 *  持倉
 */
import _ from 'lodash';
import { contractMap2Config } from '../global/commodity_list';
export default class HoldPosition {

  constructor(contractCode, direction, holdNum, holdAvgPrice) {
    this.contractCode = contractCode;
    this.direction = direction;
    this.holdNum = holdNum;
    this.holdAvgPrice = holdAvgPrice;
  }

  update(direction, holdNum, holdAvgPrice) {
    this.direction = direction;
    this.holdNum = holdNum;
    this.holdAvgPrice = holdAvgPrice;
  }

  floatProfit(lastPrice) {
    let contractSize = contractMap2Config[this.contractCode].contractSize;
    let miniTikeSize = contractMap2Config[this.contractCode].miniTickerSize;
    let currencyNo = contractMap2Config[this.contractCode].currencyNo;
    return this.getFloatProfit(lastPrice, this.holdAvgPrice, contractSize, miniTikeSize, this.holdNum, this.direction, currencyNo);
  }

  getFloatProfit(lastPrice, holdAvgPrice, contractSize, miniTikeSize, holdNum, direction, currencyNo) {
    let price = 0;
    if (direction.value === 0) {
      price = lastPrice - holdAvgPrice;
    } else {
      price = holdAvgPrice - lastPrice;
    }
    const value = price * contractSize * (holdNum / miniTikeSize);
    return {
      value,
      color: this.getColorText(value),
      text: `${value.toFixed(2)}:${currencyNo}`
    };
  }

  getColorText(value) {
    let color = 'rgb(132, 143, 161)';
    if (value < 0) {
      color = 'rgb(89, 165, 87)';
    } else if (value > 0) {
      color = 'rgb(216, 92, 97)';
    }
    return color;
  }
}
