// import React from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import { Text } from "react-native";

// const libraries = ["places"]; // Move the libraries outside the component

// const Landing = () => {
//     console.log("libraries is ",libraries)
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs",
//     libraries: libraries, // Use the libraries constant
//   });

//   if (loadError) return <Text>Error loading maps</Text>;
//   if (!isLoaded) return <Text>Loading...</Text>;

//   return <Map />;
// };

// export default Landing;

// function Map() {
//   return (
//     <GoogleMap
//       zoom={10}
//       center={{ lat: 40, lng: -80 }}
//       style={{ width: '100vw', height: '100vh', pointerEvents: 'auto' }}
//     >
//       <Marker position={{ lat: 40, lng: -80 }} />
//     </GoogleMap>
//   );
// }


// import React,{useMemo} from "react";
// // import { View } from "react-native-web";
// import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
//   } from "use-places-autocomplete";
//   import useOnclickOutside from "react-cool-onclickoutside";
//   import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
//   } from "@reach/combobox";
  
//   import "@reach/combobox/styles.css";
// import { Text } from "react-native";

// const PlacesAutocomplete = () => {
//     const {
//       ready,
//       value,
//       suggestions: { status, data },
//       setValue,
//     } = usePlacesAutocomplete({ callbackName: "AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs" });
  
//     const handleInput = (e) => {
//       setValue(e.target.value);
//     };
  
//     const handleSelect = (val) => {
//       setValue(val, false);
//     };
  
//     return (
//       <Combobox onSelect={handleSelect} aria-labelledby="demo">
//         <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ place_id, description }) => (
//                 <ComboboxOption key={place_id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     );
//   };

// const containerStyle = {
//     width: '400px',
//     height: '400px'
//   };
  
  
// const Landing = () => {
//     const center = useMemo(()=>({lat: -3.745,lng: -38.523 }),[]) 
    
//  const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs"
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])
 
//   return isLoaded ? (
//     <div>
//         <PlacesAutocomplete style={{marginBottom:10}}/>
//         <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       // zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       <Marker position={center}/>
//     </GoogleMap>
//     </div>
   
// ) : <></>

// };

// export default Landing


import React, { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";

const Landing = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs",
    libraries: ["places"],
  });

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.006 });
  const [address, setAddress] = useState("");
  const [locationDetails, setLocationDetails] = useState(null);
  const options = {
    componentRestrictions: { country: "ng" },
    types: ["establishment"],
  };

  useEffect(() => {
    const onLoad = () => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();

        if (place.geometry && place.formatted_address) {
          const latLng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setCoordinates(latLng);
          setAddress(place.formatted_address);
          console.log("Address:", place.formatted_address);
          setLocationDetails(place);
          console.log("Location Details:", place);
        }
      });
    };

    if (isLoaded) {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, [isLoaded, options]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div className="App">
      {isLoaded ? (
        <>
          <div>
            <label>Enter address:</label>
            <input ref={inputRef} />
          </div>
          <GoogleMap
            center={coordinates}
            mapContainerStyle={{
              width: "30%",
              height: "300px", // Increase the height for better visibility of the address
            }}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
          {address && (
            <div>
              <h3>Address:</h3>
              <p>{address}</p>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Landing;
