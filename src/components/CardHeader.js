import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DEVICE_WIDTH } from '../global/config';
// class LogoutCard extends Component {
//   render() {
//     return (
//       <View>
//         <View>
//           <Icon name='user' size={24} color='#909090' />
//           <View><Text>请您先登陆</Text></View>
//         </View>
//         <View>
//           <Button title='111' />
//           <Button title='222' />
//         </View>
//       </View>
//     );
//   }
// }
// class LoginCard extends Component {
//   render() {
//     return (<View></View>);
//   }
// }
export default class CardHeader extends Component {
  render() {
    return (
      <View style={styles.container}><Text>card!</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: DEVICE_WIDTH,
    display: 'flex',
    backgroundColor:'red'
  }
});