import React from 'react';
import {
  ScrollView,
  View,
  Platform,
  Dimensions
} from 'react-native';

var GiftedFormManager = require('../GiftedFormManager');

module.exports = {

  propTypes: {
    formName: React.PropTypes.string,
    scrollOnTap: React.PropTypes.bool,
    scrollEnabled: React.PropTypes.bool,
    formStyles: React.PropTypes.object,
    // navigator: ,
  },

  getDefaultProps() {
    return {
      formName: 'form',
      scrollOnTap: true, // auto scroll when focus textinput in bottom of screen
      scrollEnabled: true,
      formStyles: {},
      navigator: null, // @todo test when null if crash
    }
  },

  getInitialState() {
    return {
      errors: [],
    };
  },

  _onTouchStart(e) {
    this._pageY = e.nativeEvent.pageY;
    this._locationY = e.nativeEvent.locationY;
  },

  _onScroll(e) {
    this._y = e.nativeEvent.contentOffset.y;
  },

  // https://facebook.github.io/react-native/docs/nativemethodsmixin.html#content
  // I guess it can be improved by using height measures
  handleFocus(scrollToTopOfWidget = false) {
    if (Platform.OS !== 'android' && this.props.scrollEnabled === true) {
      var keyboardHeight = 259;
      if (this.props.scrollOnTap === true && this._pageY + this._locationY > Dimensions.get('window').height - keyboardHeight - 44) {
        // @todo don't scroll lower than _contentSize
        if (scrollToTopOfWidget === true) {
          this._scrollResponder.scrollTo({
            y: this._pageY - this._locationY - 44 - 30,
            x: 0,
            animated: false,
          });
        } else {
          this._scrollResponder.scrollTo({
            y: this._pageY + this._y - this._locationY - keyboardHeight + 44,
            x: 0,
            animated: false,
          });
        }
      }
      // @todo don't change inset if external keyboard connected
      this.refs.container.setNativeProps({
        contentInset: {top: 0, bottom: keyboardHeight, left: 0, right: 0},
      });
    }
  },

  handleBlur() {
    if (Platform.OS !== 'android' && this.props.scrollEnabled === true) {
      // @todo dont change inset if external keyboard connected
      this.refs.container.setNativeProps({
        contentInset: {top: 0, bottom: 0, left: 0, right: 0},
      });
    }
  },

  handleValidation() {
    if (!this.props.onValidation) return;
    var validation = GiftedFormManager.validate(this.props.formName);
    this.props.onValidation(validation);
  },

  handleValueChange() {
    if (!this.props.onValueChange) return;
    var values = GiftedFormManager.getValues(this.props.formName);
    this.props.onValueChange(values);
  },

  childrenWithProps() {
    return React.Children.map(this.props.children, (child) => {
      if (!!child) {
        return React.cloneElement(child, {
          formStyles: this.props.formStyles,
          openModal: this.props.openModal,
          formName: this.props.formName,
          form: this,
          navigator: this.props.navigator,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onValidation: this.handleValidation,
          onValueChange: this.handleValueChange,
        });
      }
    });
  },

  componentDidMount() {
    this._y = 0;
    this._pageY = 0;
    this._locationY = 0;

    if (this.props.scrollEnabled === true) {
      this._scrollResponder = this.refs.container.getScrollResponder();
    }
  },

  _renderContainerView() {
    var formStyles = this.props.formStyles;
    var viewStyle = [(this.props.isModal === false ? [styles.containerView, formStyles.containerView] : [styles.modalView, formStyles.modalView]), this.props.style];
    if (this.props.scrollEnabled === true) {
      return (
        <ScrollView
          ref='container'
          style={viewStyle}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="always"

          onTouchStart={this.props.scrollOnTap === true ? this._onTouchStart : null}
          onScroll={this.props.scrollOnTap === true ? this._onScroll : null}
          scrollEventThrottle={this.props.scrollOnTap === true ? 200 : 0}

          {...this.props}
        >
          {this.childrenWithProps()}
        </ScrollView>
      );
    }
    return (
      <View
        ref='container'
        style={viewStyle}
        keyboardDismissMode='on-drag' // its working on View ?

        {...this.props}
      >
        {this.childrenWithProps()}
      </View>
    );
  },
};

var styles = {
  containerView: {
    backgroundColor: '#eee',
    flex: 1,
  },
  modalView: {
    backgroundColor: '#eee',
    flex: 1,
  },
};
