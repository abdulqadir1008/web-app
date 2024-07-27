import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useState } from 'react';
import { BorderRight } from '@mui/icons-material';
import { BsSearch } from 'react-icons/bs';
import './Component.css';

const MapsLatLngs = (props: any) => {
  const [address, setAddress] = useState(props.address ? props.address : '');
  const [coordinates, setCoordinates] = useState<any>({ lat: props.lat, lng: props.lng });
  const handleSelect = async (value: string) => {
    const result = await geocodeByAddress(value);
    const ll: any = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates(ll);
    props.LocationData(value, ll.lat, ll.lng);
  };
  const componentRestrictions = {
    location: new google.maps.LatLng(17, 78),
    radius: 2
  };

  return (
    <div className="d-flex justify-content-center ">
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={componentRestrictions}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="Map-lat-lng-box col-12">
            <div className="d-flex">
              <input
                {...getInputProps({
                  placeholder: 'Search your location',
                  className: 'location-search-input col-12 input-box heading-text'
                })}
              />
            </div>
            <div className="autocomplete-dropdown-container search-dropdown">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? 'suggestion-item-active search-dropdown-item-active text-dark heading-text' : 'suggestion-item search-dropdown-item heading-text';
                return (
                  <div key={suggestion.description}>
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default MapsLatLngs;
