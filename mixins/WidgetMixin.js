var React = require('react-native');
var {
  Image  
} = React;


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
    // If we want to store the state elsewhere (Redux store, for instance), we can use value and onValue prop
    value: React.PropTypes.any,
    onValue: React.PropTypes.func,
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
    };
  },
  
  componentDidMount() {
    // get value from prop
    if (typeof this.props.value !== 'undefined') {
      this.setState({
        value: this.props.value,
      });
      this._validate(this.props.value);
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
    this._setValue(value);
    this._validate(value);

    this.props.onValue && this.props.onValue(value);
    
    // @todo modal widgets validation - the modalwidget row should inform about validation status
  },
  
  // @todo options enable live checking
  _renderValidationError() {
    if (!(typeof this.state.value === 'undefined' || this.state.value === '') && this.state.validationErrorMessage !== null && this.state.validationErrorMessage !== '') {
      var ValidationErrorWidget = require('../widgets/ValidationErrorWidget');
      return (
        <ValidationErrorWidget
          message={this.state.validationErrorMessage}
        />
      );
    }
    return null;
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
    if (!(typeof this.state.value === 'undefined' || this.state.value === '') && this.state.validationErrorMessage !== null && this.props.image !== null && this.props.type !== 'OptionWidget' && this.props.validationImage === true && toValidate === true) {
      return (
        <Image
          style={this.getStyle('rowImage')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/delete_sign.png')}
        />
      );
    } else if (!(typeof this.state.value === 'undefined' || this.state.value === '') && this.state.validationErrorMessage === null && this.props.image !== null && this.props.type !== 'OptionWidget' && this.props.validationImage === true && toValidate === true) {
      return (
        <Image
          style={this.getStyle('rowImage')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/checkmark.png')}
        />
      );
    } else if (this.props.image !== null) {
      if (typeof this.props.image == 'object') {
        return(this.props.image);
      } else {
        return (
          <Image
            style={this.getStyle('rowImage')}
            resizeMode={Image.resizeMode.contain}
            source={this.props.image}
          />
        );
      }
    }
    return null;
  },
};
