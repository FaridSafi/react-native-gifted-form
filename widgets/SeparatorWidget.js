import React from 'react';
import createReactClass from 'create-react-class';
import {
  View
} from 'react-native';

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],
  
  getDefaultProps() {
    return {
      type: 'SeparatorWidget',
    };
  },
  
  render() {
    return (
      <View
        style={this.getStyle('separator')}
        {...this.props}
      />
    );
  },
  
  defaultStyles: {
    separator: {
      height: 10,
    },
  },

});
