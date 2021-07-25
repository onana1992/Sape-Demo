import React, { useState } from 'react';
import { View, StatusBar, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button';
import TextTicker from 'react-native-text-ticker';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import { SwipeablePanel } from 'rn-swipeable-panel';
import  VideoPan from './VideoPan';
import  dataReplays from '../data.json';
import  dataAccueil from '../dataAccueil.json';
import  NewsModal from './NewsModal';
import  ReplayModal from './NewsModal';


//import  Swipeable from './Swipeable'

const list = [0,1,2,3,4,5,6,7,8,9]
var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=true
const loop =true
const videoWidth=200;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var openswipeableActu= false;

function LogoTitle() {
  return (
    <View style={{flex:1, flexDirection:'row',justifyContent: 'flex-start',
        alignItems: 'center', }}>
      <Image
        style={{ width: 60, height: 60 }}
        source={require('../assets/Images/icon.png')}
      />
      <Text style={{color:'orange', fontSize:18}}>C-Package</Text>
      </View>
  );
}





function PanierScreen({ navigation }) {


	const [isLoaded,setIsLoaded] = useState(false);
	const IoniconsHeaderButton = (props) => (
  		// the `props` here come from <Item ... />
  		// you may access them and pass something else to `HeaderButton` if you like
  		<HeaderButton {...props} IconComponent={FontAwesome} iconSize={20} color="#fff" />
   	);
 
    const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
    const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

    
    function navigate(page) {
      navigation.navigate(page)
    }


    React.useLayoutEffect(() => {

		setTimeout(() => {

	        setIsLoaded(true);

	    }, 2000);

  	}, [navigation]);



  


	return (

        <View style={{flex:1}}>

        	<View>
            	<StatusBar translucent backgroundColor="#333" />
          	</View>
			
			{

				!isLoaded ? 
			        <View style={styles.main_container}>

			        	<Text>ccc</Text>
				        
				    </View>
				:
				    <View style={{flex:1,backgroundColor:'white'}}>
					    <View style={styles.loadingCover}>
					        <ActivityIndicator
					            color='##06B4FF'
					            size='large' />
					      		<Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement,veuillez patienter ...ff</Text>
				        </View>
			      </View>
			}
		
		</View>
  	);

}


const PanierStack = createStackNavigator();

export default  function PanierStackScreen() {
	
  return (
   <PanierScreen/>

  );
}





const styles = StyleSheet.create({
  	main_container: {
  		flex:1,
  		backgroundColor:'white',
  	},

 

   loadingCover: {
  		flex:1,
  		justifyContent: 'center',
  		alignItems: 'center', 
  	},


})