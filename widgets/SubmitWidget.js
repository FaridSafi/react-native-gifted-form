var React = require('react');


var {View, Text} = require('react-native')
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
      activityIndicatorColor: 'black',
      requiredMessage: '{TITLE} is required',
      notValidMessage: '{TITLE} is not valid',
    };
  },

  propTypes: {
    onSubmit: React.PropTypes.func,
    preSubmit: React.PropTypes.func,
    isDisabled: React.PropTypes.bool,
    activityIndicatorColor: React.PropTypes.string,
    requiredMessage: React.PropTypes.string,
    notValidMessage: React.PropTypes.string,
  },

  getInitialState() {
    return {
      isLoading: false,
    };
  },

  clearValidationErrors() {
    this.props.form.setState({errors: []});
  },

  _postSubmit(errors = []) {
    errors = !Array.isArray(errors) ? [errors] : errors;

    this.setState({
      isLoading: false,
    });
    this.props.form.setState({errors});
  },

  _doSubmit() {
    this.props.preSubmit();

    this.clearValidationErrors()
    var validationResults = GiftedFormManager.validate(this.props.formName);
    var values = GiftedFormManager.getValues(this.props.formName);

    if (validationResults.isValid === true) {
      this.setState({
        isLoading: true,
      });
      this.props.onSubmit(true, values, validationResults, this._postSubmit, this.props.navigator);
    } else {
      var errors = GiftedFormManager.getValidationErrors(
        validationResults,
        this.props.notValidMessage,
        this.props.requiredMesage
      );
      this.props.form.setState({errors: errors});
      this.props.onSubmit(false, values, validationResults, this._postSubmit, this.props.navigator);
    }
  },

  render() {
    return (
      <View>
        <Button
          ref='submitButton'
          style={this.getStyle('submitButton')}
          textStyle={this.getStyle('textSubmitButton')}
          disabledStyle={this.getStyle('disabledSubmitButton')}

          isLoading={this.state.isLoading}
          isDisabled={this.props.isDisabled}
          activityIndicatorColor={this.props.activityIndicatorColor}

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
    disabledSubmitButton: {
      opacity: 0.5,
    },
    textSubmitButton: {
      color: 'white',
      fontSize: 15,
    },
  },

});
