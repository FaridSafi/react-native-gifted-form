var React = require('react-native');
var {
  View
} = React;

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  componentDidMount() {
    this._onChange(this.props.value);
  },
  
  getDefaultProps() {
    return {
      type: 'HiddenWidget',
    };
  },
  
  render() {
    return null;
  },

});
