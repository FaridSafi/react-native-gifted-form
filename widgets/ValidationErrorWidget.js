var React = require('react');
var {
  View,
  Text
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],


  getDefaultProps() {
    return {
      type: 'ValidationErrorWidget',
      allowTextFontScaling: true,
    };
  },

  render() {
    return (
      <View>
        <View style={this.getStyle('validationErrorRow')}>
          <Text
            allowFontScaling={this.props.allowTextFontScaling}
            style={this.getStyle('validationError')}
            {...this.props}
          >
            {this.props.message}
          </Text>
        </View>
      </View>
    );
  },


  defaultStyles: {
    validationErrorRow: {
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    validationError: {
      fontSize: 12,
      color: '#ff001A',
    },
  },

});
