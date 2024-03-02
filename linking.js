
import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/")], // this is the prefix for our app. Could be anything eg https://myapp.com
  config: {
    screens: {
      Landing: "",
      
    },
  },
};

export default linking;

        