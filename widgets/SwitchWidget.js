var React = require('react');
var {
  View,
  Text,
  Switch,
  Platform,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');

var GiftedSwitch = React.createClass({
  _getSwitch() {
    return (
      <Switch
        {...this.props}
      />
    );
  },
  render() {
    return (
      <View>
        {this._getSwitch()}
      </View>
    );
  },
});



module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SwitchWidget',
    };
  },

  render() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <View style={this.getStyle('row')}>
          {this._renderImage()}

          <Text numberOfLines={1} style={this.getStyle('switchTitle')}>{this.props.title}</Text>
          <View style={this.getStyle('switchAlignRight')}>
            <GiftedSwitch
              style={this.getStyle('switch')}
              {...this.props}

              onValueChange={(value) => {
                this._onChange(value);
                this.props.onChange && this.props.onChange(value);
              }}
              value={this.state.value}
            />
          </View>
        </View>
        {this._renderValidationError()}
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
    switchTitle: {
      fontSize: 15,
      color: '#000',
      flex: 1,
      paddingLeft: 10,
    },
    switchAlignRight: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: 10,
    },
    switch: {
    },
  },
});
