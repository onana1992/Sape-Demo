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
import {connect} from 'react-redux';
import NumericInput from 'react-native-numeric-input'
import BadgeScreen from './BadgeScreen';
import BadgeScreen1 from './BadgeScreen1';

//import  Swipeable from './Swipeable'

const list = [0,1,2,3,4,5,6,7,8,9]
var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=true
const loop =true
const videoWidth=200;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var openswipeableActu= false;


  function Cartpanel(props){
   
   return(

        <View style={{flex:1, backgroundColor:'white', padding:10, marginTop: 5,marginLeft:5, marginBottom:5, borderRadius:3, marginRight:5,elevation: 3}}>

            <View style={{flex:1, flexDirection:'row', }}>
                <View style={{flex:2,}}>   
                    <Image resizeMode="contain"  source={{ uri: props.product.imageUrl }} style={{height:80,}}  />
                </View>
                <View style={{flex:4, marginBottom:15}}>
                    <Text > {props.product.name}</Text>
                    <Text style={{color:'gray', fontSize:12}} > {props.product.properties} </Text>
                    <Text style={{marginTop:10, fontSize:14}}> {props.product.price} FCFA </Text>
                </View>
                
            </View>

            <View style={{flex:1, flexDirection:'row',marginBottom:10, marginTop:10 }}>
                <View style={{flex:1, flexDirection:'row'}}>   
                   <View style={{flex:1, }}>
                     <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
                        <FontAwesome  name="heart-o" size={18} color="#e67e00"/>
                      </TouchableOpacity>
                   </View>

                    <View style={{flex:4 , justifyContent:'flex-start'}}>
                     <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
                        <Text><FontAwesome  name="trash" size={18} color="red"/> <Text style={{marginLeft:20, color:'red', fontSize:12}}>RETIRER </Text> </Text>
                      </TouchableOpacity>
                   </View>

                </View>
                <View style={{flex:1, marginTop:0, justifyContent:'flex-end', alignItems:'flex-end'}}>
                  <NumericInput 
                      value={props.product.quantity} 
                      onChange={value => props.updateSum(props.id,value)}
                      onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                      totalWidth={120} 
                      totalHeight={30} 
                      iconSize={25}
                      step={1}
                      //initValue={1}
                      //minValue={1}
                      valueType='real'
                      //textColor='#B0228C' 
                      iconStyle={{ color: 'black' }} 
                      /*rightButtonBackgroundColor='#e67e00' 
                      leftButtonBackgroundColor='#e67e00'*/
                      />
                    
                </View>
            </View>

        </View>
    )
    

  }


  function Totalpanel(props){

    var sum=0;
    for (var i = 0 ; i< props.product.length; i++) {

      sum = sum + props.product[i]['price'] * props.product[i]['quantity'];

    }

 

   
   return(

        <View style={{flex:1, backgroundColor:'white', padding:10, marginTop: 5, marginBottom:5,elevation: 3}}>

            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'flex-start' }}>   
                    <Text style={{ fontSize:14 , fontWeight:'bold'}} > Total </Text>
                </View>
                <View style={{flex:4,fontWeight:'bold', alignItems:'flex-end' }}>
                    <Text style={{ fontSize:14 , fontWeight:'bold'}}> {props.sum} FCFA</Text>
                </View>
            </View>

            <View style={{flex:1, flexDirection:'row', marginTop:60}}>

              <TouchableOpacity  onPress={() => setSwipeableActive(true) } style={{flex:1,justifyContent:'center', height:45, alignItems:'center',backgroundColor:'#e67e00'}}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold', textAlign:'center'}}> PASSER VOTRE COMMANDE </Text> 
              </TouchableOpacity >
            </View>

        </View>
    )
    

  }




  function PanierScreen({route,navigation, favoritesProduct,activeTab,user, cartProduct,dispatch}) {

  console.log(user);

	  const [isLoaded,setIsLoaded] = useState(false);

    function sumCal(){

      //alert()

        var sum=0;

        for (var i = 0 ; i < cartProduct.length; i++) {

          sum = sum + cartProduct[i]['price'] * cartProduct[i]['quantity'];

        }
        return sum;

    }



    const [sum,setSum] = useState(prevState => {
      return sumCal();
    });


    function updateSum(id,value){

      var products= cartProduct;
      
      //var index = products.findIndex(x=> x.Id === id);

      console.log(products)

      let g = products[id]

      console.log(g)

      g['quantity'] = value
      

        products= [
          ...products.slice(0,id),
          g,
          ...products.slice(id+1)
        ]
      
        


        var sum=0;
        for (var i = 0 ; i < products.length; i++) {

          sum = sum + products[i]['price'] * products[i]['quantity'];

        }
        setSum(sum);
        
    }

    const [products, setProducts]  = useState([

        {
          Id:"613058471229",
          name : '9A Peruvian frontal lace curly human hair wigs 180%density',
          imageUrl: "https://gd2.alicdn.com/imgextra/i2/2776587616/O1CN01UfIKXc268B1Sfv9wg_!!2776587616.jpg",
          properties : "taille:16 inch/Couleur:Noir", 
          price : 32000
        },

        {
          Id:"626565589119",
          name : '9A frontal lace short wave human hair wigs non remy',
          imageUrl: "https://img.alicdn.com/imgextra/i3/2200705270128/O1CN0154ePAs1CofJkFfh1x_!!2200705270128.jpg",
          properties : "taille:16 inch/Couleur:marron", 
          price : 60000
        }

    ]);


    React.useLayoutEffect(() => {

      navigation.setOptions({
        
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },

          headerRight: () => (

            <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center', marginRight:0}}>
                  

              <View style={{ flex:1,marginHorizontal: 5, marginRight:15}} >
                      <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
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




		setTimeout(() => {
	        setIsLoaded(true);
	  }, 1000);

  	}, [navigation]);



  


	  return (

        <View style={{flex:1}}>

        	<View>
            	<StatusBar translucent backgroundColor="#333" />
          	</View>
			
			{

				isLoaded ? 
			  <View style={{flex:1}}>
          {
            cartProduct.length== 0 ?
            <View style={{flex:1, justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
              <Ionicons name="cart-outline" size={150} color="#d3d3d3"/>
              <Text style={{color:'gray',fontSize:14}}> Aucun article ajouté pour l'instant </Text>
            </View>

            :

            <ScrollView style={{flex:1}}>

              {
                cartProduct.map((product, i) => {
                    return (
                      <Cartpanel key={i} id={i} product={product} updateSum ={updateSum} sum={sum} />
                    )
                })
              }

              <Totalpanel updateSum ={updateSum} sum={sum} product={cartProduct}/>

            </ScrollView>



          }
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
  		backgroundColor:'white',
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
    cartProduct: state.cartProduct,
    activeTab: state.activeTab,
    user:state.user,

    
  }
}

export default connect(mapStateToProps)(PanierScreen) ;