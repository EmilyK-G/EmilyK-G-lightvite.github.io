"use client"
import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
 
const Address = () => {

  const [displayValue, setDisplayValue] = useState('');

  const countryCodes = ['us']
  function onPlaceSelect(value) {
    console.log(value);
  }
 
  function onSuggectionChange(value) {
    console.log(value);
  }
 
  return <GeoapifyContext apiKey={process.env.autocompleteKey}>
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        type={'amenity'}
        lang={'en'}
        biasByLocation
        countryCodes={countryCodes}
        limit={5}
        value={displayValue}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        />
    </GeoapifyContext>
}
 
export default Address

// import React from 'react'

// const Address = () => {
//     var requestOptions = {
//         method: 'GET',
//       };
    
//       const autocomplete = async(e) => {

//         e.preventDefault()

//         const response = await fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=fb7d0854a46444f49fa7e9093c311ce2", requestOptions);

//         const json = await response.json();
    
//         if(response.ok){
//             console.log(json)
//         }
//         if(!response.ok){
//             console.log('There was an error fetching the address')
//         }
//       }
    
//   return (
//     <div>
//         <button type='submit' onClick={(e)=>autocomplete(e)}>Get addresses</button>
//     </div>
//   )
// }

// export default Address