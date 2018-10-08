import Toast from 'react-native-root-toast';

let {
  durations,
  positions
} = Toast;
const DURATIONS_KEYS = Object.keys(durations);
const POSITIONS_KEYS = Object.keys(positions);

const defaultOptions = {
  duration: durations[DURATIONS_KEYS[1]],
  position: positions[POSITIONS_KEYS[2]],
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  message: 'Default Toast Message',
  backgroundColor: false,
  shadowColor: false,
  textColor: false
};

export default class ToastRoot extends Toast {
  toast = null;

  static show(msg, options) {
    options || (options = {});
    this.toast && this.toast.destroy();
    this.toast = Toast.show(msg, {
      duration: options.duration ? options.duration : defaultOptions.duration,
      position: options.position ? options.position : defaultOptions.position,
      shadow: defaultOptions.shadow,
      animation: defaultOptions.animation,
      hideOnPress: defaultOptions.hideOnPress,
      delay: defaultOptions.delay,
      backgroundColor: defaultOptions.backgroundColor ? 'blue' : null,
      shadowColor: defaultOptions.shadowColor ? 'yellow' : null,
      textColor: defaultOptions.textColor ? 'purple' : null,
      onHidden: () => {
        this.toast.destroy();
        this.toast = null;
      }
    });
  }
}