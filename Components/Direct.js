import * as React from 'react';
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import { Entypo} from 'react-native-vector-icons/Entypo';
import { FontAwesome } from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function DirectScreen({ navigation }) {
  return (
    <View style={styles.main_container}>
      
    </View>
  );
}

const DirectStack = createStackNavigator();

export default  function DirectStackScreen() {
  return (
    <DirectStack.Navigator
    	screenOptions={{

		    headerStyle: {
		        backgroundColor: '#06B4FF',
		        //height: 80,
		    },
		    headerMode:false,
	        headerTintColor: '#fff',
	        headerTitleAlign:'center',
	        headerTitleStyle: {
            	//fontWeight: 'bold',
            	fontSize:20,
            },

            headerRight: () => (
	
	     		<View style={{marginRight: 5}}>
	         		<Entypo 
	         			name="dots-three-vertical" 
	         			size={18} 
	         			color="#fff"
	         			iconStyle={{marginRight: 20}}
	         			onPress={() => alert('Login with Facebook')} />

	     		</View>
	 				
	        )
		        
      	}}
    >

	    <DirectStack.Screen 

	    	name="Vision 4 Tv" 
	    	component={DirectScreen}
	    	options={{ 

	      		title: 'Vision 4 Tv',
	      		/*headerStyle: {
	            	backgroundColor: '#06B4FF',
	            }, 
	            headerTintColor: '#fff',
	            headerTitleStyle: {
	               fontWeight: 'bold',
	           },*/

	      	}}

	    />
    </DirectStack.Navigator>
  );
}

const styles = StyleSheet.create({

  main_container: {
  		flex:1,
  		backgroundColor:'white',
  },

})