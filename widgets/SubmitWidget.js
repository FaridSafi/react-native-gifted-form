var React = require('react-native');


var {View, Text} = React;
var WidgetMixin = require('../mixins/WidgetMixin.js');


import Button from 'apsl-react-native-button';

var GiftedFormManager = require('../GiftedFormManager');


// @todo to test with validations
module.exports = React.createClass({
  mixins: [WidgetMixin],
  
  getDefaultProps() {
    return {
      type: 'SubmitWidget',
      onSubmit: () => {},
      preSubmit: () => {},
      isDisabled: false,
    };
  },
  
  propTypes: {
    onSubmit: React.PropTypes.func,
    preSubmit: React.PropTypes.func,
    isDisabled: React.PropTypes.bool,
  },
  
  getInitialState() {
    return {
      isLoading: false,
      errors: '',
    };
  },
  
  onValidationError(validated) {
    var errors = [];
    if (validated.isValid === false) {
      for (var k in validated.results) {
        if (validated.results.hasOwnProperty(k)) {
          for (var j in validated.results[k]) {
            if (validated.results[k].hasOwnProperty(j)) {
              if (validated.results[k][j].isValid === false) {
                if (!validated.results[k][j].value) {
                  errors.push(validated.results[k][j].title+' is required');
                } else {
                  errors.push(validated.results[k][j].message || validated.results[k][j].title+' is not valid');
                }
                // displaying only 1 error per widget
                break;
              }
            }
          }
        }
      }
    }
    
    this.setState({
      errors: errors.join('\n'),
    });
  },
  
  _postSubmit(errors = []) {
    errors = !Array.isArray(errors) ? [errors] : errors;
    
    this.setState({
      isLoading: false,
      errors: errors.join('\n'),
    });
  },
  
  _doSubmit() {
    this.props.preSubmit();
    
    this.setState({
      errors: '',
    });
    
    var validationResults = GiftedFormManager.validate(this.props.formName);
    var values = GiftedFormManager.getValues(this.props.formName);
    
    if (validationResults.isValid === true) {
      this.setState({
        isLoading: true,
      });
      this.props.onSubmit(true, values, validationResults, this._postSubmit, this.props.navigator);
    } else {
      this.onValidationError(validationResults);
      this.props.onSubmit(false, values, validationResults, this._postSubmit, this.props.navigator);
    }
  },
  
  renderErrors() {
    if (this.state.errors.length > 0) {
      return (
        <View
          style={this.getStyle('errorContainer')}
        >
          <Text
            style={this.getStyle('errorText')}
          >
            {this.state.errors}
          </Text>
        </View>
      );      
    }
    return null;
  },
  
  render() {
    return (
      <View>
        {this.renderErrors()}
        <Button
          ref='submitButton'
          style={this.getStyle('submitButton')}
          textStyle={this.getStyle('textSubmitButton')}
      
          isLoading={this.state.isLoading}
          isDisabled={this.props.isDisabled}
      
          {...this.props}
      
          onPress={() => this._doSubmit()}
        >
          {this.props.title}
        </Button>
      </View>
    );
  },
  
  defaultStyles: {
    submitButton: {
      margin: 10,
      backgroundColor: '#3498db',
      borderWidth: 0,
      borderRadius: 0,
      height: 40,
    },
    textSubmitButton: {
      color: 'white',
      fontSize: 15,
    },
    errorContainer: {
      padding: 10,
    },
    errorText: {
      color: '#ff0000',
    },
  },
  
});