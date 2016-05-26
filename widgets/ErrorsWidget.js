import React from 'react';
import {
  View,
  Text,
} from 'react-native';


const WidgetMixin = require('../mixins/WidgetMixin.js');

module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      errors: [],
    };
  },

  propTypes: {
    errors: React.PropTypes.array,
  },

  render() {
    if (this.props.errors.length > 0) {
      return (
        <View
          style={this.getStyle('errorContainer')}
        >
          <Text
            style={this.getStyle('errorText')}
          >
            {this.props.errors.join('\n')}
          </Text>
        </View>
      );
    }
    return null;
  },

  defaultStyles: {
    errorContainer: {
      padding: 10,
    },
    errorText: {
      color: '#ff0000',
    },
  },

});
