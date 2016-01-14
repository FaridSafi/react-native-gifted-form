var React = require('react-native');
var {
  View,
  Text,
  TouchableHighlight
} = React;

var WidgetMixin = require('../mixins/WidgetMixin');

module.exports = React.createClass({
  mixins: [WidgetMixin],
    
  getDefaultProps() {
    return {
      onSelect: () => {},
      touchEnabled: true,
      type: 'CellWidget',
    };
  },

  render() {
    if (this.props.touchEnabled === true) {
      if (this.state.value === true) {
        return (
          <TouchableHighlight
            onPress={() => { this.props.onSelect(this.props.value) }}
            underlayColor={this.getStyle('underlayColor').pop()}
            style={this.getStyle(['cellSelect', 'cellSelected'])}
            {...this.props}
          >
            <View>
              <Text>
                {this.props.title}
              </Text>
            </View>
          </TouchableHighlight>
              
        );
      }
      return (
        <TouchableHighlight
          onPress={() => { this.props.onSelect(this.props.value) }}
          underlayColor={this.getStyle('underlayColor').pop()}
          style={this.getStyle('cellSelect')}
          {...this.props}
        >
          <View>
            <Text>
              {this.props.title}
            </Text>
          </View>
          </TouchableHighlight>
      );
    }
    return (
      <View style={this.getStyle('cellSelect')}>
        <Text>
          {this.props.title}
        </Text>
      </View>
    );
  },
  
  defaultStyles: {
    cellSelect: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
    },
    cellSelected: {
      backgroundColor: '#eee',
    },
    underlayColor: '#eee',
  },
});
