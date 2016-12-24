/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text
} from 'react-native';

//var app = require('./app');

export default class DummyUpdate extends Component {
  render() {
    return (
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
        <Text>
          GiftedFormExample does not work at this revision. This is an intermediate checkin. Please update to next revision
        </Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('GiftedFormExample', () => DummyUpdate);
