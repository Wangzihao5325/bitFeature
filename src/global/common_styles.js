import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  absoluateCenterStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerAbsCenterStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLineCenterStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});


export default {
  ...styles
};