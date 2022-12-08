"use client"

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

interface ChildProps {
    setAddress: any;
    address: string
  }

const Address = ({setAddress, address}:ChildProps) => {

  const onSelect = (value: string) => {
    setAddress(value);
    console.log(value, address);
  }
 
  return <GeoapifyContext apiKey={process.env.autocompleteKey}>
        <GeoapifyGeocoderAutocomplete placeholder="Event Address"
            type={'amenity'}
            placeSelect={onSelect}
            // biasByLocation
            limit={5}
            />
    </GeoapifyContext>
    
}
 
export default Address