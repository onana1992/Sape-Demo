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
 

const images = [
    "http://xxx.com/1.png",
    "http://xxx.com/2.png",
    "http://xxx.com/3.png"
];

const brands =[
	{
		Id: 0,
		Name : "ot:35993",
		PictureUrl:require("../assets/Images/brand1.jpg"),

		
	},
	{
		Id: "ot:35995",
		Name : "ANNE KLEIN",
		PictureUrl:require("../assets/Images/brand2.jpg"),
	},

	{
		Id: "ot:34659",
		Name : "Armani",
		PictureUrl:require("../assets/Images/brand3.jpg"),
	},

	{
		Id: "ot:34646",
		Name : "Burberry",
		PictureUrl:require("../assets/Images/brand4.jpg"),
	},

	{
		Id: "ot:34643",
		Name :"Bershka",
		PictureUrl:require("../assets/Images/brand5.jpg"),
	},

	{
		Id: "ot:34700",
		Name : "BOSS Hugo Boss",
		PictureUrl:require("../assets/Images/brand6.jpg"),

	},

	{
		Id: "ot:34654",
		Name : "Bvlgari",
		PictureUrl:require("../assets/Images/brand7.jpg"),

	},

	{
		Id: "ot:34654",
		Name : "Calvin Klein",
		PictureUrl: require("../assets/Images/brand8.jpg"),

	}
	
]


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




function CategoryCard (props) {

	return(

		<View style={{flex:1}} >
			<TouchableOpacity  onPress={() => props.navigation.navigate("modal",{item: props.article.item})}>
				<Card containerStyle={{padding:0,margin:5,marginBottom:5, borderRadius:5 }} onPress={() => console.log("clikef allright")} >
					<Card.Image resizeMode="contain"   style={{width:'100%',paddingLeft:0,height:60}}  source={{uri:props.imageUrl}} />
						<View style={{flexDirection: 'row',textAlign:'center'}}>
							<Text numberOfLines={2} style={{marginBottom: 10, height:40, padding:10,paddingBottom:0,fontSize:10,textAlign:'center'}}>
									{props.Name}
							</Text>
						</View>
				</Card>
			</TouchableOpacity>
		</View>
	)
}


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




function AccueilScreen({route,navigation, favoritesProduct,cartProduct,user,activeTab,dispatch}) {


	const [images,setImages] = useState([
		require('../assets/Images/beauty.jpg') ,
		require('../assets/Images/fitness.jpg') ,
		require('../assets/Images/baby.jpg') 
    ]);

   //  console.log(props);

	
	const [isLoaded,setIsLoaded] = useState(false);
	//const [brands,setBrands] = useState([]);
	const idCategory = "otc-214";
  	const [orderby,setOrderby] = useState("Default");
  	const [framePosition,setFramePosition] = useState(0);
  	const [number,setNumber] = useState([]);
  	var   frameSize = "9";
  	const [products,setProduct] = useState([]);
  	const [token,setToken] = useState("gggg");
  	const [isReLoaded,setIsReLoaded] = useState(false);

  	const [page,setPage] = useState(0);
  	const pageSize = 27  ;
const pageSize2 = 27  ;
  

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

  	/*function loadProducts(actionAfter) {v

	    setIsReLoaded(false);
	    getProducts(idCategory,orderby,9*framePosition,frameSize).then(data => {
	    setProduct([...products,...data.OtapiItemInfoSubList.Content]);
	    var position=framePosition+1;
	    setFramePosition(position);
	    setIsReLoaded(true);
	    })     
	}*/

	

	function BrandCard ({item, index}){

		var url = item.PictureUrl;
		//console.log(item.PictureUrl)

		return(
			<TouchableOpacity style={{backgroundColor:'white'}} onPress={() =>  navigation.navigate('Marque', {
	            IdBrand: item.Id, NameBrand:item.Name})}
			>
			    <View style={{padding:5}}>
					<Image style={{width:60 ,height:60}}  source={item.PictureUrl}/>
				</View>
			</TouchableOpacity>
		)
	}

//source={require('../assets/Images/icon.png')}


	const onShare = async (token) => {

		console.log(token);

		try {
	      
		    const result = await Share.share({
		        message: token
		          
			});

			if (result.action === Share.sharedAction) {
		        if (result.activityType) {
		          // shared with activity type of result.activityType
		        } else {
		          // shared
		        }
		    } else if (result.action === Share.dismissedAction) {
		        // dismissed
		      }
		    } catch (error) {
	      alert(error.message);
	    }
	};




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

    	var mytoken="";

    	LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    	LogBox.ignoreLogs(['componentWillReceiveProps : `useNativeDriver`']);

    	PushNotification.configure({

	      // (optional) Called when Token is generated (iOS and Android)
	      onRegister: function(token) {
	      	//setToken(token.token);
	      	mytoken=token.token;
	        console.log(token.token);
	        
	      },

	      // (required) Called when a remote or local notification is opened or received
	      onNotification: function(notification) {

	      	 var item=JSON.parse(notification.data.item);

	      	  navigation.navigate("ProductDay");
	         //navigation.navigate("newsModal",{item: item})

	        // console.log('REMOTE NOTIFICATION 444 ==>', item.date)// process the notification here
	      },

	      // Android only: GCM or FCM Sender ID
	      senderID: '155822165138',
	      popInitialNotification: true,
	      requestPermissions: true

	    })

    	navigation.setOptions({
      	
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          //  height: 10,

          },

         
    	});

    	 const unsubscribe = navigation.addListener('focus', () => {
        
	         const action = { type: "SET_TAB", value: "accueil" }
	         dispatch(action)
      
      	});


    	 navigation.setOptions({

	        headerRight: () => (
	           
		            <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center', marginRight:0}}>

		                  {/*<View style={{ flex:1,marginHorizontal: 5, }} >

		                    <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
		                        <Ionicons name="ios-search-outline" size={28} color="#4C4C4C"  />
		                    </TouchableOpacity>

		                  </View>*/}

		                  <View style={{ flex:1,marginHorizontal: 5,}} >
		                    <TouchableOpacity onPress={() => goTofavorite()}>
		                        <FontAwesome  name="heart-o" size={24} color="#4C4C4C"/>
		                        <BadgeScreen/>
		                    </TouchableOpacity>
		                  </View>

		                 
		                  <View style={{}}>
		                    <OverflowMenu
		                      OverflowIcon={<Feather name="more-vertical" size={23} color="#4C4C4C"/>}>
		                        <HiddenItem title="Fermer l'application" onPress={() => exitApp()} />
		                        <HiddenItem title="Partager l'application" onPress={() => onShare(mytoken)} />
		                    </OverflowMenu>
		                  </View>
		            </View>
		      ),

      });

    	

    	
    	/*navigation.setOptions({
      		// in your app, extract the arrow function into a separate component
     		// to avoid creating a new one every time
      		headerRight: () => (
        		<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
	          		<Item title="search" iconName="search" onPress={() => alert('search')} />
	          		
	          		<OverflowMenu
            			style={{ marginHorizontal: 10 }}
            			OverflowIcon={<Ionicons name="heart" size={23} color="white"/>}
          			>
            			<HiddenItem title="Produits favoris" onPress={() => alert('hidden1')} />
            			<HiddenItem title="Boutiques favories" onPress={() => alert('hidden1')} />
          			</OverflowMenu>	
		        </HeaderButtons>
        	),
    	});*/

    	getAllBrands().then(data => {
    		//setBrands(data.BrandInfoList.Content);
    		//console.log (data);
	        //setIsLoaded(true);
       })

 

    	/*getProducts(idCategory,orderby,framePosition,frameSize).then(data => {
	      	//console.log(data.OtapiItemInfoSubList.Content[0].I);
	        setNumber(data.OtapiItemInfoSubList.TotalCount);
	        setProduct(data.OtapiItemInfoSubList.Content);
	        var position=framePosition+1;
	        setFramePosition(position);
	        setIsLoaded(true);
          
    	})*/

    	 setTimeout(() => {
          setIsLoaded(true);
          setProduct(dataProduct.OtapiItemInfoList.Content);
          setProduct(dataProduct.OtapiItemInfoList.Content.slice(0, 21));
         }, 1000);

    	/*getproductsBylist(extractProductlist(page,pageSize)).then(data => {
          setProduct([...products,...data.OtapiItemInfoList.Content]);
          setPage(page+1);
          setIsLoaded(true);    
   
        })*/


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
				<View>
					
					<FlatList
		                
						ListHeaderComponent={

						
			                <View style={styles.main_container}>


				                  	<View style={{ alignItems:'center', height:150}}>
						        		<SliderBox
	        	 							images= {images} 
	        	 							sliderBoxHeight={200}
	        	 							autoplay={true}
	        								circleLoop ={true}
	        	 							imageLoadingColor="#e67e00"
	        							/>
					        		</View>

					        		<View style={{ alignItems:'center', height:100, marginTop:4, backgroundColor:'white'}}>

							        	<Header
									  		placement="left"
									  		leftComponent={{ text: 'VOS MEILLEURS MARQUES', style: { color: 'black', fontWeight:'bold',fontSize:13 } }}
									  		containerStyle={{
									    		backgroundColor: 'white',
									    		paddingTop: 0,
									    		height:30,
									    		borderBottomColor:'gray'
									  		}}
										/>

										<SnapCarousel
										   	style={{marginLeft:0,backgroundColor:'white'}}
									        layout={"default"}
									        data={brands}
									        renderItem={BrandCard}
									        sliderWidth={BannerWidth}
									        itemWidth={80}
									        firstItem={1}
									        autoplay={autoplay}
										    loop={loop}
								       />
				        			</View>

				        			<View style={{ alignItems:'center', paddingTop:10, height:420, marginTop:4, backgroundColor:'white'}}>

							        	<Header
									  		placement="left"
									  		leftComponent={{ text: 'NOS CATÉGORIES FAVORIS ', style: { fontWeight:'bold',fontSize:13 } }}
									  		containerStyle={{
									    		 			backgroundColor: 'white',
									    					paddingTop: 0,
									    					height:30,
									    					//borderBottomColor:'gray',
									    					paddingBottom:10
									  		}}
										/>

										<View style={{height:390,flexDirection: 'row', }}>

											<View style={{flex:1}}>
												<CategoryCard Name="Chaussures pour femmes" imageUrl="https://gd2.alicdn.com/imgextra/i2/1801150033/O1CN017c5YwG1C79jsYKRSJ_!!1801150033.jpg"/>
												<CategoryCard Name="Vetements pour femmes" imageUrl="https://gd3.alicdn.com/imgextra/i3/86736100/O1CN01FPTYT41uvqgPybn20_!!86736100.jpg"/>
												<CategoryCard Name="Sacs pour femmes" imageUrl="https://gd2.alicdn.com/imgextra/i1/1582721683/O1CN01ehzPMn1OIrFVVA4Ny_!!1582721683.jpg"/>
											</View>

											<View style={{flex:1}}>
												<CategoryCard Name="Pérruques" imageUrl="https://gd4.alicdn.com/imgextra/i1/1070431125/O1CN0162kGJZ1KBI5OkUzYl_!!1070431125.jpg"/>
												<CategoryCard Name="Chaussures pour hommes" imageUrl="https://gd2.alicdn.com/imgextra/i4/908917702/O1CN01mdIcBm26lZ6FXAr7Z_!!908917702.jpg"/>
												<CategoryCard Name="Vetements pour homme" imageUrl="https://gd3.alicdn.com/imgextra/i3/2823948744/O1CN01uHlexT2ESnqww1ZiO_!!2823948744.jpg"/>
											</View>

											<View style={{flex:1}}>
											   	<CategoryCard Name="Bijoux et montres" imageUrl="https://gd2.alicdn.com/imgextra/i1/2207892397517/O1CN01RBBmSq25Opu3DAXGg_!!2207892397517.jpg"/>
												<CategoryCard Name="Chaussures pour enfants" imageUrl="https://gd4.alicdn.com/imgextra/i4/2414764426/TB2o_zmBuSSBuNjy0FlXXbBpVXa_!!2414764426.jpg"/>
												<CategoryCard Name="Vetements pour enfants" imageUrl="https://gd1.alicdn.com/imgextra/i1/65118812/O1CN01P028QF2Exwo8fN0Lt_!!0-item_pic.jpg"/>
											</View>

											<View style={{flex:1}}>
												<CategoryCard Name="Mèches et extensions" imageUrl="https://gd4.alicdn.com/imgextra/i4/3028715539/TB2zbJJutFopuFjSZFHXXbSlXXa_!!3028715539.jpg"/>
												<CategoryCard Name="Chaussures de sports" imageUrl="https://gd2.alicdn.com/imgextra/i2/2209666768635/O1CN01MBCib22DesiLW6J7N_!!2209666768635.jpg"/>
												<CategoryCard Name="Vetements de sport" imageUrl="https://gd1.alicdn.com/imgextra/i1/1660959143/O1CN01SseRxu2HPXuCI2NQB_!!1660959143.jpg"/>
											</View>
										</View>

			        				</View>


					        		<View style={{ alignItems:'center', height:30, marginTop:4, backgroundColor:'white'}}>
							        	<Header
									  		placement="left"
									  		leftComponent={{ text: 'ARTICLES RECOMMANDÉS', style: { color: 'black', fontWeight:'bold',fontSize:13 } }}
									  		containerStyle={{
									    		 			backgroundColor: 'white',
									    					paddingTop: 0,
									    					height:30,
									    					borderBottomColor:'gray'
									  		}}
										/>
									</View>
					        	
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

export default connect(mapStateToProps)(AccueilScreen);