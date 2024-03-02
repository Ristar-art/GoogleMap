import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./src/Landing";

const Stack = createStackNavigator();



const Routes = () => {
  return (
    <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        
      </Stack.Navigator>
  );
};

export default Routes;
