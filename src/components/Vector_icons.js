import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ICON_SIZE, TAB_NAVI_ACTIVE_TINT_COLOR , TAB_NAVI_DEFAULT_TINT_COLOR } from '../global/config';

const iconMake = (name)=>{
  return ({focused, tintColor})=>{return (<Icon name={name} size={ICON_SIZE} color={focused ? TAB_NAVI_ACTIVE_TINT_COLOR : TAB_NAVI_DEFAULT_TINT_COLOR} />);}
}

export {
  iconMake
}