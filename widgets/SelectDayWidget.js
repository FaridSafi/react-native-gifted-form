var React = require('react-native');
var {
  View,
  Text,
  PixelRatio
} = React;

var WidgetMixin = require('../mixins/WidgetMixin.js');

var CellWidget = require('./CellWidget.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],
  
  getInitialState() {
    return {
      year: parseInt(this.props.defaultDate.getFullYear()),
      month: parseInt(this.props.defaultDate.getMonth() + 1),
      day: parseInt(this.props.defaultDate.getDate()),
    };
  },
  
  getDefaultProps() {
    
    // @todo option to make it iso (week starting on monday)
    Date.prototype.getWeekOfMonth = function () {
      var firstDay = new Date(this.setDate(1)).getDay();
      var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
      return Math.ceil((firstDay + totalDays) / 7);
    };
    
    return {
      defaultDate: new Date(),
      dayPickerName: '',
      type: 'SelectDayWidget',
    };
  },
  
  _getFirstInMonth(month, year) {
    return new Date(year, parseInt(month) - 1, 1).getDay();
  },
  
  // @todo test if same value of week is starting on monday
  
  _getDaysInMonth(month, year) {
    return new Date(year, parseInt(month), 0).getDate();
  },
  
  setDate(date) {
    if (date instanceof Date) {
      this.unSelectAllDays();

      this.setState({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      });

      if (typeof this.refs['day{'+date.getDate()+'}'] !== 'undefined') {
        this.refs['day{'+date.getDate()+'}']._onChange(true);
      }
    }
  },
  

  setYear(value) {
    this.unSelectAllDays();
    
    this.setState({
      year: parseInt(value),
      day: 1,
    });

    if (typeof this.refs['day{1}'] !== 'undefined') {
      this.refs['day{1}']._onChange(true);
    }
  },

  setMonth(value) {
    this.unSelectAllDays();
    
    this.setState({
      month: parseInt(value),
      day: 1,
    });
    
    if (typeof this.refs['day{1}'] !== 'undefined') {
      this.refs['day{1}']._onChange(true);
    }    
  },

  setDay(value = 1) {
    this.unSelectAllDays();
    
    this.setState({
      day: parseInt(value),
    });
  
    if (typeof this.refs['day{'+value+'}'] !== 'undefined') {
      this.refs['day{'+value+'}']._onChange(true);
    }

    // @todo close the modal ?
  },
  

  unSelectAllDays() {
    for (var ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        this.refs[ref]._onChange(false);
      }
    }
  },
  
  onSelect(value = null) {
    if (value !== null) {
      this.setDay(value);
    }
  },
  
  _renderHeader() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <View style={this.getStyle('row')}>
          {this._renderCell('S', '', false)}
          {this._renderCell('M', '', false)}
          {this._renderCell('T', '', false)}
          {this._renderCell('W', '', false)}
          {this._renderCell('T', '', false)}
          {this._renderCell('F', '', false)}
          {this._renderCell('S', '', false)}
        </View>
      </View>
    );
  },
  
  _renderMonth(children) {
    var weeks = [];
    weeks.push(this._renderHeader());
    this._dayIndex = 1;
    
    var totalWeeks = new Date(this.state.year, this.state.month - 1).getWeekOfMonth();
    
    for (var i = 0; i < totalWeeks; i++) {
      weeks.push(this._renderWeek());
    }   
    return weeks;
  },
  
  _renderWeek(children) {
    var days = [];
    
    // skip first days
    var skipped = null;
    if (this._dayIndex > 1) {
      skipped = this._getFirstInMonth(this.state.month, this.state.year);
    } else {
      skipped = this._dayIndex - 1;      
    }
    
    var weekDays = 0;
    while (skipped < this._getFirstInMonth(this.state.month, this.state.year)) {
      days.push(this._renderCell('', '', false));
      skipped++;
      weekDays++;
    }
    
    // skip last days
    while (weekDays < 7) {
      if (this._dayIndex > this._getDaysInMonth(this.state.month, this.state.month)) {
        days.push(this._renderCell('', '', false));
      } else {
        days.push(this._renderCell(this._dayIndex));
        this._dayIndex++;
      }
      weekDays++;
    }
    
    return (
      <View style={this.getStyle('rowContainer')}>
        <View style={this.getStyle('row')}>
          {days}
        </View>
      </View>
    );
  },
  
  _renderCell(title = '', value = '', touchEnabled = true) {
    title = title+'';
    value = (value !== '' ? value : title);
    
    return (
      <CellWidget
        ref={touchEnabled === true ? 'day{'+title+'}' : null}
        name={this.props.dayPickerName+'$day{'+title+'}'}
        value={value}
        formName={this.props.formName}
        onSelect={this.onSelect}
        title={title}
        touchEnabled={touchEnabled}
      />
    );
  },
  
  render() {
    return (
      <View>
        {this._renderMonth()}
      </View>
    );
  },
  
  defaultStyles: {
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
  },
});
