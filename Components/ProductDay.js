import React, { useState } from 'react';
import { View,LogBox, TextInput,StatusBar,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import TextTicker from 'react-native-text-ticker';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import { SwipeablePanel } from 'rn-swipeable-panel';
import VideoPan from './VideoPan';
import dataReplays from '../data.json';
import dataAccueil from '../dataAccueil.json';
//import brands from '../brand.json';
import NewsModal from './NewsModal';
import ReplayModal from './NewsModal';
import { YellowBox } from 'react-native';
import {getAllBrands} from '../API/OTAPI';
import SnapCarousel from 'react-native-snap-carousel';
import {getProducts} from '../API/OTAPI';
import CatProduitsScreen from '../Components/CatProduits';
import MarqueScreen from '../Components/Marque';
import ProductScreen from '../Components/Product';
import { SliderBox } from "react-native-image-slider-box";
import {getproductsBylist } from '../API/OTAPI';
import dataProduct from '../Helpers/GetItemInfoList2.json';
import {connect } from 'react-redux';
import BadgeScreen from './BadgeScreen';
import PushNotification from 'react-native-push-notification';



const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;
const list = [0,1,2,3,4,5,6,7,8,9]
var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=true
const loop =true
const videoWidth=200;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var openswipeableActu= false;





function ProductCard1 (props) {

//console.log(props.article.item.Id);

    return(

        <View style={{flex:0.33}} >
          <TouchableOpacity style={styles.main_container} onPress={() => props.navigation.navigate("Produit",{item: props.article.item})}>
            <Card containerStyle={{padding:0,margin:2,marginBottom:5, borderRadius:2 }} onPress={() => console.log("clikef allright")} >
       
              <Image resizeMode="contain"  style={{width: '100%', paddingLeft:0, height:90,borderTopLeftRadius:5,borderTopRightRadius:5}}  source={{uri:props.article.item.MainPictureUrl}} />
               
              <View style={{flex: 1}}>           
                <View style={{flexDirection: 'row', height:60}}>
                  <Text numberOfLines={3} style={{marginBottom: 10, padding:10,paddingBottom:0,fontSize:10}}>
                    {props.article.item.Title}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text  style={{marginBottom: -10, marginBottom: 10, padding:10,paddingBottom:0,fontSize:12, fontWeight:'bold'}}>
                    {Math.floor(props.article.item.Price.OriginalPrice) * 100} FCFA
                  </Text>
                </View>
              </View>

              </Card>
          </TouchableOpacity>
        </View>
    )
}




function ProductDay({route,navigation, favoritesProduct,cartProduct,user,activeTab,dispatch}) {


	
	const [isLoaded,setIsLoaded] = useState(false);
	const idCategory = "otc-214";
  	const [orderby,setOrderby] = useState("Default");
  	const [framePosition,setFramePosition] = useState(0);
  	const [number,setNumber] = useState([]);
  	var   frameSize = "9";
  	const [products,setProduct] = useState([]);
  	const [isReLoaded,setIsReLoaded] = useState(false);
  	const [page,setPage] = useState(0);
  	const pageSize = 27;

  

  	var  productlist = ["635938342766","640898196081", "642162982369", "619772312228", "636727088145","640147921818", "613058471229","592355788659", "626565589119"
  	,"633239811439", "627144191775","626857830067","646165221190", "626592805556", "629434196189","590572161744","626498904152","604885868062","643216507463", 
  	"590323264742", "643266102704","641819209273","629709676017","541894227429","614325030920", "571777181998","588008634675"];
  
	   function goTofavorite(){

	      if (user!=null) {
	       navigation.navigate('Favoris')
	      }
	      else{

	        navigation.navigate('Connexion')
	      }
	  }

  	

	

	




	function extractProductlist(page,size){

          if(Math.abs(productlist.length - page*size) >=size){
            var limit = size;
           // console.log(limit);
          }
          else{
            var limit = Math.abs(productlist.length - page*size);
            console.log(limit);
          }

          var list= "";
          for (var i = page*size ; i < page*size + limit ; i++) {

              if(list == ""){

                list = productlist[i];

              }
              else{

                list = list +";"+productlist[i];
              }

              //console.log(list);
          }
         
          return list;
    }





     function navigate(page) {
      navigation.navigate(page)
    }


    React.useLayoutEffect(() => {

    	

    	navigation.setOptions({
      	
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          //  height: 10,

          },

         
    	});

    	 



    	 setTimeout(() => {
          setIsLoaded(true);
          setProduct(dataProduct.OtapiItemInfoList.Content);
          setProduct(dataProduct.OtapiItemInfoList.Content.slice(0, 21));
         }, 1000);

    

  	}, []);

  	function loadProducts() {

  		//console.log(products.length)

		 if(dataProduct.OtapiItemInfoList.Content.length != products.length) {

		   setTimeout(() => {
		          setIsReLoaded(true); 
		           setProduct([...products,...dataProduct.OtapiItemInfoList.Content.slice(21, 28)]);
		       }, 1000);
		    setIsReLoaded(false); 
		 }
	}
  

	return (

        <View style={{flex:1,height: Dimensions.get('window').height + StatusBar.currentHeight,}}>

        	<View>
        		<StatusBar translucent backgroundColor="#333" />
        	</View>
			
			{

				isLoaded ? 
				<View style={{backgroundColor:'white'}}>
					
					<FlatList


						ListHeaderComponent={

		                    <View style={{flex:1,marginTop:20,marginBottom:20}}>
		                        <Text style={{fontSize:20, textAlign:'center'}}> selection du jour </Text>
		                        <Text style={{fontSize:12, textAlign:'center', color:'gray'}}> 30 articles trouvés</Text>
		                    </View>

                  		}
		            
		                numColumns={3}                  // set number of columns 
		                columnWrapperStyle={{ flex: 1,backgroundColor:'white'}}  // space them out evenly
		                data={products}
		                keyExtractor={(item) => item.Id.toString()}
		                renderItem={(item) =>  
		                   <ProductCard1 article={item} navigation={navigation}/>
		                } 

		                onEndReachedThreshold={0.5}
		                onEndReached={() => {
		                     loadProducts();
		                   
		                }}

		               ListFooterComponent={
		                    !isReLoaded &&
		                    <View style={{flex:1,marginBottom:10,marginTop:2}}>
		                      <View style={styles.loadingCover}>
		                              <ActivityIndicator
		                                 color='#e67e00'
		                                 size='large' />
		                               <Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement,veuillez patienter ...</Text>
		                          
		                       </View>
		                    </View>
                		}

               

                 />
				</View>

			       
				:
				    <View style={{flex:1,backgroundColor:'white'}}>
					    <View style={styles.loadingCover}>
					        <ActivityIndicator
					               color='#e67e00'
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
  		backgroundColor:'#f2f2f2',
  	},

 
   loadingCover: {
  		flex:1,
  		justifyContent: 'center',
  		alignItems: 'center', 
  	},


})


const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    cartProduct: state.cartProduct,
    activeTab: state.activeTab,
    user: state.user,
    
  }
}

export default connect(mapStateToProps)(ProductDay);