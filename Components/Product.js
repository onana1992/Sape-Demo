import React, { useState } from 'react';
import { View, StatusBar, TextInput,PixelRatio ,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import TextTicker from 'react-native-text-ticker';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import { SwipeablePanel } from 'rn-swipeable-panel';
import  VideoPan from './VideoPan';
import  dataReplays from '../data.json';
import  dataAccueil from '../dataAccueil.json';
import  NewsModal from './NewsModal';
import  ReplayModal from './NewsModal';
import {getProductInfo} from '../API/OTAPI';
import {getVendorInfo} from '../API/OTAPI';
import {getProductDesc} from '../API/OTAPI';
import {connect} from 'react-redux';
import { SliderBox } from "react-native-image-slider-box";
import HTMLView from 'react-native-htmlview';
import BadgeScreen from './BadgeScreen';
import BadgeScreen1 from './BadgeScreen1';
import NumericInput from 'react-native-numeric-input'
import dataProduct1 from '../Helpers/GetItemFullInfo2.json';
import dataProduct2 from '../Helpers/GetItemFullInfo1.json';
import dataProductDescription from '../Helpers/GetItemDescription.json';
import dataVendorInfo from '../Helpers/GetVendorInfo.json';




const list = [0,1,2,3,4,5,6,7,8,9]
var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=true
const loop =true
const videoWidth=200;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var openswipeableActu= false;
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 300;
var htmlContent ="";
const { width } = Dimensions.get('window');


function Textcontrat(str,maxSize){

	if(str.length > maxSize ){
		var newStr = str.slice(0,maxSize) + "...";
		return newStr
	}
	else{
		return str
	}
}

function displayFavoritesProduct(favoritesProduct,product) {

    if (favoritesProduct.findIndex(item => item.Id === product.Id) !== -1) {

        return true
    }
    else{

      
      return false
    }
}


function Swipeable  (props) {

    // console.log(props);
    const [panelProps, setPanelProps] = useState({
       fullWidth: true,
       openLarge: true,
       showCloseButton: true,
       onClose: () => props.setSwipeableActive(false),
       onPressCloseButton: () => closePanel(),
    });


    const [isPanelActive, setIsPanelActive] = useState(false);

    const [price, setIsPrice] = useState(props.product.OtapiItemFullInfo.Price.OriginalPrice * 100);

    const [properties, setProperties]  = useState([

			{
				id:0,
				name : 'Taille',
				values: ["8 inch", "10 inch", "12 inch", "14 inch", "16 inch", "18 inch","20 inch", "22 inch", "24 inch"],
				selected : "8 inch" 
			},

			{
				id:1,
				name : 'Couleur',
				values: ["Noir", "marron"],
				selected : "Noir" 
			}

	]);

	const [selectedProperty, setSelectedProperty] = useState(properties[0].name+":"+properties[0].selected+"/"+properties[1].name+":"+properties[1].selected);


	const selectProperty =(id, newvalue)=> {
		  var index = properties.findIndex(x=> x.id === id);

		  let g = properties[index]
		  g['selected'] = newvalue
		  if (index === -1){
		    // handle error
		    console.log('no match')
		  }
		  else
		    setProperties([
		      ...properties.slice(0,index),
		      g,
		      ...properties.slice(index+1)
		    ]
		            );

		setSelectedProperty(properties[0].name+":"+properties[0].selected+"/"+properties[1].name+":"+properties[1].selected);

		if(properties[0].selected == "8 inch"){
			setIsPrice(24000)
		}
		else if(properties[0].selected == "10 inch")
		{
			setIsPrice(26000)
		}
		else if(properties[0].selected == "12 inch")
		{
			setIsPrice(28000)
		}
		else if(properties[0].selected == "14 inch")
		{
			setIsPrice(30000)
		}
		else if(properties[0].selected == "16 inch")
		{
			setIsPrice(32000)
		}
		else if(properties[0].selected == "18 inch")
		{
			setIsPrice(34000)
		}

		else if(properties[0].selected == "20 inch")
		{
			setIsPrice(36000)
		}

		else if(properties[0].selected == "22 inch")
		{
			setIsPrice(38000)
		}

		else if(properties[0].selected == "24 inch")
		{
			setIsPrice(40000)
		}


    }

	

    //setIsPanelActive(props.isActive)

    const openPanel = () => {
      setIsPanelActive(true);
       /*const action = { type: "OPEN_SWIPEABLE", value: ''}
        dispatch(action)*/
    };

    const closePanel = () => {
      setIsPanelActive(false);
      props.isActive=false;
      /*const action = { type: "CLOSE_SWIPEABLE", value: '' }
      dispatch(action)*/
    };

    const Confirm = () => {
      
      	var item =	{

          Id:props.product.OtapiItemFullInfo.Id,
          name : props.product.OtapiItemFullInfo.Title,
          imageUrl: props.product.OtapiItemFullInfo.Pictures[0].Url,
          properties : selectedProperty, 
          price : price,
          quantity: props.quantity,
       };

       // closePanel ();
        const action = { type: "ADD_CART", value: item}
        props.dispatch(action);
        props.setSwipeableActive(false)
       
    };

    return (

    	<SwipeablePanel {...panelProps} isActive={props.isActive}  style={{maxHeight:470}} >
    		<ScrollView style={{flex:1}}>
	            <View style={{minHeight:440,padding:2}}>
	             	
	            		<View style={{flex:2, flexDirection:'row',   }}>
		                	<View style={{flex:2,}}>	 
		                		<Image resizeMode="contain"  source={{ uri: props.product.OtapiItemFullInfo.Pictures[0].Url }} style={{height:100,}}  />
 							</View>
		                	<View style={{flex:4, marginTop:15}}>
		                		<Text > {props.product.OtapiItemFullInfo.Title}</Text>
		                		<Text style={{color:'gray', fontSize:12}} > selectionné: {selectedProperty}</Text>
		                		<Text style={{marginTop:10, fontWeight:'bold', fontSize:16}}> {price} FCFA</Text>
		                	 </View>
		            	</View>

		            	<View style={{flex:4,paddingLeft:10}}>
		               		{properties.map((property) => {
            					return (
            					 <View style={{flex: 1}}>
              						<Text style={{fontWeight:'bold', marginBottom:10, fontSize:12}}>Choisir la  {property.name} :</Text>
              						<View style={{flexDirection:'row', flexWrap: "wrap",}}>
              							{property.values.map((val,i) => {
		            					return (
			              					<TouchableOpacity key={i} onPress={() => selectProperty(property.id,val)} style={property.selected == val ? styles.selectedProperty : styles.noSelectedProperty} ><Text> {val} </Text></TouchableOpacity>
		            					)
         								})}
              					 	</View>
              					 </View>
            					)
         					})}
		            	</View>

		               <View style={{flex:2, justifyContent:'flex-end', padding:10}}>
		               		<Text style={{marginBottom:10,fontWeight:'bold', fontSize:12}}> Choisir la quantité : </Text>
		               		<NumericInput 
					           value={props.quantity} 
					            onChange={value => props.setQuantity(value)}
					            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
					            totalWidth={120} 
					            totalHeight={30} 
					            iconSize={25}
					            step={1}
					            //initValue={1}
					            minValue={1}
					            valueType='real'
					            //textColor='#B0228C' 
					            iconStyle={{ color: 'black' }} 
					            //rightButtonBackgroundColor='#EA3788' 
					           // leftButtonBackgroundColor='#E56B70'
					            />
		            	</View>

			            <View style={{flex:1,paddingLeft:20,paddingRight:20,justifyContent:'flex-end'}}>
			               <TouchableOpacity onPress={() => Confirm()} style={{ height:45,  justifyContent:'center', alignItems:'center', backgroundColor:'#e67e00',borderRadius:20 }}>
	          					<Text style={{fontSize:16, fontWeight:'bold', color:'white',textAlign:'center'}}> CONFIRMER</Text> 
	          				</TouchableOpacity > 	          			
			            </View>
			        
	            </View>
            </ScrollView>
        </SwipeablePanel>

   );
}




function ProductScreen({ route,navigation,user, favoritesProduct,cartProduct, favoritesProductsNumber,dispatch }) {


	
	const [isLoaded,setIsLoaded] = useState(false);
	const [infoProduct,setInfoProduct] = useState({});
	const [infoVendor,setInfoVendor] = useState({});
	const [productDesc,setProductDesc] = useState("");
	const idProduct = route.params.id;
	//const nameProduct = Textcontrat(route.params.item.Title,15);
	//const idProduct = route.params.item.Id;
	//const productItem = route.params.item;
	const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;
	const [images,setImages] = useState([]);
	const [quantity,setQuantity] = useState(1);
	const [swipeableActive,setSwipeableActive] = useState(false);

     console.log(dataProduct1);

	if(idProduct == "613058471229"){

		var dataProduct = dataProduct1 ;
		var productItem = dataProduct1 ;
		var nameProduct = Textcontrat(dataProduct.OtapiItemFullInfo.Title,15);
		//var  idProduct = dataProduct.OtapiItemFullInfo.Id;

	}
	else{

		var dataProduct =dataProduct2 ;
		var productItem = dataProduct2 ;
		var nameProduct = Textcontrat(dataProduct.OtapiItemFullInfo.Title,15);
		//var  idProduct = dataProduct.OtapiItemFullInfo.Id;

	}

	const onShare = async () => {

		

		try {
	      
		    const result = await Share.share({
		        message: "Acheter " + nameProduct+ "sur sapé https://www.linternaute.fr/id/"+idProduct 
		          
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


    const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
    const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;
    React.useLayoutEffect(() => {

    	//console.log('jjjj');

	

    	navigation.setOptions({

    		headerStyle: {
	            elevation: 0,
	            shadowOpacity: 0
            },
      		
        	title: nameProduct,
      		headerRight: () => (

        		<View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center', marginRight:0}}>
                  

	        		<View style={{ flex:1,marginHorizontal: 5, marginRight:15}} >
                      <TouchableOpacity onPress={() => navigation.navigate("Sappé", {screen: 'Panier'})}>
                          <Ionicons name="cart-outline" size={28} color="#4C4C4C"/>
                          <BadgeScreen1/>
                      </TouchableOpacity>
                	</View>

                  <View style={{ flex:1,marginHorizontal: 5, marginRight:10}} >
                    <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
                        <Ionicons  name="heart-outline" size={28} color="#4C4C4C"/>
                        <BadgeScreen/>
                    </TouchableOpacity>
                  </View>

            	</View>
        	),
    });


    /*getProductInfo(idProduct).then(data => {

           setInfoProduct(data.OtapiItemInfo);

          

           var imgs=[];
           imgs.push(data.OtapiItemInfo.Pictures[0].Url);
           imgs.push(data.OtapiItemInfo.Pictures[1].Url);
           imgs.push(data.OtapiItemInfo.Pictures[2].Url);

           setImages(imgs);
           //console.log(data.OtapiItemInfo);
           
            getProductDesc(idProduct).then(data => {

           		setProductDesc(data.OtapiItemDescription.ItemDescription);
    		})

           
           getVendorInfo(data.OtapiItemInfo.VendorId).then(data => {
           		setInfoVendor(data.VendorInfo);
           		//console.log(data.VendorInfo);
           		setIsLoaded(true);
           })
           
    })*/


     setTimeout(() => {
          
        setInfoProduct(dataProduct.OtapiItemFullInfo);

        var imgs=[];
        imgs.push(dataProduct.OtapiItemFullInfo.Pictures[0].Url);
        imgs.push(dataProduct.OtapiItemFullInfo.Pictures[1].Url);
        imgs.push(dataProduct.OtapiItemFullInfo.Pictures[2].Url);
        setImages(imgs);

        setProductDesc(dataProductDescription.OtapiItemDescription.ItemDescription);
        setInfoVendor(dataVendorInfo.VendorInfo);
        setIsLoaded(true);

     }, 2000);

    	
  	}, [navigation]);


    
    function navigate(page) {
      navigation.navigate(page)
    }


    function drawImageScaled(img) {

		let screenSize = Dimensions.get('window');
		let hRatio = screenSize.width / img.width;
		let vRatio = screenSize.height / img.height;
		let ratio = Math.min(hRatio, vRatio);
		return {width: parseInt(img.width * ratio), height: parseInt(img.height * ratio)};
	}


    function renderNode(node, index, siblings, parent, defaultRenderer) {

        if (node.name == "img") {
        	
            return (
                <View  style={{height:300, width: width}}>
                	<Text></Text>
                    <Image resizeMode="contain"  source={{ uri: node.attribs.src }} style={{height:300}}  />
                </View>
            );
        }

    }


    function toggleFavoritesProduct(productItem) {

    	 if(user!=null){
	       const action = { type: "TOGGLE_FAVORITE", value: productItem }
	    	dispatch(action)
		}
	    else{
	      navigation.navigate("Connexion");
	    }

	   
	}

	function openSwipeable(){


	    if(user!=null){
	      setSwipeableActive(true)
	    }
	    else{
	      navigation.navigate("Connexion");
	    }
    
		
	}



	return (

        <View style={{flex:1}}>

        	<View>
            	<StatusBar translucent backgroundColor="#333" />
          	</View>


          	<View style={{flex: 0.95}}>

          		

          		{

					isLoaded ? 
				        <ScrollView>
				  
				        	<View style={{ alignItems:'center', height:300}}>

				        		<SliderBox
	        	 					images= {images} 
	        	 					sliderBoxHeight={300}
	        	 					autoplay={true}
	        						circleLoop ={true}
	        	 					imageLoadingColor="#3498db"
	        	 					autoplayInterval={5000}
	        					/>

					        </View>

				        	<Card containerStyle={{padding:2,margin:0,marginBottom:5, height:140}}>

				        		<Text numberOfLines={3} style={{fontSize:16,marginTop:5,padding:5, color:'#3e3e3e'}}>{infoProduct.Title}</Text>

				        		<View style={{flexDirection:'row',height:200}}>

				        			<View style={{flex:5}}>
					        			<Text  style={{marginBottom: -10, marginBottom: 10, padding:10,paddingBottom:0,fontSize:18, fontWeight:'bold'}}>
		                    					{infoProduct.Price.OriginalPrice *100} FCFA
		                  				</Text>
					        	    </View>

					        	     

					        	    <View style={{flex:1, alignItems:'center'}}>

							            <TouchableOpacity onPress={() => onShare()}>
							                <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
							                    <Ionicons style={{flex:1}} name={'md-share-social-outline'} size={28} color="#e67e00"/>
							                </Text>
							            </TouchableOpacity>
						                       
                      					
		                			</View>

					        	    <View style={{flex:1, alignItems:'center'}}>

		                  				{
						                        displayFavoritesProduct(favoritesProduct,productItem) ?

							                        <TouchableOpacity onPress={() => toggleFavoritesProduct(productItem)}>
							                          <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
							                            <FontAwesome style={{flex:1}} name={'heart'} size={28} color="#e67e00"/>
							                          </Text>
							                        </TouchableOpacity>
						                        :
							                        <TouchableOpacity onPress={() => toggleFavoritesProduct(productItem)}>
							                          <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
							                            <FontAwesome style={{flex:1}} name={'heart-o'} size={28} color="#e67e00"/>
							                          </Text>
							                        </TouchableOpacity>
                      					}

		                			</View>

				        		</View>

				        		

				        		{/*<Text style={{fontSize:16,marginTop:5,padding:5, color:'#3e3e3e'}}>{infoProduct.Title}</Text>*/}

					        		<View style={{flex:1, flexDirection:'row',height:200}}>



					        			<View style={{flex:3}}>
					        				
					        				{/*<Text  style={{marginBottom: -10, marginBottom: 10, padding:10,paddingBottom:0,fontSize:18, fontWeight:'bold'}}>
		                    					{infoProduct.Price.OriginalPrice *100} FCFA
		                  					</Text>*/}

					        			</View>

					        			

					        			<View style={{flex:1, alignItems:'center'}}>

					        				

		                  					{/*<Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
		                    					<FontAwesome style={{flex:1}} name={'heart'} size={25} color="gray"/>
		                  					</Text>*/}

		                  					{/*{
						                        displayFavoritesProduct(favoritesProduct,productItem)?

							                        <TouchableOpacity onPress={() => toggleFavoritesProduct(productItem)}>
							                          <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
							                            <FontAwesome style={{flex:1}} name={'heart'} size={28} color="#06B4FF"/>
							                          </Text>
							                        </TouchableOpacity>
						                        :
							                        <TouchableOpacity onPress={() => toggleFavoritesProduct(productItem)}>
							                          <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
							                            <FontAwesome style={{flex:1}} name={'heart-o'} size={28} color="gray"/>
							                          </Text>
							                        </TouchableOpacity>
                      						}*/}

		                				</View>

		                  				
		                			</View>

	                        </Card>

	                        <Card containerStyle={{ padding:0,margin:0,marginBottom:5,}}>

							        	<Header
									  		placement="left"
									  		leftComponent={{ text: 'INFORMATION DU VENDEUR', style: { color: 'black', fontWeight:'bold',fontSize:13 } }}
									  		containerStyle={{
									    		 			backgroundColor: 'white',
									    					paddingTop: 0,
									    					height:30,
									    					borderBottomColor:'gray'
									  		}}
										/>

										<View style={{height: 40,flexDirection: 'row', }}>
											<View style={{flex:1}}>
												<Text style={{fontWeight:'bold', color:'#06B4FF', fontSize:16, textAlign:'center',marginTop:10}}>{infoProduct.VendorName}</Text>
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

										<View style={{height:40,flexDirection: 'row',marginBottom: 10,marginTop: 10  }}>

										    <View style={{flex:1}}>
										    </View>

										    <View style={{flex:4}}>
										    	<TouchableOpacity style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:'#3498db',borderRadius:20 }}>
	          										<Text style={{fontSize:14, color:'white',fontWeight:'bold',textAlign:'center'}}> Enregistrer la boutique</Text> 
	          									</TouchableOpacity >
										    </View>


										    <View style={{flex:1}}>

										    </View>
										</View>
				        	</Card>

				        	{
				        		isLoaded &&
				        		<View >	
				        			
						        		<Card containerStyle={{ padding:0,margin:0,marginBottom:5,}}>

									        	<Header
											  		placement="left"
											  		leftComponent={{ text: 'DESCRIPTION DU PRODUIT', style: { color: 'black', fontWeight:'bold',fontSize:13 } }}
											  		containerStyle={{
											    		 	backgroundColor: 'white',
											    			paddingTop: 0,
											    					height:30,
											    					borderBottomColor:'gray'
											  		}}
												/>

												<HTMLView
        											value={productDesc}
        											renderNode={renderNode}
        											
     											/>
								
												
						        		</Card>
		      							
	      						</View>
				        	}
				        	
					    </ScrollView>
					:
					    <View style={{flex:1,backgroundColor:'white',alignItems:'center', justifyContent:'center',height:'100%'}}>
						    <View style={styles.loadingCover}>
						            <ActivityIndicator
						               color='#e67e00'
						               size='large' />
						      		   <Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement,veuillez patienter ...</Text>
						        
					        </View>
				        </View>
				}

          	</View>

          	<View style={{flex: 0.09, flexDirection:'row',backgroundColor:'white'}}>

          	   {

				isLoaded  &&

          	    <View style={{ flex:1, flexDirection:'row'}}>

          	    	

	          		<View style={{flex:1, }}> 
	          			<TouchableOpacity  onPress={() => navigation.navigate("Vendeur",{vendeur: infoVendor})}
	          			style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:'white',fontSize:16, }}>
              				<Ionicons name="home-outline" size={22} color="#3498db" />
	          				<Text style={{fontSize:10,color:'gray',textAlign:'center'}}> VENDEUR</Text> 
	          			</TouchableOpacity >
	          		</View>
	          		
	          		<View style={{flex:3}}>
	          			<TouchableOpacity  onPress={() =>openSwipeable()} style={{flex:1,justifyContent:'center', alignItems:'center',backgroundColor:'#e67e00'}}>
	          				<Text style={{fontSize:14,color:'white',fontWeight:'bold', textAlign:'center'}}> AJOUTER   AU PANIER</Text> 
	          			</TouchableOpacity >
          			</View>
          	    </View>

          		}
          	   
          	</View>
			
          	<Swipeable isActive={swipeableActive} product={dataProduct} quantity={quantity} setQuantity={setQuantity} setSwipeableActive={setSwipeableActive} navigation={navigation} dispatch={dispatch}/>
		
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

  	noSelectedProperty:{
  		minWidth:70,
  		borderRadius:20 ,
  		justifyContent:'center',
  		alignItems:'center',
  		marginRight:10,
  		marginBottom:10 ,
  		width: "auto",
  		height:30,
  		backgroundColor:'#d3d3d3',
  	},

  	selectedProperty:{
  		minWidth:70,
  		borderRadius:20 ,
  		justifyContent:'center',
  		alignItems:'center',
  		marginRight:10,
  		marginBottom:10 ,
  		width: "auto",
  		height:30,
  		color:'white',
  		backgroundColor:'#e67e00',
  	}


})


const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    cartProduct: state.cartProduct,
    user :state.user,
    
  }
}

export default connect(mapStateToProps)(ProductScreen) ;