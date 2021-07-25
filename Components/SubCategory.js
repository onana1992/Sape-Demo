import React, { useState } from 'react';
import { View, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
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
import {HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import {SwipeablePanel } from 'rn-swipeable-panel';
import  VideoPan from './VideoPan';
import  dataReplays from '../data.json';
import  dataAccueil from '../dataAccueil.json';
import  NewsModal from './NewsModal';
import  ReplayModal from './NewsModal';
import { getAllCategories } from '../API/OTAPI';
import { getSubcategories } from '../API/OTAPI';



//import  Swipeable from './Swipeable'

var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=true
const loop =true
const videoWidth=200;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var openswipeableActu= false;

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





export default function SubCategoryScreen({ route,navigation }) {


	const [isLoaded,setIsLoaded] = useState(false);
	const [categories,setCategory] = useState([]);
  const [subCategories,setSubCategory] = useState([]);
  const idCategory = route.params.IdCategory;


	const IoniconsHeaderButton = (props) => (
  		// the `props` here come from <Item ... />
  		// you may access them and pass something else to `HeaderButton` if you like
  		<HeaderButton {...props} IconComponent={FontAwesome} iconSize={20} color="#fff" />
   	);
 
    const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
    const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

    React.useLayoutEffect(() => {

    	navigation.setOptions({
      		// in your app, extract the arrow function into a separate component
     		// to avoid creating a new one every time
      		headerRight: () => (
        		<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
	          		<Item title="search" iconName="search" onPress={() => alert('search')} />
	          		<Item title="search" iconName="bell-o" onPress={() => alert('search')} />	
		        </HeaderButtons>
        	),
    	});
  	}, [navigation]);


    
    function navigate(page) {
      navigation.navigate(page)
    }


    React.useLayoutEffect(() => {

    	getSubcategories(idCategory).then(data => {
        //console.log(data.CategoryInfoList.Content);
    	  setSubCategory(data.CategoryInfoList.Content);
    		setIsLoaded(true);
          
      })

  	}, [navigation]);



    function navigateTo(IdCat,NameCat,isParent){

      if(isParent){
        navigation.push('Subcategory', {
            IdCategory: IdCat,
        });
      }
      else{
         navigation.navigate('Catproduits', {
            IdCategory: IdCat, NameCategory:NameCat
        });
      }
       
    }
      


    


//  const url= 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png';
 

	return (

        <View style={{flex:1}}>
			
			{

				isLoaded ? 
			        <ScrollView style={styles.main_container}>

			        	{
						    subCategories.map((item, i) => (
						      <ListItem bottomDivider style={styles.list} key={i}  onPress={() => navigateTo(item.Id,item.Name,item.IsParent)}>

                    {
                      item.IconImageUrl &&
                      <Image
                        style={{height:30,width:30}}
                        source={{uri : item.IconImageUrl.replace("https", "http")}}
                      />
                    }
                    
						        <ListItem.Content>
						          <ListItem.Title style={{color:'black',fontSize:14, }}>{item.Name.toUpperCase()}</ListItem.Title>
						        </ListItem.Content>
						        <ListItem.Chevron />
						      </ListItem>
					    	))
		  				}
				        
				    </ScrollView>
				:
				    <View style={{flex:1,backgroundColor:'white'}}>
					    <View style={styles.loadingCover}>
					            <ActivityIndicator
					               color='#EE7600'
					               size='large' />
					      		   <Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement,veuillez patienter ...</Text>
					        
				        </View>
			      </View>
			}
		
		

		</View>
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