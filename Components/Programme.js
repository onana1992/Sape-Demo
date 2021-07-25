import * as React from 'react';
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import TextTicker from 'react-native-text-ticker';
import Video from 'react-native-video';




function ProgrammeScreen({ navigation }) {


	 var sourceImage = require('../assets/Images/grille.jpg')
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
    <View style={{flex:1, backgroundColor: 'white'}}>
  	  <View style={{ flexDirection:'row',height:30,alignItems: 'center',justifyContent: 'center',backgroundColor: '#4C4C4C'}}>
              
              <View style={{flex:2}}>
                <Text style={{fontSize:12,color:'white',fontWeight:'bold',textAlign:'center'}}>FLASH INFO </Text>
              </View>  

            <View style={{flex:6}}>
              <TextTicker
                style={{ fontSize: 12}}
                animationType='auto'
                duration={20000}
                scrollSpeed={5}
                loop
                repeatSpacer={50}
                marqueeDelay={1000}
              >
                <Text style={{color:'white'}}>Super long piece of text is long. The quick brown fox jumps over the lazy dog***Super long piece of text is long. The quick brown fox jumps over the lazy dog</Text>
              </TextTicker>
            </View>
      </View>

      <View>

        <Video
            source={{ uri: 'http://cdnamd-hls-globecast.akamaized.net/live/ramdisk/vision4/hls_video/index.m3u8' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
           // style={{ width: 400, height: 300 }}
           style={StyleSheet.absoluteFill}
        />

      </View>
    </View>
  );
}


const ProgrammeStack = createStackNavigator();

export default  function ProgrammeStackScreen() {
  return (
    <ProgrammeStack.Navigator
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

	  <ProgrammeStack.Screen 
	    name="Vision 4 Tv" 
	    component={ProgrammeScreen}
	    options={{ 
        title: 'Vision 4 Tv',
        headerMode: 'screen',
        headerStyle: {
          backgroundColor: '#fff',
          //height: 90
        }
      }}
	  />
  </ProgrammeStack.Navigator>
  );
}

const styles = StyleSheet.create({

  main_container: {
  		flex:1,
  		backgroundColor:'white',
  		width: "100%"
  },

  section_title: {
  	fontSize:18,
    flex:1,
    
  },

  grille_image: {
    flex:10,
    width: "100%",
    height: 300,
     resizeMode:'contain'
      
  },

  section_programme: {
    flex:5,
    
  },
})