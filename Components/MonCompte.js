import React, { useState } from 'react';
import { View,StatusBar, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,Share,Dimensions,RefreshControl  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button, Icon,Header,Avatar } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button';
import TextTicker from 'react-native-text-ticker';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import {connect } from 'react-redux';
import { SwipeablePanel } from 'rn-swipeable-panel';
import  VideoPan from './VideoPan';
import  dataReplays from '../data.json';
import  dataAccueil from '../dataAccueil.json';
import  NewsModal from './NewsModal';
import  ReplayModal from './NewsModal';



//import  Swipeable from './Swipeable'


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

const list = [ 

  

  { 

    title: 'Produits/Boutiques favoris',
    icon: 'heart'
  },

  {
    title: 'Recemment vus',
    icon: 'hourglass'
  },

  {
    title: 'Adresses de livraison',
    icon: 'address-book-o'
  },

  {
    title: 'Paramètres ',
    icon: 'wrench'
  },
 
  
  {
    title: 'Service clientele',
    icon: 'volume-control-phone'
  },


 ]

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);


function deconnection(dispatch) {
    const action = { type: "TOGGLE_CONNECT", value: null}
    dispatch(action)
    

}


function NoConnectedView (props) {

 // console.log(props);

    return(

      
            <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>

                
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                      
                       {/* <Image  
                          source={require('../assets/Images/login3.jpg') } 
                          style={{height:300,width:300}} 
                       />*/}

                    </View>

                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                      
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Connexion')} style={{elevation: 8, minWidth:300, backgroundColor: "#e67e00",paddingVertical: 10, paddingHorizontal: 10}}  >
                                <Text style={{color:'white',fontSize:16,alignSelf: "center", color:'#e67e00', textTransform: "uppercase", textAlign:'center', width:300}}> Se connecter</Text>
                            </TouchableOpacity>
                        </View> 

                        <View style={{marginBottom:5}} >
                            <TouchableOpacity onPress={() => props.navigation.navigate('Inscription')} style={{elevation: 8, minWidth:300, backgroundColor: "#009688", paddingVertical: 10, paddingHorizontal: 10}} >
                                <Text style={{color:'white',fontSize:16, textAlign:'center',alignSelf: "center", textTransform: "uppercase", width:300}}> S'inscrire</Text>
                            </TouchableOpacity>
                        </View>

                        
                    </View>

  
                         
            </View>
         
     
    )
}





function MonCompteScreen({ route,navigation, favoritesProduct, favoritesProductsNumber,user,activeTab, dispatch }) {

  const [isLoaded,setIsLoaded] = useState(false);
    
    function navigate(page) {
      navigation.navigate(page)
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



    return (

        <View style={{flex:1}}>

          <View>
              <StatusBar translucent backgroundColor="#333"/>
          </View>
      
      {

        isLoaded ?

        <ScrollView style={styles.main_container} >

          <View>
            {

              user ==null ? 
              <View style={{marginBottom:10, backgroundColor:'white', height:70,flexDirection:'row', }}>

                  <View style={{ flex:1,justifyContent:'center' , paddingLeft: 20 }}> 
                        <Image  
                          source={require('../assets/Images/user.png') } 
                          style={{height:50,width:50}} 
                        />
                  </View>

                  <View style={{ flex:4,justifyContent:'center' ,alignItems:'flex-start'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Connexion')} style={{elevation: 8, Width:50, borderRadius:20, backgroundColor: "white",paddingVertical: 10, padding: 10}}  >
                            <Text style={{color:'black', fontWeight:'bold', fontSize:16,alignSelf: "center",color:'#e67e00', textTransform: "uppercase", textAlign:'center'}}>  Se connecter</Text>
                        </TouchableOpacity> 
                  </View>

              </View>
              :
               <View style={{marginBottom:10, backgroundColor:'white', height:100,}}>

                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center',marginTop:20, paddingLeft: 20 }}> 
                        <Image  
                          source={require('../assets/Images/user.png') } 
                          style={{height:50,width:50}} 
                        />
                  </View>

                  <View style={{ flex:4,justifyContent:'center' ,alignItems:'center'}}>
                        
                    <Text style={{color:'black',  fontSize:12,alignSelf: "center", textTransform: "uppercase", textAlign:'center'}}>Salut joe junior, vous etes connecter</Text>
                       
                  </View>


              </View>
            }
          </View>

          <View style={{marginBottom:10, backgroundColor:'white'}}>

               <Header
                      placement="left"
                      centerComponent={{ text: 'MES COMMANDES', style: { color: '#4C4C4C',fontWeight:'bold' } }}
                      rightComponent={<Text style={{fontSize:12,color: '#06B4FF'}}> Voir tout</Text> }
                      containerStyle={{
                         backgroundColor: 'white',
                        paddingTop: 0,
                        height:50
                      }}
                  />

                <View style={{ flexDirection:'row', flex:1, padding: 10 ,justifyContent:'center' ,alignItems:'center'}}>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center' }}> 
                    <FontAwesome name='hourglass-o' size={22} color="black" />
                    
                  </View>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
                    <FontAwesome name='automobile' size={22} color="black" /> 
                    
                  </View>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
                    <FontAwesome name='commenting-o' size={24} color="black" /> 
                   
                  </View>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
                    <MaterialCommunityIcons name='cash-refund' size={28} color="black" /> 
                    
                  </View>
                </View>

                <View style={{ flexDirection:'row', flex:1, padding: 10 ,paddingTop: 0,justifyContent:'center' ,alignItems:'center'}}>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center' }}> 
                   
                    <Text style={{ color:'gray',textAlign:'center', fontSize:12}}>En attente</Text>
                  </View>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center',fontSize:12}}>
                    
                    <Text style={{ color:'gray',textAlign:'center',fontSize:12}}>En route</Text>
                  </View>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center',fontSize:12}}>
                    
                    <Text style={{ color:'gray', textAlign:'center',fontSize:12}}>En attente d'avis</Text>
                  </View>
                  <View style={{ flex:1,justifyContent:'center' ,alignItems:'center',fontSize:12}}>
                    
                    <Text style={{ color:'gray',textAlign:'center',fontSize:12}}>Retour et Remboursement</Text>
                  </View>
                </View>

          </View>


          <View style={{marginBottom:20}}>
              {
                list.map((item, i) => (
                  <ListItem  style={styles.list} key={i}  onPress={() => clickAction(navigation ,item.title)}>
                   <FontAwesome name={item.icon} size={24} color="black"/>
                    <ListItem.Content>
                      <ListItem.Title style={{color:'black',fontSize:16 }}>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                  </ListItem>
                ))
              }
          </View>

         {
           user!=null &&
           <View style={{ flex:4, justifyContent:'center' ,alignItems:'center',marginBottom:20}}>
              <TouchableOpacity onPress={() => deconnection(dispatch)} style={{ Width:50, borderRadius:20, backgroundColor:'white', paddingVertical: 10, padding: 10}}  >
                    <Text style={{color:'white', fontWeight:'bold', fontSize:16,alignSelf: "center", color:'#e67e00', textTransform: "uppercase", textAlign:'center'}}>  Se Deconnecter</Text>
                </TouchableOpacity> 
          </View>
        }

          {/*<View style={{flex:1, textAlign:'center', justifyContent: 'center',flexDirection: 'row', }}>
            <Text style={{fontSize:16,paddingTop:5}}> Retrouver nous sur les reseaux sociaux </Text>
          </View>*/}

          {/*<TouchableOpacity onPress={() => props.navigation.navigate('Connexion')} style={{elevation: 8, Width:100, backgroundColor: "#3498db",paddingVertical: 10, padding: 10}}  >
                                <Text style={{color:'white',fontSize:16,alignSelf: "center", textTransform: "uppercase", textAlign:'center', width:300}}> Se connecter</Text>
                </TouchableOpacity>*/}



    
        
        {/*<Divider style={{ backgroundColor: 'gray' }} />*/}
      
     
      </ScrollView>

       

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


const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    user:state.user,
    activeTab:state.activeTab,
    
  }
}

export default connect(mapStateToProps)(MonCompteScreen) ;






const styles = StyleSheet.create({
    main_container: {
      flex:1,
     //         backgroundColor:'white',
    },


   loadingCover: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center', 
    },

    appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
   // fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }


})