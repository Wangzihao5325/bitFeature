/*
    分時
    CombinedChart -> 1.CandlestickChart 2.BarChart 3. LineChart(MA)
*/
import React, { Component } from 'react';
import { View, processColor, StyleSheet } from 'react-native';
import { CombinedChart, BarChart } from 'react-native-charts-wrapper';
import { DEVICE_WIDTH } from '../../../../global/config';
import Loading from '../../../../components/Loading';
export default class KView extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.KStore;
  }
  _renderLoading() {
    return (
      <Loading />
    );
  }
  handleSelect(event) {
    this.store.handleSelect(event.nativeEvent);
  }
  _renderContent() {
    return (
      <View style={styles.container}>
        <View style={styles.combinedChartContainer}>
          <CombinedChart
            style={styles.chart}
            data={this.store.candleData}
            xAxis={this.store.candleXAxis}
            yAxis={this.store.candleYAxis}

            chartDescription={{ text: '' }}
            chartBackgroundColor={processColor('rgb(14, 12, 12)')}
            // decorator
            legend={false}
            marker={false}
            // grid - false後 之後的設定也沒用 留著做紀錄
            drawGridBackground={false}
            // borders - false後 之後的設定也沒用 留著做紀錄
            drawBorders={false}
            // borderColor={processColor(Colors.chartBorderColor)}
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

            onSelect={this.handleSelect.bind(this)}
          />
        </View>
        <View style={styles.barChartContainer}>
          <BarChart
            style={styles.chart}
            data={this.store.barData}
            xAxis={this.store.barXAxis}
            yAxis={this.store.barYAxis}
            chartDescription={{ text: '' }}
            chartBackgroundColor={processColor('rgb(14, 12, 12)')}
            // decorator
            legend={false}
            marker={false}
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
    return this.store.isLoading ? this._renderLoading() : this._renderContent();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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