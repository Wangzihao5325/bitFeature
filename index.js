/** @format */

import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './src/json_config/app.json';

AppRegistry.registerComponent(appName, () => App);