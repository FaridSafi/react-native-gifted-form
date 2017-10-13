import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
} from 'react-native';

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SelectWidget',
      multiple: false,
      onSelect: () => {},
      onClose: () => {},
    };
  },

  unSelectAll() {
    React.Children.forEach(this._childrenWithProps, (child, idx) => {
      this.refs[child.ref]._onChange(false);
    });
  },

  render() {
    this._childrenWithProps = React.Children.map(this.props.children, (child, idx) => {
      var val = child.props.value || child.props.title;

      return React.cloneElement(child, {
        formStyles: this.props.formStyles,
        openModal: this.props.openModal,
        formName: this.props.formName,
        navigator: this.props.navigator,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onValidation: this.props.onValidation,
        onValueChange: this.props.onValueChange,

        name: this.props.name+'{'+val+'}',
        ref: this.props.name+'{'+val+'}',
        value: val,
        unSelectAll: this.unSelectAll,

        multiple: this.props.multiple,
        onClose: this.props.onClose, // got from ModalWidget
        onSelect: this.props.onSelect, // got from DayPickerWidget
      });
    });

    return (
      <View>
        {this._childrenWithProps}
      </View>
    );
  },
});
