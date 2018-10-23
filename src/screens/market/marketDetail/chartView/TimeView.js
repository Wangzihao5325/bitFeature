/*
    分時
    1.LineChart
    2.BarChart
*/
import React, { Component } from 'react';
import { View, processColor, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Color from 'color';
import { LineChart, BarChart } from 'react-native-charts-wrapper';
import Loading from '../../../../components/Loading';
import ChartUtil from '../../../../global/util/ChartUtil';
import { DEVICE_WIDTH } from '../../../../global/config';
let dotSize = 2;
class TimeView extends Component {
  constructor() {
    super();
    // this.startShining();
  }
  // startShining() {
  //   setInterval(() => {
  //     this.isShining = !this.isShining;
  //   }, 1000);
  // }
  handleSelect(event) {
    // this.store.handleSelect(event.nativeEvent);
  }
  _renderLoading() {
    return (
      <View style={[styles.container, {display:'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(14, 12, 12)' }]}>
        <Loading />
      </View>
    );
  }
  getRealLineDataSet() {
    const lineArr = this.props.storePrice.map((price) => {
      return { y: price };
    });
    return {
      values: lineArr,
      label: '',
      config: {
        // 是否畫圖
        visible: true,
        lineWidth: 1,
        drawCubicIntensity: 0.4,
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
        // valueTextColor: processColor('white'),
        // valueTextSize: 14,
        drawHighlightIndicators: false,
      }
    };
  }
  getCircleLatestDataSet() {
    // 我只要取最新一點畫圓
    const lastIndex = this.props.storePrice.length - 1;
    let latestPrice = 0;
    const circleArr = this.props.storePrice.map((price, index) => {
      if (index === lastIndex) {
        latestPrice = price;
        return { y: latestPrice };
      }
      return null;
    });
    // 2. 最新的一點，和前一點做比較
    const lastSecondPrice = this.props.storePrice[this.props.storePrice.length - 2];
    let latestCircleColor = 'rgb(112, 155, 227)';
    // 最新價 > 上一點的價錢，圆点以红色闪动
    if (latestPrice > lastSecondPrice) {
      latestCircleColor = Color('rgb(236, 82, 82)');
    } else {
      // 最新價 > 上一點的價錢，圆点以绿色闪动
      latestCircleColor = Color('rgb(75, 166, 74)');
    }
    return {
      values: circleArr,
      label: '',
      config: {
        // 是否畫圖
        visible: true,
        // line color
        color: processColor(latestCircleColor),
        // fill color
        drawFilled: false,
        // circle settings
        drawCircles: true,
        circleRadius: this.isShining ? 10 : 5,
        circleColor: processColor(this.isShining ? latestCircleColor.lighten(1).alpha(0.3) : latestCircleColor.string()),
        circleHoleColor: processColor(latestCircleColor.string()),
        // value setting 是否顯示該點表示的值
        drawValues: true,
        valueTextColor: processColor('white'),
        valueTextSize: 14,
        valueFormatter: ChartUtil.getValueFormatter(dotSize),
        drawHighlightIndicators: false
      }
    };
  }
  lineData() {
    return {
      dataSets: [this.getRealLineDataSet(), this.getCircleLatestDataSet(), ChartUtil.getLastestLineDataSet(this.props.storePrice)]
    };
  }
  lineXAxis() {
    return {
      valueFormatter: this.props.storetimeLabels.slice(),
      granularityEnabled: true,
      granularity: 1,
      textColor: processColor('white'), // x軸的字樣

      enabled: false,
      position: 'BOTTOM',
      drawHighlightIndicators: false,
      drawGridLines: false,                   // 不畫格線
      drawAxisLine: false,                    // 不畫X Y 軸線
    };
  }
  lineYAxis() {
    return {
      left: {
        enabled: false,
      },
      right: {
        valueFormatter: ChartUtil.getValueFormatter(dotSize),
        textColor: processColor('white'), // y軸的字樣
        position: 'INSIDE_CHART',              // y軸顯示在內側
        drawGridLines: false,
        drawAxisLine: false,
      }
    };
  }
  barData() {
    const valuesArr = this.props.storeVolumns.map((volumn) => {
      return { y: volumn };
    });
    // 因為getLastestLineDataSet，因此bar也要加入一樣的空值
    ChartUtil.setNumOfLastestLine(valuesArr, 0);
    return {
      dataSets: [
        {
          values: valuesArr,
          label: '',
          config: {
            color: processColor('rgb(235, 240, 105)'),
            drawValues: false,
            valueFormatter: ChartUtil.getValueFormatter(dotSize)
          }
        }
      ]
    };
  }
  barXAxis() {
    return {
      valueFormatter: this.props.storetimeLabels.slice(),
      granularityEnabled: true,
      granularity: 1,

      enabled: true,
      textColor: processColor('white'),
      position: 'TOP',

      drawGridLines: false,               // 不畫格線
      drawAxisLine: false,                // 不畫X Y 軸線
    };
  }
  barYAxis() {
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
        <View style={styles.lineChartContainer}>
          <LineChart
            style={styles.chart}

            data={this.lineData()}
            xAxis={this.lineXAxis()}
            yAxis={this.lineYAxis()}

            chartDescription={{ text: '' }}
            chartBackgroundColor={processColor('rgb(14, 12, 12)')}
            // decorator
            legend={{ enabled: false }}
            marker={{ enabled: false }}
            // grid - false後 之後的設定也沒用 留著做紀錄
            drawGridBackground={false}
            // borders - false後 之後的設定也沒用 留著做紀錄
            drawBorders={false}
            borderColor={processColor('teal')}
            borderWidth={1}

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

            onSelect={this.handleSelect.bind(this)}
          />
        </View>
        <View style={styles.barChartContainer}>
          <BarChart
            style={styles.chart}
            data={this.barData()}
            xAxis={this.barXAxis()}
            yAxis={this.barYAxis()}
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

            onSelect={this.handleSelect.bind(this)}
          />
        </View>
      </View>
    );
  }
  render() {
    // return this._renderContent();
    return this.props.isActive ? this._renderContent() : this._renderLoading();
  }
}

function mapState2Props(store) {
  return {
    storePrice: store.TimeStore.prices,
    storetimeLabels: store.TimeStore.timeLabels,
    storeVolumns: store.TimeStore.volumns,
    storeTimes: store.TimeStore.times,
    isActive: store.TimeStore.isActive
  }
}

export default connect(mapState2Props)(TimeView);

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: DEVICE_WIDTH,
    position: 'relative', // for Marker
    display: 'flex'
  },
  lineChartContainer: {
    flex: 2
  },
  barChartContainer: {
    flex: 1
  },
  chart: {
    flex: 1
  }
});
