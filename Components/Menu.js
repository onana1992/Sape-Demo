import * as React from 'react';
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,ScrollView,Icon, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItem, Avatar,SocialIcon,Divider} from 'react-native-elements';
import  Langue from '../Components/Langue';
import  Parametres from '../Components/Parametres';
import  About from '../Components/About';
import  Contact from '../Components/About';
import  Mention from '../Components/Mention';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';



const list = [   
  {
    title: 'Langue',
    icon: 'language'
  },
  {
    title: 'Paramètres notification',
    icon: 'bell'
  },
  {
    title: 'À propos de nous',
    icon: 'info-circle'
  },
  {
    title: 'Mention legale',
    icon: 'legal'
  },
  {
    title: 'Adresse et Contact',
    icon: 'address-book'
  },

  {
    title: 'Partager l\'application',
    icon: 'share'
  },

  {
    title: 'Quitter l\'application',
    icon: 'close'
  },

 ]

function clickAction(navigation,title){
    if (title === "Langue"){
 		navigation.navigate("Langue")
 	}
 	else if (title === "Paramètres notification"){
 		navigation.navigate("Parametres")
 	}
 	else if (title === "À propos de nous"){
 		navigation.navigate("About")
 	}
 	else if (title === "Mention legale"){
 		navigation.navigate("Mention")
 	}
 	else if (title === "Adresse et Contact"){
 		navigation.navigate("Contact")
 	}
 	else if (title === "Partager l\'application"){
 		
 	}
 	else if (title === "Quitter l\'application"){
 		
 	}
}


function MenuScreen({ navigation }) {

	const IoniconsHeaderButton = (props) => (
      // the `props` here come from <Item ... />
      // you may access them and pass something else to `HeaderButton` if you like
      <HeaderButton {...props} IconComponent={FontAwesome} iconSize={23} color="#4C4C4C" />
    );

	const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
 
 	const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

  	React.useLayoutEffect(() => {

      navigation.setOptions({
          // in your app, extract the arrow function into a separate component
         // to avoid creating a new one every time
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>

              <Item title="search" iconName="bell-o" onPress={() => alert('search')} />
              <Item title="search" iconName="bookmark-o" onPress={() => alert('search')} />

              {/*<ReusableSelectItem onPress={() => alert('Edit')} />*/}

              {/*<OverflowMenu
                style={{ marginHorizontal: 10 }}
                OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />}
              >
                <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
                <ReusableHiddenItem onPress={() => alert('hidden2')} />
              </OverflowMenu>*/}

            </HeaderButtons>
          ),
      });
    }, [navigation]);


  	return (
	    <ScrollView style={styles.main_container} >
		  {
		    list.map((item, i) => (
		      <ListItem bottomDivider style={styles.list} key={i}  onPress={() => clickAction(navigation ,item.title)}>
		       <Image  
		          		source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
		          		style={styles.FloatingButtonStyle} 
		         	/>
		        <ListItem.Content>
		          <ListItem.Title style={{color:'black',fontSize:16 }}>{item.title}</ListItem.Title>
		        </ListItem.Content>
		        <ListItem.Chevron />
		      </ListItem>
	    	))
		  }

		  {/*<View style={{flex:1, textAlign:'center', justifyContent: 'center',flexDirection: 'row', }}>
				<Text style={{fontSize:16,paddingTop:5}}> Retrouver nous sur les reseaux sociaux </Text>
		  </View>*/}

		<View style={{flex:1, textAlign:'center', justifyContent: 'center',flexDirection: 'row',marginTop:10 }} >
            
      
			<SocialIcon
			  raised={true}
			  type='facebook'
			/>

			<SocialIcon
			 
			  raised={true}
			  type='twitter'
			/>

			<SocialIcon
			  raised={true}
			  type='youtube'
			/>

		</View>
        
        {/*<Divider style={{ backgroundColor: 'gray' }} />*/}
		  
	    <View style={{textAlign: 'center',marginBottom:10}}>
		  	<Text style={{textAlign: 'center', color:'gray'}}> Powered by</Text>
		  	<Text style={{textAlign: 'center', color:'#06B4FF'}}>  NANO-TECH Sarl</Text>
		  	<Text style={{textAlign: 'center', color:'#06B4FF'}}>  ©copyright: vision4tv 2020 </Text>
		</View>

		</ScrollView>
    );
}

const MenuStack = createStackNavigator();

export default  function MenuStackScreen() {
  return (
    <MenuStack.Navigator
    
    	headerMode='screen'
    	screenOptions={{
            
		    headerStyle: {
		        backgroundColor: '#06B4FF',
		        //height: 80,
		    },
		    
	        headerTintColor: '#4C4C4C',
	        headerTitleAlign:'center',
	        headerTitleStyle: {
            	//fontWeight: 'bold',
            	fontSize:20,
            },

            headerRight: () => (
	
	     		<View style={{marginRight: 5}}>

	     		    <Text>
		         		<Entypo 
		         			name="dots-three-vertical" 
		         			size={18} 
		         			color="#4C4C4C"
		         			iconStyle={{marginRight: 20}}
		         			onPress={() => alert('Login with Facebook')} />
	         		</Text>
	     		</View>
	 				
	        )
		        
      	}}
    	>

	    <MenuStack.Screen 
	    	name="Vision 4 Tv" 
	        headerMode='screen'
	    	component={MenuScreen}

	    	options={{ 

	      		title: 'Vision 4 Tv',
	      		headerMode: 'screen',
	      		//headerTintColor: '#fff',
	      		headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }

	      		/*headerStyle: {
	            	backgroundColor: '#06B4FF',
	            }, 
	            headerTintColor: '#fff',
	            headerTitleStyle: {
	               fontWeight: 'bold',
	           },*/

	      	}}
	    />

	    <MenuStack.Screen 
	    	name="Langue" 
	    	component={Langue}
	    	options={{ 
	      		 
	       		headerTintColor: '#4C4C4C',
	      		headerTitleStyle: {
	               //fontWeight: 'bold',

	               fontSize:20
	            },

	            headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }
	      	}}
	    />

	    <MenuStack.Screen 
	    	name="Parametres" 
	    	component={Parametres}
	    	options={{ 
	      		 
	       		headerTintColor: '#4C4C4C',
	      		headerTitleStyle: {
	               //fontWeight: 'bold',

	               fontSize:20
	            },

	            headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }
	      	}}
	    />

	    <MenuStack.Screen 
	    	name="About" 
	    	component={About}
	    	options={{ 
	      		 
	       		headerTintColor: '#4C4C4C',
	      		headerTitleStyle: {
	               //fontWeight: 'bold',

	               fontSize:20
	            },

	            headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }
	      	}}
	    />

	    <MenuStack.Screen
	    	name="Contact" 
	    	component={Contact}
	    	options={{ 
	      		 
	       		headerTintColor: '#4C4C4C',
	      		headerTitleStyle: {
	               //fontWeight: 'bold',

	               fontSize:20
	            },

	            headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }
	      	}}
	    />

	    <MenuStack.Screen 
	    	name="Mention" 
	    	component={Mention}
	    	options={{ 
	      		 
	       		headerTintColor: '#4C4C4C',
	      		headerTitleStyle: {
	               //fontWeight: 'bold',

	               fontSize:20
	            },

	            headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }
	      	}}
	    />

    </MenuStack.Navigator>
  );
}


const styles = StyleSheet.create({

  main_container: {
  		flex:1,
  		backgroundColor:'white',
  },

  list: {
  		
  		backgroundColor:'gray',
  },

 

})