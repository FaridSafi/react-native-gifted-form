var React = require('react');

var WidgetMixin = require('../mixins/WidgetMixin.js');

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'GooglePlacesWidget',
    };
  },

  render() {
    const everywhere = {description: 'Everywhere', geometry: { location: { lat: 0, lng: 0 } }};


    return (
      <GooglePlacesAutocomplete
        placeholder='Type a city name'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = {}) => { // details is provided when fetchDetails = true
          // console.log(details);
          this._onChange({
            name: details.formatted_address,
            placeId: details.place_id,
            details: details,
            loc: [details.geometry.location.lng, details.geometry.location.lat],
            types: details.types
          });
          this.props.onClose(details.formatted_address, this.props.navigator);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={this.props.query}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        currentLocationAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        // predefinedPlaces={[everywhere]}


        {...this.props} // @todo test sans (need for 'name')
      />
    );
  },
});
