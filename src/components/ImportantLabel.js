import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GRAY = '#555768';
const YELLOW = '#FED330';
const RED = '#FC3759';
export default class ImportantLabel extends Component {
  state = {
    color1: YELLOW,
    color2: GRAY,
    color3: GRAY
  }
  componentDidMount() {
    let important = parseInt(this.props.important);
    if (important === 2) {
      this.setState({
        color2: YELLOW
      });
    } else if (important === 3) {
      this.setState({
        color1: RED,
        color2: RED,
        color3: RED
      });
    }
  }
  render() {

    return (
      <View style={{ height: 24, width: 60, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Icon name={'star'} size={16} color={this.state.color1} />
        <Icon name={'star'} size={16} color={this.state.color2} />
        <Icon name={'star'} size={16} color={this.state.color3} />
      </View>
    );
  }
}