var React = require('react');
var {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');
var TimerMixin = require('react-timer-mixin');


module.exports = React.createClass({
  mixins: [TimerMixin, WidgetMixin],
  
  getDefaultProps() {
    return {
      type: 'RowValueWidget',
      onPress: () => {},
      disclosure: true,
    };
  },
  
  render() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <TouchableHighlight
          onPress={() => {
            this.requestAnimationFrame(() => {
              this.props.onPress();
            });
          }}
          underlayColor={this.getStyle('underlayColor').pop()}
          {...this.props} // mainly for underlayColor
        >
          <View style={this.getStyle('row')}>
            {this._renderImage()}
            <Text numberOfLines={1} style={this.getStyle('title')}>{this.props.title}</Text>
            <View style={this.getStyle('alignRight')}>
              <Text numberOfLines={1} style={this.getStyle('value')}>{this.state.value}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  
  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    underlayColor: '#c7c7cc',
    disclosure: {
      transform: [{rotate: '-90deg'}],
      marginLeft: 10,
      marginRight: 10,
      width: 11,
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
    value: {
      fontSize: 15,
      color: '#c7c7cc',
      paddingRight: 10,
    },
  },
});
