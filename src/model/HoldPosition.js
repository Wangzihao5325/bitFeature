/**
 *  持倉
 */
import _ from 'lodash';

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

  // floatProfit() {
  //   return this.getFloatProfit(this.product.lastPrice, this.holdAvgPrice, this.product.contractSize, this.product.miniTikeSize, this.holdNum, this.direction, this.currencyNo);
  // }

  // getFloatProfit(lastPrice, holdAvgPrice, contractSize, miniTikeSize, holdNum, direction, currencyNo) {
  //   let price = 0;
  //   if (direction.value === 0) {
  //     price = lastPrice - holdAvgPrice;
  //   } else {
  //     price = holdAvgPrice - lastPrice;
  //   }
  //   const value = price * contractSize * (holdNum / miniTikeSize);
  //   return {
  //     value,
  //     color: Colors.getColorText(value),
  //     text: `${value.toFixed(2)}:${currencyNo}`
  //   };
  // }
}
