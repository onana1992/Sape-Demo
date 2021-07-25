import React, { useState } from 'react';
import { View, StatusBar,Alert, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
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
import {connect } from 'react-redux';


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



function displayFavoritesProduct(favoritesProduct,product) {

    if (favoritesProduct.findIndex(item => item.Id === product.Id) !== -1) {

      
        return true
    }
    else{

      
      return false
    }
}


function toggleFavoritesProduct(props) {

    props.removeFavoris(props);

    /*const action = { type: "TOGGLE_FAVORITE", value: props.article.item }
    props.dispatch(action)*/

}


function ProductCard2 (props){
  
      return(

        <View style={{flex:1}} >
          <TouchableOpacity style={styles.main_container}  onPress={() => props.navigation.navigate("Produit",{item: props.article.item.Id})}>
            
            <View style={{ flexDirection:'row', marginBottom:10}}>

                <View style={{ flex:2}}>
                  <Image style={{width: '100%', paddingLeft:0,height:140}}  source={{uri:props.article.item.MainPictureUrl}} />
                </View>

                <View style={{ flex:3}}>

                  <View style={{flexDirection: 'row'}}>
                    <Text numberOfLines={2} style={{marginBottom: 10, padding:10,paddingBottom:0, paddingTop:0, fontSize:12, color:'black'}}>
                      {props.article.item.Title}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text  style={{marginBottom: -10, marginBottom: 20, padding:10, paddingBottom:0,paddingTop:0,fontSize:16,fontWeight:'bold'}}>
                      {/*{props.article.item.Price.OriginalPrice * 100} FCFA*/}
                      10.000 FCFA
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', }}>

                    <View style={{flex:3}}>
                      <Text style={{marginBottom: 10, padding:10, fontSize:10, paddingTop:0, color:'#06B4FF'}}>
                       
                      </Text>
                    </View>

                    <View style={{flex:1, marginTop:10, marginRight:20}}>

                      {
                        displayFavoritesProduct(props.favoritesProduct,props.article.item)?
                        <TouchableOpacity onPress={() => toggleFavoritesProduct(props)}>
                          <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
                            <FontAwesome style={{flex:1}} name={'heart'} size={24} color="#e67e00"/>
                          </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => toggleFavoritesProduct(props)}>
                          <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
                            <FontAwesome style={{flex:1}} name={'heart-o'} size={24} color="#e67e00
                            "/>
                          </Text>
                        </TouchableOpacity>
                      }

                      {/*<Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
                        <FontAwesome style={{flex:1}} name={'heart-o'} size={24} color="gray"/>
                      </Text>*/
                      }
                    </View>
                    
                  </View>

                </View>

            </View>


           
          </TouchableOpacity>
          </View>
    )
}



function FavorisProduitScreen({ route,navigation, favoritesProduct, favoritesProductsNumber,dispatch }) {

  const [isLoaded,setIsLoaded] = useState(false);

    React.useLayoutEffect(() => {

      setTimeout(() => {
            setIsLoaded(true);
      }, 1000);
    }, [navigation]);


    const removeFavoris = (props) =>
      Alert.alert(
        "",
        "Voulez-vous  retirer cet article des favoris?",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Oui", onPress: () => {

              const action = { type: "TOGGLE_FAVORITE", value: props.article.item }
              props.dispatch(action)
          } }
        ]
    );

	
  return (
    
    <View style={{flex:1,backgroundColor:'white'}}>

      <View>
          <StatusBar translucent backgroundColor="#333" />
      </View>
      
      {

        isLoaded ? 

        <View style={styles.main_container}>
            <FlatList
              style={{marginTop:10}}
              numColumns={1}                 
              data={favoritesProduct}
              keyExtractor={(item) => item.Id.toString()}
              renderItem={(item) =>  
                 <ProductCard2 article={item} navigation={navigation} dispatch={dispatch} favoritesProduct={favoritesProduct}
                 removeFavoris={removeFavoris} />
              }
           />
        </View>
        :
        <View style={{flex:1,backgroundColor:'white'}}>
              <View style={styles.loadingCover}>
                  <ActivityIndicator
                      color='##06B4FF'
                      size='large' />
                    <Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement,veuillez patienter  ...</Text>
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
      backgroundColor:'white'
  	},


})


const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    
  }
}

export default connect(mapStateToProps)(FavorisProduitScreen) ;