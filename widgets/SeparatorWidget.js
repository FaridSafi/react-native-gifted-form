var React = require('react-native');
var {
  View
} = React;

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
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
