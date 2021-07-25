
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux'
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
//import Store from './Store/configureStore'
import {store, persistedStore} from "./Store/configureStore";
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';


const toastConfig = {
  success: ({ text1, props, ...rest }) => (
    <View style={{ height: 40, width: '70%',color:'white', backgroundColor: 'black',alignItems: 'center', borderRadius:5,
     justifyContent: 'center', }}>
      <Text style={{color:'white'}}>{text1}</Text>
      
    </View>
  ),
  error: () => {},
  info: () => {},
  any_custom_type: () => {}
};

export default function App() {

  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release']);

  return (
    <OverflowMenuProvider>
      <Provider store={store}>
        <Navigation/>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </OverflowMenuProvider>

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
