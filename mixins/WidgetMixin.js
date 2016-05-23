var React = require('react');
var {
  Image
} = require('react-native')


var GiftedFormManager = require('../GiftedFormManager');

module.exports = {

  getInitialState() {
    return {
      validationErrorMessage: null,
    };
  },

  propTypes: {
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    formName: React.PropTypes.string,
    // image: ,
    widgetStyles: React.PropTypes.object,
    formStyles: React.PropTypes.object,
    validationImage: React.PropTypes.bool,
    openModal: React.PropTypes.func,
    // navigator: ,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    validateOnEmpty: React.PropTypes.bool,
    // If we want to store the state elsewhere (Redux store, for instance), we can use value and Form's onValueChange prop
    value: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      name: '',
      title: '',
      formName: '',
      image: null,
      widgetStyles: {},
      formStyles: {},
      validationImage: true,
      openModal: null,
      navigator: null,
      onFocus: () => {},
      onBlur: () => {},
      validateOnEmpty: false,
    };
  },

  componentDidMount() {
    // get value from prop
    if (typeof this.props.value !== 'undefined') {
      this._setValue(this.props.value);
      return;
    }
    // get value from store
    var formState = GiftedFormManager.stores[this.props.formName];
    if (typeof formState !== 'undefined') {
      if (typeof formState.values[this.props.name] !== 'undefined') {
        this.setState({
          value: formState.values[this.props.name],
        });
        this._validate(formState.values[this.props.name]);
      }
    }
  },

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
      this._onChange(nextProps.value);
    }
  },

  // get the styles by priority
  // defaultStyles < formStyles < widgetStyles
  getStyle(styleNames = []) {
    if (typeof styleNames === 'string') {
      styleNames = [styleNames];
    }

    if (typeof this.defaultStyles === 'undefined') {
      this.defaultStyles = {};
    }

    var styles = [];

    for (let i = 0; i < styleNames.length; i++) {
      if (typeof this.defaultStyles[styleNames[i]] !== 'undefined') {
        styles.push(this.defaultStyles[styleNames[i]]);
      }
    }

    for (let i = 0; i < styleNames.length; i++) {
      if (typeof this.props.formStyles[this.props.type] !== 'undefined') {
        if (typeof this.props.formStyles[this.props.type][styleNames[i]] !== 'undefined') {
          styles.push(this.props.formStyles[this.props.type][styleNames[i]]);
        }
      }
    }

    for (let i = 0; i < styleNames.length; i++) {
      if (typeof this.props.widgetStyles[styleNames[i]] !== 'undefined') {
        styles.push(this.props.widgetStyles[styleNames[i]]);
      }
    }

    return styles;
  },

  focus() {
    this.refs.input && this.refs.input.focus()
  },

  _validate(value) {
    if (typeof value === 'undefined') {
      value = this.state.value;
    }

    // @todo option for live validation ?
    var validators = GiftedFormManager.getValidators(this.props.formName, this.props.name);
    if (Array.isArray(validators.validate)) {
      if (validators.validate.length > 0) {
        var validation = GiftedFormManager.validateAndParseOne(this.props.name, value, {validate: validators.validate, title: validators.title});
        if (validation.isValid === false) {
          this.setState({
            validationErrorMessage: validation.message
          });
        } else {
          this.setState({
            validationErrorMessage: null
          });
        }
        this.props.onValidation && this.props.onValidation();
        // @todo set isvalid of modal children here
      }
    }
  },

  _setValue(value) {
    this.setState({
      value: value
    });
    GiftedFormManager.updateValue(this.props.formName, this.props.name, value);
  },

  _onChange(value) {
    this.props.onChangeText && this.props.onChangeText(value); //should maintain similar API to core TextInput component

    this._setValue(value);
    this._validate(value);

    this.props.onValueChange && this.props.onValueChange();
    // @todo modal widgets validation - the modalwidget row should inform about validation status
  },

  // @todo options enable live checking
  _renderValidationError() {
    let hasValue = typeof this.state.value !== 'undefined' && this.state.value !== '';

    if (this.props.validateOnEmpty) {
      hasValue = true;
    }

    if (!hasValue) {
      return null;
    }

    const hasValidationErrors = this.state.validationErrorMessage !== null && this.state.validationErrorMessage !== '';

    if (!hasValidationErrors) {
      return null;
    }

    var ValidationErrorWidget = require('../widgets/ValidationErrorWidget');
    return (
      <ValidationErrorWidget
        {...this.props}
        message={this.state.validationErrorMessage}
      />
    );
  },

  _renderImage() {
    var validators = null;
    if (this.props.displayValue) {
      // in case of modal widget
      validators = GiftedFormManager.getValidators(this.props.formName, this.props.displayValue);
    } else {
      validators = GiftedFormManager.getValidators(this.props.formName, this.props.name);
    }

    let toValidate = false;
    if (Array.isArray(validators.validate)) {
      if (validators.validate.length > 0) {
        toValidate = true;
      }
    }

    // @todo image delete_sign / checkmark should be editable via option
    // @todo options enable live validation

    let hasValue = typeof this.state.value !== 'undefined' && this.state.value !== '';

    if (this.props.validateOnEmpty) {
      hasValue = true;
    }

    const hasValidationErrors = this.state.validationErrorMessage !== null;
    const hasImageProp = this.props.image !== null;
    const isOptionWidget = this.props.type === 'OptionWidget'
    const shouldShowValidationImage = this.props.validationImage === true;

    if (hasValue && hasImageProp && !isOptionWidget && shouldShowValidationImage && toValidate) {
      const imageSrc = hasValidationErrors ? 'delete_sign.png' : 'checkmark.png';

      return (
        <Image
          style={this.getStyle('rowImage')}
          resizeMode={Image.resizeMode.contain}
          source={require(`../icons/${imageSrc}`)}
        />
      );
    } else if (hasImageProp) {
      if (typeof this.props.image === 'object') {
        return(this.props.image);
      }

      return (
        <Image
          style={this.getStyle('rowImage')}
          resizeMode={Image.resizeMode.contain}
          source={this.props.image}
        />
      );
    }

    return null;
  },
};
