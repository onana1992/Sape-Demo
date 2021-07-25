import React, { useState } from 'react';
import { View, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Card, ListItem, Button, Icon,Header } from 'react-native-elements';
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
import {getCategorieInfo } from '../API/OTAPI';
import {getProducts } from '../API/OTAPI';
import {getproductsBylist } from '../API/OTAPI';
import {connect } from 'react-redux';
//import products from '../product.json';
import  { Avatar, Badge, withBadge } from 'react-native-elements';
import  BadgeScreen from './BadgeScreen';
import  dataProduct from '../Helpers/itembyBrand.json';



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
                    <FontAwesome style={{flex:1}} name={'heart-o'} size={18} color="#e67e00"/>
                  </Text>
                </View>

                <View style={{flex:1, }}>
                  <Text style={{ marginBottom: 10, padding:5, fontSize:10, paddingTop:0}}>
                    <FontAwesome style={{flex:1}} name={'share'} size={18} color="#e67e00"/>
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



function MarqueScreen({ route,navigation, favoritesProduct,user, favoritesProductsNumber,dispatch }) {


	const [isLoaded,setIsLoaded] = useState(false);
  const [isReLoaded,setIsReLoaded] = useState(false);
  const [products,setProduct] = useState([]);
  const [framePosition,setFramePosition] = useState(0);
  const [number,setNumber] = useState([]);
  const idBrand = route.params.IdBrand;
  const nomBrand = route.params.NameBrand;
  const [orderby,setOrderby] = useState("Popularity:Desc");
  const [visibleModal,setVisibleModal] = useState(false);
  var frameSize = "10";






  React.useLayoutEffect(() => {
    

      navigation.setOptions({
          // in your app, extract the arrow function into a separate component
           // to avoid creating a new one every time
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },

          title: nomBrand,
          headerRight: () => (
             <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center', marginRight:0}}>
                  <View style={{ flex:1,marginHorizontal: 5, marginRight:10}} >
                    <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
                        <FontAwesome  name="heart-o" size={26} color="#4C4C4C"/>
                        <BadgeScreen/>
                    </TouchableOpacity>
                  </View>
            </View>
          ),
      });

      setTimeout(() => {
          setIsLoaded(true);
          setProduct(dataProduct.Result.Items.Content.slice(0, 20));
      }, 2000);


      /*getProductByBrands(idBrand,orderby,framePosition,frameSize).then(data => {
          setNumber(data.Result.Items.TotalCount);
          setProduct(data.Result.Items.Content);
         // console.log(data.Result.Items.Content);
          setIsLoaded(true);
          var position=framePosition+1;
          setFramePosition(position);  
      })*/


  }, [navigation]);

  

function extractProductlist(page,size){

          if(Math.abs(productlist.length - page*size) >=size){
            var limit = size;
            console.log(limit);
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


function loadProducts() {

  //console.log(products.length)

 if(dataProduct.Result.Items.Content.length != products.length) {

   setTimeout(() => {
          setIsReLoaded(true); 
           setProduct([...products,...dataProduct.Result.Items.Content.slice(20, 40)]);
       }, 2000);
   setIsReLoaded(false); 
 }


      
   /* if(page*pageSize < number){
      
        setIsReLoaded(false);
        getproductsBylist(extractProductlist(page,pageSize)).then(data => {
              setProduct([...products,...data.OtapiItemInfoList.Content]);
              setPage(page+1);
             setIsReLoaded(true);      
       
        })  
   }*/

     
              
}


/*function loadProducts(actionAfter) {

    setIsReLoaded(false);
    getProductByBrands(idBrand,orderby,10*framePosition,frameSize).then(data => {
    setProduct([...products,...data.Result.Items.Content]);
    var position = framePosition+1 ;
    setFramePosition(position);
    setIsReLoaded(true);  
          
    })     
}


*/

   
return (

    <View style={styles.main_container}>
      
      {

        isLoaded ? 

         <View style={{marginBottom:20}} >

          
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

                    <View style={{flex:1,marginTop:20,marginBottom:20}}>
                        <Text style={{fontSize:20, textAlign:'center'}}> {nomBrand}  </Text>
                        <Text style={{fontSize:12, textAlign:'center', color:'gray'}}> {dataProduct.Result.Items.Content.length} articles trouvés</Text>
                    </View>

                  }

                  numColumns={1}                  // set number of columns 
                  //columnWrapperStyle={{ flex: 1}}  // space them out evenly
                  data={products}
                  keyExtractor={(item) => item.Id.toString()}
                  renderItem={(item) =>  
                     <ProductCard2 article={item} navigation={navigation} dispatch={dispatch} user={user} favoritesProduct={favoritesProduct}/>
                  }
                  onEndReachedThreshold={1}
                  onEndReached={() => {
                      loadProducts()
                     
                  }}

                ListFooterComponent={
                    !isReLoaded &&
                    <View style={{flex:1,backgroundColor:'white',marginBottom:40,marginTop:10}}>
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
    user:state.user
  }
}

export default connect(mapStateToProps)(MarqueScreen);

