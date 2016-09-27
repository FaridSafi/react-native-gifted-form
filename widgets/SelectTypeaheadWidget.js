/*
// Example usage:
import React from 'react';
import { GiftedForm } from 'react-native-gifted-form';

const MyTypeaheadComponent = React.createClass({

  render() {
    return (
      <GiftedForm.SelectTypeaheadWidget
        title='Search'
        name='search'
        onSearch={this.handleSearch.bind(this)}
        onSearchError={error => { console.log(error); }}
      />
    )
  },

  handleSearch(text, callback) {
    // here you would do ajax call or something along those lines
    callback(null, [
      { id: 1, value: 1, label: 'Option 1' },
      { id: 2, value: 2, label: 'Option 2' },
      { id: 3, value: 3, label: 'Option 3' },
    ]);
  },

});
*/

const React = require('react');
const {
  View, ListView, Text, TouchableHighlight, TextInput, PixelRatio,
} = require('react-native');
const GiftedSpinner = require('react-native-gifted-spinner').default;

const WidgetMixin = require('../mixins/WidgetMixin');

module.exports = React.createClass({
  mixins: [WidgetMixin],

  propTypes: {
    placeholder: React.PropTypes.string, // input placeholder text
    onSearch: React.PropTypes.func.isRequired, // function that gets called when user types some text into search input. It has 2 arguments: the first argument is the text from the search input and the second is a callback function that gets called with the results or error of the search. See above for example use. Results should be an array of objects with `id`, `value` and `label` properties.
    onSearchError: React.PropTypes.func, // callback that gets called when an error occurred during async fetching of options. It has one argument: the error.
    noResultsText: React.PropTypes.string, // text to be displayed if no results were found by async fetching of options
    fetchOnMount: React.PropTypes.bool, // options should be fetched when component initially mounts or not with an empty string as the search text.
  },

  getDefaultProps() {
    return {
      type: 'SelectTypeaheadWidget',
      onClose: () => {},
      autoFocus: false,
      placeholder: 'Start typing...',
      onSearchError: () => {},
      noResultsText: 'No results...',
      fetchOnMount: true,
    };
  },

  getInitialState() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return {
      dataSource: ds.cloneWithRows([]),
      search: '',
      isSearching: false,
      hasSearched: false,
    };
  },

  componentWillMount() {
    if (this.props.fetchOnMount) {
      this.handleSearch('');
    }
  },

  renderRow(rowData) {
    return (
      <TouchableHighlight
        key={rowData.id}
        onPress={this.handleSelect.bind(this, rowData.label, rowData.value)}
        underlayColor={this.getStyle('underlayColor').pop()}
        style={this.getStyle(['row'])}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text numberOfLines={1} style={{ flex: 1 }}>{rowData.label}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  renderHeader() {
    return (
      <View style={this.getStyle(['textInputContainer'])}>
        <TextInput
          autoFocus={this.props.autoFocus}
          style={this.getStyle(['textInput'])}
          placeholder={this.props.placeholder}
          onChangeText={this.handleSearch}
          value={this.state.search}
          clearButtonMode='while-editing'
        />
      </View>
    );
  },

  renderSeparator(sectionId, rowId) {
    return (
      <View
        key={`sep:${sectionId}:${rowId}`}
        style={this.getStyle(['separator'])}
      />
    );
  },

  renderList() {
    if (this.state.isSearching) {
      return (
        <View style={this.getStyle('row')}>
          <GiftedSpinner />
        </View>
      );
    }

    return this.state.hasSearched && !this.state.dataSource.getRowCount() ? (
      <View style={this.getStyle('row')}>
        <Text>
          {this.props.noResultsText}
        </Text>
      </View>
    ) : (
      <ListView
        style={this.getStyle(['listView'])}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        initialListSize={10}
        pageSize={10}
        keyboardShouldPersistTaps={true}
        keyboardDismissMode='on-drag'
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
      />
    );
  },

  render() {
    return (
      <View
        style={this.getStyle(['container'])}
      >
        {this.renderHeader()}
        {this.renderList()}
      </View>

    );
  },

  handleSearch(text) {
    if (!text.length && !this.props.fetchOnMount && !this.state.hasSearched) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([]),
        search: '',
      });
      return;
    }
    this.setState({ search: text, isSearching: true });
    this.props.onSearch(text, (error, results) => {
      if (error) {
        this.props.onSearchError(error);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(results),
        isSearching: false,
        hasSearched: true,
      });
    });
  },

  handleSelect(name, value) {
    this._onChange(value);
    this.props.onClose(name, this.props.navigator);
  },

  defaultStyles: {
    container: {
      flex: 1,
    },
    listView: {
      flex: 1,
    },
    textInputContainer: {
      backgroundColor: '#C9C9CE',
      height: 44,
      borderTopColor: '#7e7e7e',
      borderBottomColor: '#b5b5b5',
      borderTopWidth: 1 / PixelRatio.get(),
      borderBottomWidth: 1 / PixelRatio.get(),
    },
    textInput: {
      backgroundColor: '#FFFFFF',
      height: 28,
      borderRadius: 5,
      paddingTop: 4.5,
      paddingBottom: 4.5,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 7.5,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 15,
    },
    row: {
      height: 44,
      padding: 10,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#9ba1ac',
    },
    underlayColor: '#c7c7cc',
  },
});
