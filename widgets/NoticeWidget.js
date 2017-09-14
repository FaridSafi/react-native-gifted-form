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
      type: 'NoticeWidget',
      allowTextFontScaling: true,
    };
  },

  render() {
    return (
      <View>
        <View style={this.getStyle('noticeRow')}>
          <Text
            allowFontScaling={this.props.allowTextFontScaling}
            style={this.getStyle('noticeTitle')}
            {...this.props}
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  },

  defaultStyles: {
    noticeRow: {
      paddingBottom: 10,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    noticeTitle: {
      fontSize: 13,
      color: '#9b9b9b',
    },
  },
});
