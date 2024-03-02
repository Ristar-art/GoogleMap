import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect} from "react";
import Routes from './routes';

import { NavigationContainer } from "@react-navigation/native";
import linking from './linking';

export default function App() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs&libraries=places";
//     script.defer = true;
//     script.async = true; // Add the async attribute
  
//     const handleScriptLoad = () => {
//       // Render your component or any other actions after the script is loaded
//     };
  
//     script.onload = handleScriptLoad;
  
//     // Check if the script is already present to avoid re-adding it
//     if (!document.querySelector(`script[src="${script.src}"]`)) {
//       document.head.appendChild(script);
//     }
  
//     return () => {
//       // Clean up if needed
//       document.head.removeChild(script);
//     };
// }, []);

  return (
    <NavigationContainer linking={linking}>
     <Routes></Routes>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
