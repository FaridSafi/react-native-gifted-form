import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  Text,
} from 'react-native';


const WidgetMixin = require('../mixins/WidgetMixin.js');

module.exports = createReactClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
      return {
          type: 'ErrorsWidget',
      }
  },

  render() {
    var errors = this.props.form.state.errors;
    if (errors.length > 0) {
      return (
        <View
          style={this.getStyle('errorContainer')}
        >
          <Text
            style={this.getStyle('errorText')}
          >
            {errors.join('\n')}
          </Text>
        </View>
      );
    }
    return <View style={this.getStyle('errorEmptyContainer')} />;
  },

  defaultStyles: {
    errorContainer: {
      padding: 10,
    },
    errorText: {
      color: '#ff0000',
    },
    errorEmptyContainer: {

    },
  },

});
