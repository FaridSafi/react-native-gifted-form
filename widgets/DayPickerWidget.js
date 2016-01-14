var React = require('react-native');
var {
  View
} = React;

var GiftedFormManager = require('../GiftedFormManager');

var WidgetMixin = require('../mixins/WidgetMixin');


var ModalWidget = require('./ModalWidget');
var SelectWidget = require('./SelectWidget');
var OptionWidget = require('./OptionWidget');
var SeparatorWidget = require('./SeparatorWidget');
var SelectDayWidget = require('./SelectDayWidget');
var RowWidget = require('./RowWidget');


var moment = require('moment');

module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'DayPickerWidget',
      selectToday: true,
    };
  },
  
  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  
  _onSelect(name = '', value) {
    if (typeof this._selectDay['set'+this._capitalizeFirstLetter(name)] !== 'undefined') {
      this._selectDay['set'+this._capitalizeFirstLetter(name)](value);      
    }
  },
  
  onPressToday() {
    GiftedFormManager.clearSelect(this.props.formName, this.props.name+'$year');
    GiftedFormManager.clearSelect(this.props.formName, this.props.name+'$month');

    var now = new Date();
    GiftedFormManager.updateValue(this.props.formName, this.props.name+'$year{'+now.getFullYear()+'}', true);
    GiftedFormManager.updateValue(this.props.formName, this.props.name+'$month{'+(now.getMonth() + 1)+'}', true);

    this._selectYearModal.refreshDisplayableValue();
    this._selectMonthModal.refreshDisplayableValue();
    
    this._selectDay.setDate(now);
  },
  
  setToday() {
    var now = new Date();
    GiftedFormManager.updateValueIfNotSet(this.props.formName, this.props.name+'$year{'+now.getFullYear()+'}', true);
    GiftedFormManager.updateValueIfNotSet(this.props.formName, this.props.name+'$month{'+(now.getMonth() + 1)+'}', true);
    GiftedFormManager.updateValueIfNotSet(this.props.formName, this.props.name+'$day{'+now.getDate()+'}', true);
  },
  
  // @todo test this component when not in modal
  componentWillMount() {
    var value = GiftedFormManager.getValue(this.props.formName, this.props.name);
    if (value === null) {
      this.setToday();
    }
  },
  
  // @todo year range as props
  render() {
    return (
      <View>
        <ModalWidget
          {...this.props}
          
          title='Year'
          displayValue={this.props.name}
          transformValue={(value) => {
            if (value instanceof Date) {
              return value.getFullYear();
            }
            return '';
          }}
          ref={(c) => this._selectYearModal = c} 
        >
          <SelectWidget name={this.props.name+'$year'} multiple={false} onSelect={(value) => { this._onSelect('year', value) }}>
            <OptionWidget title='2015'/>
            <OptionWidget title='2014'/>
            <OptionWidget title='2013'/>
            <OptionWidget title='2012'/>
            <OptionWidget title='2011'/>
            <OptionWidget title='2010'/>
            <OptionWidget title='2009'/>
            <OptionWidget title='2008'/>
            <OptionWidget title='2007'/>
            <OptionWidget title='2006'/>
            <OptionWidget title='2005'/>
            <OptionWidget title='2004'/>
            <OptionWidget title='2003'/>
            <OptionWidget title='2002'/>
            <OptionWidget title='2001'/>
            <OptionWidget title='2000'/>
            <OptionWidget title='1999'/>
            <OptionWidget title='1998'/>
            <OptionWidget title='1997'/>
            <OptionWidget title='1996'/>
            <OptionWidget title='1995'/>
            <OptionWidget title='1994'/>
            <OptionWidget title='1993'/>
            <OptionWidget title='1992'/>
            <OptionWidget title='1991'/>
            <OptionWidget title='1990'/>
            <OptionWidget title='1989'/>
            <OptionWidget title='1988'/>
            <OptionWidget title='1987'/>
          </SelectWidget>
        </ModalWidget>

        <ModalWidget
          {...this.props}
                    
          title='Month'
          displayValue={this.props.name}
          transformValue={(value) => {
            if (value instanceof Date) {
              // @todo locals
              // https://github.com/moment/momentjs.com/blob/master/docs/moment/07-customization/01-month-names.md
              return moment.months()[value.getMonth()];
            }
            return '';
          }}
          ref={(c) => this._selectMonthModal = c}
        >
          <SelectWidget name={this.props.name+'$month'} multiple={false} onSelect={(value) => { this._onSelect('month', value) }}>
            <OptionWidget title='January' value='1'/>
            <OptionWidget title='February' value='2'/>
            <OptionWidget title='March' value='3'/>
            <OptionWidget title='April' value='4'/>
            <OptionWidget title='May' value='5'/>
            <OptionWidget title='June' value='6'/>
            <OptionWidget title='July' value='7'/>
            <OptionWidget title='August' value='8'/>
            <OptionWidget title='September' value='9'/>
            <OptionWidget title='October' value='10'/>
            <OptionWidget title='November' value='11'/>
            <OptionWidget title='December' value='12'/>
          </SelectWidget>
        </ModalWidget>
          
        <SeparatorWidget />

        <SelectDayWidget
          name='day'
          ref={(c) => this._selectDay = c}
          
          formName={this.props.formName}
          dayPickerName={this.props.name}
        />

        <SeparatorWidget />
        {this.renderSelectToday()}
      </View>
    );
  },
  
  renderSelectToday() {
    if (this.props.selectToday === true) {
      return (
        <RowWidget
          title='Select today'
          onPress={this.onPressToday}
          disclosure={false}
        />
      );
    }
    return null;
  },
  
});