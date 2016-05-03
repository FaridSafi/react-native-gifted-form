var validatorjs = require('validator');

function doValidateOne(k = '', value = undefined, validators = {}) {
  var isValid = null;
  var validate = validators.validate || [];
  var result = [];

  for (var i = 0; i < validate.length; i++) {
    if (validate[i].validator === 'undefined') { continue; }

    var args = validate[i].arguments;
    args = !Array.isArray(args) ? [ args ] : args;
    var clonedArgs = args.slice(0);
    clonedArgs.unshift(value);


    validate[i].message = validate[i].message || '';

    var message = validate[i].message.replace('{PATH}', "'"+k+"'");

    var title = validators.title;
    if (title) {
      message = message.replace('{TITLE}', title);
    }

    message = message.replace(/{ARGS\[(\d+)\]}/g, function (replace, argIndex) {
      var val = args[argIndex];
      return val !== undefined ? val : '';
    });

    if (typeof validate[i].validator === 'function') {
      isValid = validate[i].validator.apply(null, clonedArgs);

      // handle custom validators
      result.push({
        validator: 'Custom',
        isValid,
        message,
        value,
        title: title || k,
      });
    } else {
      if (typeof validatorjs[validate[i].validator] === 'undefined') {
        console.warn('GiftedForm Error: Validator is not correct for: '+k);
        continue;
      }

      if (validate[i].validator === 'isLength') {
        if (typeof clonedArgs[0] === 'string') {
          clonedArgs[0] = clonedArgs[0].trim();
        }
      }

      isValid = validatorjs[validate[i].validator].apply(null, clonedArgs);

      result.push({
        validator: validate[i].validator,
        isValid,
        message,
        value: clonedArgs[0],
        title: title || k,
      });  }
  }
  return result;
}

function doParseResult(result = [], name = '') {
  var isValid = true;
  var message = '';
  for (var i = 0; i < result.length; i++) {
    if (result[i].isValid === false) {
      isValid = false;
      message = result[i].message;
      break;
    }
  }

  return {
    name,
    isValid,
    message,
  };
}

// the select widgets values need to be formated because even when the values are 'False' they are stored
// formatValues return only selected values of select widgets
function formatValues(values) {
  var formatted = {};
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      if (typeof values[key] === 'boolean') {
        var position = key.indexOf('{');
        if (position !== -1) {
          if (values[key] === true) {
            // Each options of SelectWidget are stored as boolean and grouped using '{' and '}'
            // eg:
            // gender{male} = true
            // gender{female} = false
            var newKey = key.substr(0, position);
            var newValue = key.substr(position);
            newValue = newValue.replace('{', '');
            newValue = newValue.replace('}', '');
            if (!Array.isArray(formatted[newKey])) {
              formatted[newKey] = [];
            }
            formatted[newKey].push(newValue);
          }
        } else {
          formatted[key] = values[key];
        }
      } else {
        if (typeof values[key] === 'string') {
          formatted[key] = values[key].trim();
        } else {
          formatted[key] = values[key];
        }
      }
    }
  }
  return formatted;
}


class Manager {
  stores = {};

  // ===================
  // = ACTIONS SECTION =
  // ===================
  updateValue(formName, name, value) {
    this.handleUpdateValue({
      name,
      formName,
      value
    });
  }

  updateValueIfNotSet(formName, name, value) {
    this.handleUpdateValueIfNotSet({
      name,
      formName,
      value
    });
  }

  setValidators(formName, name, validators = {}) {
    this.handleSetValidators({
      name,
      formName,
      validators,
    });
  }

  getValidators(formName, name) {
    var state = this.stores;
    if (typeof state[formName] !== 'undefined') {
      if (typeof state[formName].validators === 'object') {
        if (typeof state[formName].validators[name] !== 'undefined') {
          return state[formName].validators[name];
        }
      }
    }
    return {};
  }

  // reset only the values + validators + etc.
  // if you reset the validators, you need to re-mount the form
  reset(formName) {
    this.handleReset(formName);
  }

  // reset only the values
  // useful if the GiftedForm is not unmounted
  resetValues(formName) {
    this.handleResetValues(formName);
  }

  clearSelect(formName, name) {
    this.handleClearSelect({
      name,
      formName,
    });
  }

  validateAndParseOne(k = '', value = undefined, validators = {}) {
    return doParseResult(doValidateOne(k, value, validators), k);
  }

  validate(formName) {
    var formInfo = this.stores[formName] || {};
    var validators = formInfo.validators || {};

    var values = null;
    if (typeof this.stores[formName] !== 'undefined') {
      values = formatValues(this.stores[formName].values);
    } else {
      values = {};
    }

    var results = {};

    for (let k in validators) {
      if (validators.hasOwnProperty(k)) {
        results[k] = doValidateOne(k, values[k], validators[k]);
      }
    }

    for (let k in results) {
      if (results.hasOwnProperty(k)) {
        for (let i = 0; i < results[k].length; i++) {
          if (results[k][i].isValid === true) {

          } else if (results[k][i].isValid === false) {
            return {isValid: false, results: results};
          }
        }
      }
    }
    return {isValid: true, results};
  }

  getValues(formName) {
    if (typeof this.stores[formName] !== 'undefined') {
      return formatValues(this.stores[formName].values);
    }
    return {};
  }

  getValue(formName, name) {
    if (typeof this.stores[formName] !== 'undefined') {
      if (typeof this.stores[formName].values === 'object') {
        var res = this.stores[formName].values;
        var formatted = formatValues(res);
        if (typeof formatted[name] !== 'undefined') {
          return formatted[name];
        }
      }
    }
    return null;
  }

  // =================
  // = STORE SECTION =
  // =================
  initForm(formName) {
    if (typeof this.stores[formName] === 'undefined') {
      this.stores[formName] = {values: {}, validators: {}};
    }
  }

  handleSetValidators(obj) {
    this.initForm(obj.formName);

    this.stores[obj.formName].validators[obj.name] = {
      validate: obj.validators.validate || [],
      title: obj.validators.title || '',
    };
  }

  handleUpdateValue(obj) {
    this.initForm(obj.formName);

    this.stores[obj.formName].values[obj.name] = obj.value;
  }

  handleReset(formName) {
    this.initForm(formName);

    this.stores[formName] = {values: {}, validators: {}};
  }

  handleResetValues(formName) {
    this.initForm(formName);

    if (typeof this.stores[formName] === 'undefined') {
      this.stores[formName] = {};
    }
    this.stores[formName].values = {};
  }

  handleClearSelect(obj) {
    this.initForm(obj.formName);

    for (var key in this.stores[obj.formName].values) {
      if (this.stores[obj.formName].values.hasOwnProperty(key)) {
        if (key.indexOf(obj.name) === 0) {
          // console.log('CLEARING '+key);
          delete this.stores[obj.formName].values[key];
        }
      }
    }
  }

  handleUpdateValueIfNotSet(obj) {
    this.initForm(obj.formName);
    if (typeof this.stores[obj.formName].values[obj.name] === 'undefined') {
      this.stores[obj.formName].values[obj.name] = obj.value;
    }
  }
}

module.exports = new Manager();
