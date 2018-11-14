import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { PLATFORM_DOMAIN } from '../../global/config';

export default class ImageVerification extends Component {
    static contextTypes = {
        form: PropTypes.object
    }
    render() {

        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* <InputField name='imageCode' type={'stringNumber'} valueColor={Colors.black} style={{ backgroundColor: 'transparent', borderWidth: 1, borderRadius: 5, borderColor: 'rgb(197, 197, 197)', justifyContent: 'center', margin: 8 }} /> */}
                <Image
                    style={{ flex: 1, height: undefined, width: undefined, margin: 8 }}
                    resizeMode={'contain'}
                    source={{ uri: this.props.url }}
                />
                <TextInput style={{ flex: 1, borderBottomColor: 'grey', borderBottomWidth: 1,marginBottom:10,fontSize:14,justifyContent:'center',alignItems:'center' }} onChangeText={this.props.textChange} />
            </View>
        );
    }
}
