import React from 'react';

const GiftedFormManager = require('./GiftedFormManager');

const ContainerMixin = require('./mixins/ContainerMixin');
const WidgetMixin = require('./mixins/WidgetMixin');

const TextInputWidget = require('./widgets/TextInputWidget');
const TextAreaWidget = require('./widgets/TextAreaWidget');
const SwitchWidget = require('./widgets/SwitchWidget');
const SelectWidget = require('./widgets/SelectWidget');
const OptionWidget = require('./widgets/OptionWidget');
const SelectCountryWidget = require('./widgets/SelectCountryWidget');
const DatePickerIOSWidget = require('./widgets/DatePickerIOSWidget');
const ModalWidget = require('./widgets/ModalWidget');
const SubmitWidget = require('./widgets/SubmitWidget');
const SeparatorWidget = require('./widgets/SeparatorWidget');
const GroupWidget = require('./widgets/GroupWidget');
const NoticeWidget = require('./widgets/NoticeWidget');
const ValidationErrorWidget = require('./widgets/ValidationErrorWidget');
const GooglePlacesWidget = require('./widgets/GooglePlacesWidget');
const RowWidget = require('./widgets/RowWidget');
const RowValueWidget = require('./widgets/RowValueWidget');
const LoadingWidget = require('./widgets/LoadingWidget');
const HiddenWidget = require('./widgets/HiddenWidget');
const ErrorsWidget = require('./widgets/ErrorsWidget');

const GiftedForm = React.createClass({
  mixins: [ ContainerMixin ],

  statics: {
    TextInputWidget,
    TextAreaWidget,
    SwitchWidget,
    SelectWidget,
    OptionWidget,
    SelectCountryWidget,
    DatePickerIOSWidget,
    ModalWidget,
    SubmitWidget,
    SeparatorWidget,
    GroupWidget,
    NoticeWidget,
    GooglePlacesWidget,
    RowWidget,
    RowValueWidget,
    LoadingWidget,
    HiddenWidget,
    ValidationErrorWidget,
    ErrorsWidget,
  },

  getDefaultProps() {
    return {
      isModal: false,
      clearOnClose: false,

      validators: {},
      defaults: {},
      openModal: null,
    };
  },

  propTypes: {
    isModal: React.PropTypes.bool,
    clearOnClose: React.PropTypes.bool,
    validators: React.PropTypes.object,
    defaults: React.PropTypes.object,
    openModal: React.PropTypes.func,
  },

  componentWillUnmount() {
    if (this.props.clearOnClose === true) {
      GiftedFormManager.reset(this.props.formName);
    }
  },

  componentWillMount() {
    // register validators
    for (let key in this.props.validators) {
      if (this.props.validators.hasOwnProperty(key)) {
        GiftedFormManager.setValidators(this.props.formName, key, this.props.validators[key]);
      }
    }

    // register defaults values
    for (let key in this.props.defaults) {
      if (this.props.defaults.hasOwnProperty(key)) {
        GiftedFormManager.updateValueIfNotSet(this.props.formName, key, this.props.defaults[key]);
      }
    }
  },

  render() {
    return this._renderContainerView();
  },
});

var GiftedFormModal = React.createClass({
  mixins: [ ContainerMixin ],

  getDefaultProps() {
    return {
      isModal: true,
    };
  },

  propTypes: {
    isModal: React.PropTypes.bool,
  },

  render() {
    return this._renderContainerView();
  },
});

module.exports = {
  GiftedForm, GiftedFormModal, GiftedFormManager,
  WidgetMixin,
};
