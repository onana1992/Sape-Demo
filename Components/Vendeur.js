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
import { getProducts } from '../API/OTAPI';
import {getProductBySeller} from '../API/OTAPI';
import {connect } from 'react-redux';
import  BadgeScreen from './BadgeScreen';
import  dataProduct from '../Helpers/seller1.json';


var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=true
const loop =true
const videoWidth=200;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var openswipeableActu= false;





 function ProductCard1 (props){

      return(
        <View style={{flex:0.5}} >
          <TouchableOpacity style={styles.main_container} onPress={() => props.navigation.navigate("modal",{item: props.article.MainPictureUrl})}>
            <Card containerStyle={{padding:0,margin:2,marginBottom:5, borderRadius:0 }} onPress={() => console.log("clikef allright")} >
                     
              <Card.Image resizeMode="contain"  style={{width: '100%', paddingLeft:0,height:170,borderTopLeftRadius:5,borderTopRightRadius:5}}  source={{uri:props.article.item.MainPictureUrl}} />
               
              <View style={{flex: 1}}>           
                <View style={{flexDirection: 'row'}}>
                  <Text numberOfLines={2} style={{marginBottom: 10, padding:10,paddingBottom:0,fontSize:12}}>
                    {props.article.item.Title}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text  style={{marginBottom: -10, marginBottom: 10, padding:10,paddingBottom:0,fontSize:14,fontWeight:'bold'}}>
                    {props.article.item.Price.OriginalPrice * 100} FCFA
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>

                <View style={{flex:3}}>
                  <Text style={{marginBottom: 10, padding:10, fontSize:10, paddingTop:0, color:'#06B4FF'}}>
                   
                  </Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5}}>
                    <FontAwesome style={{flex:1}} name={'heart-o'} size={18} color="gray"/>
                  </Text>
                </View>

                <View style={{flex:1, }}>
                  <Text style={{ marginBottom: 10, padding:5, fontSize:10, paddingTop:0}}>
                    <FontAwesome style={{flex:1}} name={'share'} size={18} color="gray"/>
                  </Text>
                </View>
              </View>
              </Card>
          </TouchableOpacity>
          </View>
    )
}


function ProductCard2 (props){

  
      return(

        <View style={{flex:1}} >
          <TouchableOpacity style={styles.main_container}  onPress={() => props.navigation.navigate("Produit",{item: props.article.item})}>
            
            <View style={{ flexDirection:'row', marginBottom:10}}>

                <View style={{ flex:2}}>
                  <Image style={{width: '100%', paddingLeft:0,height:140}}  source={{uri:props.article.item.MainPictureUrl}} />
                </View>

                <View style={{ flex:4}}>

                  <View style={{flexDirection: 'row'}}>
                    <Text numberOfLines={2} style={{marginBottom: 10, padding:10,paddingBottom:0, paddingTop:0, fontSize:12, color:'black'}}>
                      {props.article.item.Title}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text  style={{marginBottom: -10, marginBottom: 20, padding:10, paddingBottom:0,paddingTop:0,fontSize:16,fontWeight:'bold'}}>
                      {props.article.item.Price.OriginalPrice * 100} FCFA
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
                            <FontAwesome style={{flex:1}} name={'heart-o'} size={24} color="#e67e00"/>
                          </Text>
                        </TouchableOpacity>
                      }

                    </View>
                  </View>

                </View>

            </View>
          </TouchableOpacity>
          </View>
    )
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
  
   if(props.user!=null){
      const action = { type: "TOGGLE_FAVORITE", value: props.article.item }
      props.dispatch(action)
    }
    else{
      props.navigation.navigate("Connexion");
    }

}




 function VendeurScreen({ route,navigation, favoritesProduct, user, favoritesProductsNumber,dispatch }) {


	const [isLoaded,setIsLoaded] = useState(false);
  const [isReLoaded,setIsReLoaded] = useState(false);
  const [products,setProduct] = useState([]);
  const [framePosition,setFramePosition] = useState(0);
  const [number,setNumber] = useState([]);
  const idVendor = route.params.vendeur.Id;
  //const nomBrand = route.params.NameBrand;
  const infoVendor = route.params.vendeur; 
  const [orderby,setOrderby] = useState("Popularity:Desc");
  const [visibleModal,setVisibleModal] = useState(false);
  //Popularity:Desc, Price:Asc, Price:Desc,
  //var framePosition=0;
  
  var frameSize = "40";


	

  React.useLayoutEffect(() => {
    
    console.log(infoVendor.ShopName);

    navigation.setOptions({
        		// in your app, extract the arrow function into a separate component
       		  // to avoid creating a new one every time
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0
            },
            title: infoVendor.ShopName,
        		headerRight: () => (
             <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center', marginRight:0}}>

                  <View style={{ flex:1,marginHorizontal: 5, marginRight:10}} >

                    <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
                        <FontAwesome  name="heart-o" size={26} color="#4C4C4C"/>
                        <BadgeScreen/>

                        {/*<Badge
                           status="primary"
                           value={favoritesProduct.length}
                           containerStyle={{ position: 'absolute', fontSize:10, top: -6, right: -12, color:'#4C4C4C',width:30  }}
                        />*/}
                    </TouchableOpacity>

                  </View>
            </View>
          ),
    });

       
    setTimeout(() => {
      
      setNumber(dataProduct.Result.Items.TotalCount);
      setProduct(dataProduct.Result.Items.Content);
      setIsLoaded(true);
    }, 3000);

  /*getProductBySeller(idVendor,orderby,framePosition,frameSize).then(data => {
          setNumber(data.Result.Items.TotalCount);
          setProduct(data.Result.Items.Content);
         // console.log(data.Result.Items.Content);
          setIsLoaded(true);
          var position=framePosition+1;
          setFramePosition(position);  
  })*/


  }, [navigation]);

  

  /*function loadProducts(actionAfter) {

      setIsReLoaded(false);
      getProductBySeller(idVendor,orderby,10*framePosition,frameSize).then(data => {
      setProduct([...products,...data.Result.Items.Content]);
      var position = framePosition+1 ;
      setFramePosition(position);
      setIsReLoaded(true);  
            
      })     
  }*/

    
 

	return (

    <View style={{flex:1}}>
			
			{

				isLoaded ? 
        
			      <View >
              
              <View style={{ flexDirection:'row',height:35,alignItems: 'center', borderColor:'gray', justifyContent: 'center',backgroundColor: 'white'}}>
                  
                  <View style={{flex:5, borderRightWidth: 1, borderColor: "gray"}}>
                    <Text style={{fontSize:14,color:'gray',textAlign:'center'}}> 
                    <FontAwesome style={{marginRight:10}} name="filter" size={20} color="gray" /> Filtrer </Text>
                  </View>

                  <View style={{flex:5, borderRightWidth: 1, borderColor: "gray"}} >
                    <TouchableOpacity  onPress={() => showModal() }>
                    <Text style={{fontSize:14,color:'gray',textAlign:'center'}}> 
                    <FontAwesome style={{marginRight:10}} name="exchange" size={18} color="gray" /> Popularité </Text>
                    </TouchableOpacity>
                  </View>   

                  <View style={{flex:2,alignItems:'center'}}>
                     <Ionicons name="menu-outline" size={20} color="gray" /> 
                  </View>
              </View>



             <FlatList
                
                ListHeaderComponent={

                  /*<View style={{flex:1,marginTop:20,marginBottom:20}}>
                      <Text style={{fontSize:20, textAlign:'center'}}> {infoVendor.ShopName} </Text>
                      <Text style={{fontSize:12, textAlign:'center', color:'gray'}}> {number} produits trouvés</Text>
                  </View>*/

                  <Card containerStyle={{ padding:0,margin:0,marginBottom:5,marginTop:10,}}>

                    <View style={{height: 40,flexDirection: 'row', }}>
                      <View style={{flex:1}}>
                        <Text style={{fontWeight:'bold', color:'#06B4FF', fontSize:16, textAlign:'center',marginTop:10}}>{infoVendor.ShopName}</Text>
                      </View>
                    </View>

                    <View style={{height:40,flexDirection: 'row',marginTop:10 }}>
                      <View style={{flex:1, textAlign:'center', fontWeight:'bold',padding:5}}>
                        <Text>Score livraison</Text>
                        <Text style={{textAlign:'center',fontWeight:'bold'}}>{infoVendor.Scores.DeliveryScore}/5</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={{textAlign:'center'}}>  Score articles</Text>
                        <Text style={{textAlign:'center',fontWeight:'bold'}}> {infoVendor.Scores.ItemScore}/5</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={{textAlign:'center'}}> Score service</Text>
                        <Text style={{textAlign:'center',fontWeight:'bold'}}>{infoVendor.Scores.ServiceScore}/5</Text>
                      </View>

                    </View>

                    <View style={{height:10,flexDirection: 'row',marginBottom: 10,marginTop: 10  }}>

                    </View>
                  </Card>

                }

                /*numColumns={2} */                 // set number of columns 
                /*columnWrapperStyle={{ flex: 1,backgroundColor:'white'}} */ // space them out evenly
                data={products}
                keyExtractor={(item) => item.Id}
                renderItem={(item) =>  
                   <ProductCard2  article={item} navigation={navigation} dispatch={dispatch} user={user} favoritesProduct={favoritesProduct}/>
                }
               /* onEndReachedThreshold={0.5}
                onEndReached={() => {
                    // loadProducts()
                   
                }}*/

                ListFooterComponent={
                    
                    <View style={{flex:1,backgroundColor:'white',marginBottom:10,marginTop:20}}>
                      
                    </View>
                }

              />
				    </View>
				:
				    <View style={{flex:1,backgroundColor:'white'}}>
					    <View style={styles.loadingCover}>
					            <ActivityIndicator
					               color='#3498db'
					               size='large' />
					      		   <Text style={{marginTop:20,color:'gray',fontSize:12,}}>Chargement,veuillez patienter ...</Text>
				       </View>
			      </View>
			}
		
		</View>
  	);

}


const styles = StyleSheet.create({
  	main_container: {
  		flex:1,
  		backgroundColor:'#fff',
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
    user:state.user,
  }
}

export default connect(mapStateToProps)(VendeurScreen) ;