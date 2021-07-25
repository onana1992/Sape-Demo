import React, { useState } from 'react';
import { View,StatusBar, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
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
import VideoPan from './VideoPan';
import dataReplays from '../data.json';
import dataAccueil from '../dataAccueil.json';
import NewsModal from './NewsModal';
import ReplayModal from './NewsModal';
import { getAllCategories } from '../API/OTAPI'
import {CategoryIcon} from '../API/OTAPI'
import SubCategoryScreen from '../Components/SubCategory'; 
import  CatProduitsScreen from '../Components/CatProduits';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

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
    id:"0",
    title: 'Catégories recommandées',
    sub: [
      

      {
        id:0,
        name :"Pérruques",
        icon : "https://gd4.alicdn.com/imgextra/i1/1070431125/O1CN0162kGJZ1KBI5OkUzYl_!!1070431125.jpg"
      },

      {
        id:1,
        name :"Meches et extentions",
        icon : "https://gd4.alicdn.com/imgextra/i4/3028715539/TB2zbJJutFopuFjSZFHXXbSlXXa_!!3028715539.jpg"
      },

      {
        id:2,
        name :"Chaussures femmes",
        icon : "https://gd2.alicdn.com/imgextra/i2/1801150033/O1CN017c5YwG1C79jsYKRSJ_!!1801150033.jpg"
      },

      {
        id:3,
        name :"Chaussures hommes",
        icon : "https://gd2.alicdn.com/imgextra/i4/908917702/O1CN01mdIcBm26lZ6FXAr7Z_!!908917702.jpg"
      },

      {
        id:4,
        name :"Vetements femmes",
        icon : "http://data.otcommerce.com/public/catalog/picture/odezda/zhenskaja-odezhda.png"
      },

      {
        id:7,
        name :"Vetements hommes",
        icon : "https://gd4.alicdn.com/imgextra/i1/819664453/O1CN01dcRzly1ilWGgh4H6T_!!819664453.jpg"
      },

    ]
  },
  {
    id:11,
    title: 'Vêtements pour hommes',
    sub: []
  },
  {
    id:12,
    title: 'Vêtements pour enfants',
    sub: []
  },
  {
    id:13,
    title: 'Vêtements pour nouveau-nés',
    sub: []
  },
  {
    id:14,
    title: 'Tenue de sport',
    sub: []
  },

  {
    id:15,
    title: ' Sous-vêtements et vêtements pour la maison',
    sub: []
  },

  {
    id:"17",
    title: 'Vêtements pour les loisirs actifs et les voyages',
    sub: []
  },

  {
    id:16,
    title: 'Chapeaux, écharpes, gants',
    sub: []
  }

 ]

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


function SubCatView (props){

      //console.log(props);

      return(
        <View style={{flex:0.5}} >

          <TouchableOpacity style={{flex:1, backgroundColor:'white', marginTop: 10, marginBottom: 10}} onPress={() => props.navigation.navigate("CatProduct",{NameCategory: props.cat.name})}>
            
            <View style={{flexDirection: 'row', justifyContent:'center'}}>         
              <Image  style={{width:50, paddingLeft:0, height:50,borderTopLeftRadius:5,borderTopRightRadius:5}}  source={{uri:props.cat.icon}} />
            </View >              
            
            <View style={{flexDirection: 'row',  justifyContent:'center'}}>
                <Text numberOfLines={3} style={{marginBottom: 10, textAlign:'center', padding:10,paddingBottom:0,fontSize:12}}>
                  {props.cat.name}
                </Text>
            </View>
          </TouchableOpacity> 
          </View>
    )
}



export default function CategoryScreen({navigation}) {

	  const [isLoaded,setIsLoaded] = useState(false);
	  const [categories,setCategory] = useState([]);
    const [activeCat,setActiveCat] = useState(list[0]);


        
    function navigate(page) {
      //  props.navigation.navigate(page)
    }


    React.useLayoutEffect(() => {

     navigation.setOptions({
        
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },

         
      });

        setTimeout(() => {
          setIsLoaded(true);
       }, 1000);
        

  	}, [navigation]);


    function gotoSubCategory(IdCat){
        navigation.navigate('Subcategory', {
            IdCategory: IdCat,
        });
    }


    function clickCategory(cat){
        setActiveCat(cat);
       // console.log(cat.sub)
    }


	  return (

      <View style={{flex:1}}>

        <View>
          <StatusBar translucent backgroundColor="#333" />
        </View>
  			
  			{

  				isLoaded ? 

            <View style={{flex:1, flexDirection:'row'}}>

              <View style={{flex:4, backgroundColor: '#fafafa', }}>


                <ScrollView>
                   {
                      list.map((item, i) => (
                        <ListItem bottomDivider containerStyle={item.title==activeCat.title ? styles.activeCat : styles.noActiveCat } key={i}  onPress={() => clickCategory(item)}>
                          <ListItem.Content >
                            <ListItem.Title style={item.title==activeCat.title ? styles.activeCatText : styles.noActiveCatText}>{item.title}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))
                    }
                </ScrollView>
                  
              </View>

              <View style={{flex:7, backgroundColor:'white'}}>

                <FlatList
                  numColumns={2}                  // set number of columns 
                  columnWrapperStyle={{ flex: 1,backgroundColor:'white'}}  // space them out evenly
                  data={activeCat.sub}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={(item) => 
                   <SubCatView  cat={item.item} navigation={navigation} />
                  }
                  onEndReachedThreshold={1200}
                />

              </View>

            </View>
  				
  				:
  				    <View style={{flex:1,backgroundColor:'white'}}>
  					    <View style={styles.loadingCover}>
  					            <ActivityIndicator
  					               color='#e67e00'
  					               size='large' />
  					      		   <Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement, veuillez patienter ...</Text>
  					        
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

    activeCat: {
      backgroundColor:'white',
      color:'black'
    },

    noActiveCat: {
      backgroundColor:'#fafafa',
      color:'red'
    },

    activeCatText: {
      
      color:'black',
      fontSize:12
    },

    noActiveCatText: {
      color:'gray',
      fontSize:12
    }
})