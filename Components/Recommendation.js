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
import { getCategorieInfo } from '../API/OTAPI';
import { getproductsBylist } from '../API/OTAPI';


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

 function ProductCard1 (props){

      return(
        <View style={{flex:0.5}} >
          <TouchableOpacity style={styles.main_container} onPress={() => props.navigation.navigate('Product',{idProduct: props.article.item.Id , nameProduct: props.article.item.Title })}>
            <Card containerStyle={{padding:0,margin:2,marginBottom:5, borderRadius:2 }} onPress={() => console.log("clikef allright")} >
                     
              <Card.Image resizeMode="contain"  style={{width: '100%', paddingLeft:0,height:170,borderTopLeftRadius:5,borderTopRightRadius:5}}  source={{uri:props.article.item.MainPictureUrl.replace("https", "http")}} />
               
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
                  <Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
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





function RecommandationScreen({ navigation }) {


  const [isLoaded,setIsLoaded] = useState(false);
  const [products,setProduct] = useState([]);
  const [number,setNumber] = useState();
  const [page,setPage] = useState(0);
  const pageSize = 10;
  const [isReLoaded,setIsReLoaded] = useState(false);
  var   productlist = ["628034223424" , "623316527076", "609202459676", "624700749192", "565048808185" , "608085820506", "617398214427", "578336905276",  "530335144452", 
  "631944776427","567258856191" , "622529652675" , "622528472358","631944776427","608066076871", "581965621242", "617753361828", "622827443912","620150455113", "616608786793" ];
 

  const IoniconsHeaderButton = (props) => (
      // the `props` here come from <Item ... />
      // you may access them and pass something else to `HeaderButton` if you like
      <HeaderButton {...props} IconComponent={FontAwesome} iconSize={20} color="#fff" />
  );

 
  const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
  const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;



    
  function navigate(page) {
      navigation.navigate(page)
  }


  function extractProductlist(page,size){

     var list= "";
     for (var i = page*size ; i < page*size + size; i++) {

        if(list == ""){

          list = productlist[i];

        }
        else{

          list = list +";"+productlist[i];
        }

        console.log(list);
       
     }

      return list;
  }


  function loadProducts(actionAfter) {

    setPage(page+1);
 
    if((page+1)*pageSize < number){
      

      setIsReLoaded(false);

      getproductsBylist(extractProductlist(page+1,pageSize)).then(data => {
          setProduct([...products,...data.OtapiItemInfoList.Content]);
          setPage(page+1);
          setIsReLoaded(true);    
   
      })  

    }
          
  }


  return (

        <View style={{flex:1}}>

          <View>
              <StatusBar translucent backgroundColor="#333" />
            </View>
      
      {

        isLoaded ? 
            <View style={{flex:1,backgroundColor:'white'}}>

              <View style={{ flexDirection:'row',height:35,alignItems: 'center',justifyContent: 'center',backgroundColor: '#f5f5f5'}}>
                  
                  <View style={{flex:5, borderRightWidth: 1, borderColor: "gray"}}>
                    <Text style={{fontSize:14,color:'black',textAlign:'center'}}> 
                    <FontAwesome style={{marginRight:10}} name="filter" size={14} color="black" /> Filtrer par categorie </Text>
                  </View>

                  <View style={{flex:5, borderRightWidth: 1, borderColor: "gray"}} >
                    <TouchableOpacity  onPress={() => showModal() }>
                    <Text style={{fontSize:14,color:'black',textAlign:'center'}}> 
                    <FontAwesome style={{marginRight:20}} name="exchange" size={14} color="black" /> Popularité </Text>
                    </TouchableOpacity>
                  </View>   

                  <View style={{flex:2,alignItems:'center'}}>
                     <Ionicons name="menu-outline" size={18} color="black" /> 
                  </View>
              </View>

              <FlatList

                ListHeaderComponent={

                  <View style={{flex:1,marginTop:20,marginBottom:20}}>
                      <Text style={{fontSize:18, textAlign:'center'}}> Toutes les catégories</Text>
                      <Text style={{fontSize:12, textAlign:'center', color:'gray'}}> {number} produits recommadés</Text>
                  </View>

                }

                numColumns={2}                  // set number of columns 
                columnWrapperStyle={{ flex: 1,backgroundColor:'white'}}  // space them out evenly
                data={products}
                keyExtractor={(item) => item.Id}
                renderItem={(item) =>  
                   <ProductCard1 article={item} navigation={navigation}/>
                }
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    loadProducts()
                   
                }}

                ListFooterComponent={
                    
                    !isReLoaded &&
                    <View style={{flex:1,backgroundColor:'white',marginBottom:10,marginTop:10}}>
                      <View style={styles.loadingCover}>
                              <ActivityIndicator
                                 color='#EE7600'
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
                         color='#06B4FF' 
                         size='large'/>
                       <Text style={{marginTop:20,color:'gray',fontSize:12,}}>Chargement,veuillez patienter ...</Text>
              </View>
        </View>
          
      }
    
    

    </View>
    );

}


const RecommandationStack = createStackNavigator();

export default  function RecommandationStackScreen() {
  
  return (
    <RecommandationScreen/>

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