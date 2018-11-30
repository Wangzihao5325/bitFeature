/*
    分時
    CombinedChart -> 1.CandlestickChart 2.BarChart 3. LineChart(MA)
*/
import React, { Component } from 'react';
import { View, processColor, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CombinedChart, BarChart } from 'react-native-charts-wrapper';

import { DEVICE_WIDTH } from '../../../../global/config';
import Loading from '../../../../components/Loading';
import ChartUtil from '../../../../global/util/ChartUtil';

let DOT_SIZE = 2
let MA = { five: 0, ten: 0, twenty: 0, thirty: 0 };

class KView extends Component {
  constructor(props) {
    super(props);
  }
  _renderLoading() {
    return (
      <View style={[styles.container, { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(14, 12, 12)' }]}>
        <Loading />
      </View>
    );
  }
  handleSelect(event) {
    // this.store.handleSelect(event.nativeEvent);
    console.log(event);
  }
  calculateMa(maNo, pricesArr) {
    const values = [];
    for (let i = 0; i < pricesArr.length; i++) {
      if (i < maNo) {
        values.push(null);
      } else {
        let sum = 0;
        for (let j = 0; j < maNo; j++) {
          sum += pricesArr[i - j].close;
        }
        values.push({ y: _.toNumber((sum / maNo).toFixed(DOT_SIZE)) });
      }
    }
    return values;
  }
  getMADataSets(values, label, color) {
    return {   // MA30
      values,
      label,

      config: {
        // 是否畫圖
        visible: true,
        lineWidth: 1,
        drawCubicIntensity: 0.4,
        // axisDependency: 'LEFT',
        // line color
        color: processColor(color),
        drawFilled: false,
        drawCircles: false,
        drawValues: false,
        drawHighlightIndicators: false
      }
    };
  }
  getCandleData() {
    MA.five = this.calculateMa(5, this.props.storePrice.slice());
    MA.ten = this.calculateMa(10, this.props.storePrice.slice());
    MA.twenty = this.calculateMa(20, this.props.storePrice.slice());
    MA.thirty = this.calculateMa(30, this.props.storePrice.slice());
    let dsArr = null;
    const dataNum = this.props.storePrice.length;
    if (dataNum > 30) {
      dsArr = [
        this.getMADataSets(MA.five, 'MA5', 'rgb(47, 126, 170)'),
        this.getMADataSets(MA.ten, 'MA10', 'rgb(170, 48, 170)'),
        this.getMADataSets(MA.twenty, 'MA20', 'rgb(170, 104, 48)'),
        this.getMADataSets(MA.thirty, 'MA30', 'rgb(169, 170, 48)')
      ];
    } else if (dataNum > 20) {
      dsArr = [
        this.getMADataSets(MA.five, 'MA5', 'rgb(47, 126, 170)'),
        this.getMADataSets(MA.ten, 'MA10', 'rgb(170, 48, 170)'),
        this.getMADataSets(MA.twenty, 'MA20', 'rgb(170, 104, 48)')
      ];
    } else if (dataNum > 10) {
      dsArr = [
        this.getMADataSets(MA.five, 'MA5', 'rgb(47, 126, 170)'),
        this.getMADataSets(MA.ten, 'MA10', 'rgb(170, 48, 170)')
      ];
    } else {
      dsArr = [
        this.getMADataSets(MA.five, 'MA5', 'rgb(47, 126, 170)')
      ];
    }
    return {
      candleData: {
        dataSets: [{
          values: this.props.storePrice.slice(),
          label: '',
          config: {
            // value setting 是否顯示該點表示的值
            drawValues: false,
            valueTextColor: processColor('white'),
            valueTextSize: 14,
            valueFormatter: ChartUtil.getValueFormatter(DOT_SIZE),

            shadowColor: processColor('black'),
            shadowWidth: 1,
            shadowColorSameAsCandle: true,
            increasingColor: processColor('rgb(235, 82, 83)'),//'rgb(235, 82, 83)'

            increasingPaintStyle: 'fill',
            decreasingColor: processColor('rgb(76, 166, 74)'),//'rgb(76, 166, 74)'
            drawHighlightIndicators: false,
          }

        }],
      },
      lineData: {
        dataSets: dsArr
      }
    };
  }
  getCandleXAxis() {
    let valueFormatter;
    if (this.props.klineType === 1440) {
      valueFormatter = this.props.storeDateLabels.slice();
    } else {
      valueFormatter = this.props.storetimeLabels.slice();
    }
    return {
      valueFormatter,
      granularityEnabled: true,
      granularity: 1,
      textColor: processColor('white'), // x軸的字樣

      enabled: false,
      position: 'BOTTOM',
      drawHighlightIndicators: false,
      drawGridLines: false,                   // 不畫格線
      drawAxisLine: false,                    // 不畫X Y 軸線

      axisMaximum: 45,
      visibleRange: { x: { min: 1 } }
    };
  }
  getCandleYAxis() {
    return {
      left: {
        enabled: false,
      },
      right: {
        valueFormatter: ChartUtil.getValueFormatter(DOT_SIZE),
        textColor: processColor('white'), // y軸的字樣
        position: 'INSIDE_CHART',              // y軸顯示在內側
        drawGridLines: false,
        drawAxisLine: false,
      }
    };
  }
  getBarData() {
    const volumnArr = this.props.storeVolumns.map((volumn) => {
      return { y: volumn };
    });
    // 因為getLastestLineDataSet，因此bar也要加入一樣的空值
    // ChartUtil.setNumOfLastestLine(volumnArr, 0);
    return {
      dataSets: [{
        // values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
        values: volumnArr,
        label: '',
        config: {
          color: processColor('rgb(235, 240, 105)'),
          drawValues: false,
          valueFormatter: ChartUtil.getValueFormatter(DOT_SIZE),
        }
      }]
    };
  }
  getBarXAxis() {
    let valueFormatter;
    if (this.props.klineType === 1440) {
      valueFormatter = this.props.storeDateLabels.slice();
    } else {
      valueFormatter = this.props.storetimeLabels.slice();
    }
    return {
      valueFormatter,
      granularityEnabled: true,
      granularity: 1,

      enabled: true,
      textColor: processColor('white'),
      position: 'TOP',

      drawGridLines: false,               // 不畫格線
      drawAxisLine: false,                // 不畫X Y 軸線
      axisMaximum: 45,
    };
  }
  getBarYAxis() {
    return {
      left: {
        enabled: false,
      },
      right: {
        valueFormatter: ChartUtil.getVolumnValueFormatter(),
        textColor: processColor('white'), // y軸的字樣
        position: 'INSIDE_CHART',              // y軸顯示在內側
        drawGridLines: false,
        drawAxisLine: false,
      }
    }
  }
  _renderContent() {
    return (
      <View style={styles.container}>
        <View style={styles.combinedChartContainer}>
          <CombinedChart
            style={styles.chart}
            data={this.getCandleData()}
            xAxis={this.getCandleXAxis()}
            yAxis={this.getCandleYAxis()}

            chartDescription={{ text: '' }}
            chartBackgroundColor={processColor('rgb(14, 12, 12)')}
            // decorator
            legend={{ enabled: false }}
            marker={{ enabled: false }}
            // grid - false後 之後的設定也沒用 留著做紀錄
            drawGridBackground={false}
            // borders - false後 之後的設定也沒用 留著做紀錄
            drawBorders={false}
            // borderColor={processColor(Colors.chartBorderColor)}
            // borderWidth={1}
            animation={{ durationX: 0 }}

            touchEnabled={false}
            dragEnabled={false}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}

            onSelect={this.handleSelect.bind(this)}
          />
        </View>
        <View style={styles.barChartContainer}>
          <BarChart
            style={styles.chart}
            data={this.getBarData()}
            xAxis={this.getBarXAxis()}
            yAxis={this.getBarYAxis()}
            chartDescription={{ text: '' }}
            chartBackgroundColor={processColor('rgb(14, 12, 12)')}
            // decorator
            legend={{ enabled: false }}
            marker={{ enabled: false }}
            // grid - false後 之後的設定也沒用 留著做紀錄
            drawGridBackground={false}
            // borders - false後 之後的設定也沒用 留著做紀錄
            drawBorders={false}
            borderColor={processColor('red')}
            borderWidth={1}

            animation={{ durationX: 0 }}
            touchEnabled={false}
            dragEnabled={false}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}

            onSelect={this.handleSelect.bind(this)}
          />
        </View>
      </View>
    );
  }
  render() {
    return this.props.isActive ? this._renderContent() : this._renderLoading();
    // return this._renderContent()
  }
}

function mapState2Props(store) {
  return {
    storePrice: store.KStore.prices,
    klineType: store.KStore.klineType,
    storeDateLabels: store.KStore.dateLabels,
    storetimeLabels: store.KStore.timeLabels,
    storeVolumns: store.KStore.volumns,
    storeTimes: store.KStore.times,
    isActive: store.KStore.isActive
  }
}

export default connect(mapState2Props)(KView);

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: DEVICE_WIDTH,
    position: 'relative' // for Marker
  },
  combinedChartContainer: {
    flex: 2
  },
  barChartContainer: {
    flex: 1
  },
  chart: {
    flex: 1
  }
});