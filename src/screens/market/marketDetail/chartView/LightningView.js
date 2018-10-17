import React, { Component } from 'react';
import { View, processColor, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import ChartUtil from '../../../../global/util/ChartUtil';
import { connect } from 'react-redux';
import _ from 'lodash';
import { DEVICE_WIDTH } from '../../../../global/config';

let dotSize = 2;
class LightningView extends Component {

  getRealLineDataSet() {
    const valuesArr = this.props.storePrices.map((price) => {
      return { y: price };
    });
    return {
      values: valuesArr,
      label: '',

      config: {
        // 是否畫圖
        visible: true,
        lineWidth: 1,
        drawCubicIntensity: 0.4,
        drawHighlightIndicators: false,
        // line color
        color: processColor('rgb(112, 155, 227)'),
        // fill color
        drawFilled: true,
        fillColor: processColor('rgb(112, 155, 227)'),
        fillAlpha: 50,
        // circle settings
        drawCircles: false,
        // value setting 是否顯示該點表示的值
        drawValues: false,
        // axisDependency: 'LEFT'
        valueFormatter: ChartUtil.getValueFormatter(dotSize),

        // 測試
        // selectionShift: 13
      }
    };
  }

  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-an-array-remove-duplicates
  getCircleDataSets() {
    // 取出 獨特 值
    const uniqueValue = new Set(this.props.storePrices.slice());
    // 做一個全是null的array
    const nullArray = this.props.storePrices.map(() => {
      return null;
    });
    // 做一個1. 只有唯一值，2.剩下都補0
    const uniqueDataSets = [];
    // reverse是為了唯一值要是最新的位置
    this.props.storePrices.reverse().forEach((price, index) => {
      if (uniqueValue.has(price)) {
        uniqueDataSets.push(price);
        uniqueValue.delete(price);
      } else {
        uniqueDataSets.push(null);
      }
    });
    // 再reverse一次，為了取正確index
    uniqueDataSets.reverse();
    // 有幾個 獨特 值 就畫幾條線
    const result = [];
    uniqueDataSets.forEach((u, index) => {
      if (u !== null) {
        const na = nullArray.slice();
        na[index] = u;
        result.push({
          values: na,
          label: '',
          config: {
            // 是否畫圖
            visible: true,
            lineWidth: 0,
            color: processColor('rgb(112, 155, 227)'),
            drawFilled: false,
            // circle settings
            drawCircles: true,
            circleRadius: 5,
            circleColor: processColor('rgb(112, 155, 227)'),
            circleHoleColor: processColor('rgb(112, 155, 227)'),
            // value setting 是否顯示該點表示的值
            drawValues: true,
            valueTextColor: processColor('white'),
            valueTextSize: 14,
            valueFormatter: ChartUtil.getValueFormatter(dotSize),
            drawHighlightIndicators: false,
          }
        });
      }
    });
    return result;
  }

  lineData() {
    const dataSets = [this.getRealLineDataSet(), ...this.getCircleDataSets()];
    // 資料數量 >= 2，才要加入lastestline
    if (this.props.storePrices.length >= 2) {
      dataSets.push(ChartUtil.getLastestLineDataSet(this.props.storePrices));
    }
    return {
      dataSets
    };
  }

  getLastestTimeData(dataArrObservable) {
    const dataArr = dataArrObservable.slice();
    // 資料數量 >= 2，才要加入lastestline
    if (dataArr.length < 2) {
      return dataArr;
    }
    // get latest time
    const lastest = dataArr[dataArr.length - 1];
    // copy chartLastestLine latest time
    let chartLastestLine = 15;
    if (dataArr.length < chartLastestLine) {
      chartLastestLine = dataArr.length;
    }
    for (let i = 0; i < chartLastestLine; i++) {
      dataArr.push(lastest);
    }
    return dataArr;
  }

  getLineXAxis() {
    const dataArr = this.getLastestTimeData(this.props.storeTimes);

    return {
      valueFormatter: dataArr,
      position: 'BOTTOM',
      textColor: processColor('white'), // x軸的字樣
      // granularityEnabled: true,
      // granularity: 1
      // drawLabels: false,
      drawGridLines: false,
      drawAxisLine: true,
      // gridColor: 'red',
      // gridLineColor: 'purple',
      // gridLinesColor: 'brown',
      // axisLineColor: 'green',
      // axixColor: 'pink'
    };
  }

  getLineYAxis() {
    return {
      left: {
        enabled: false,
      },
      right: {
        valueFormatter: ChartUtil.getValueFormatter(dotSize),
        textColor: processColor('white'), // y軸的字樣
        position: 'INSIDE_CHART',              // y軸顯示在內側
        drawGridLines: false,
      }
    };
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <LineChart
            style={styles.chart}

            data={this.lineData()}
            xAxis={this.getLineXAxis()}
            yAxis={this.getLineYAxis()}

            chartDescription={{ text: '' }}
            chartBackgroundColor={processColor('rgb(14, 12, 12)')}
            // decorator
            legend={{ enabled: false }}
            marker={{ enabled: false, backgroundTint: processColor('teal'), markerColor: processColor('#F0C0FF8C'), textColor: processColor('white') }}
            // grid - false後 之後的設定也沒用 留著做紀錄
            drawGridBackground={false}
            // borders - false後 之後的設定也沒用 留著做紀錄
            drawBorders={false}
            borderColor={processColor('rgb(28, 25, 24)')}
            // borderWidth={1}

            animation={{ durationX: 0 }}

            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}
          />
        </View>
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    storePrices: store.LightningStore.prices,
    storeTimes: store.LightningStore.times
  }
}

export default connect(mapState2Props)(LightningView);

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: DEVICE_WIDTH,
    display: 'flex'
    // backgroundColor: Colors.bg
  },
  chart: {
    flex: 1
  }
});