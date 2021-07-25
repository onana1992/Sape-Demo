
import React, { useState } from 'react';
import { View, TextInput, Button,KeyboardAvoidingView, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import { connect } from 'react-redux'
import FavorisBoutiqueScreen from  './FavorisBoutique' ;
import FavorisProduitScreen from  './FavorisProduit' ;
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';

import { SearchBar } from 'react-native-elements';
//import { HeaderSearchBar, HeaderClassicSearchBar} from "react-native-header-search-bar";
//import SearchHeader from 'react-native-search-header';
//import SearchHeader from 'react-native-search-header';

//const Tab = createBottomTabNavigator();
const FavorisStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function RechercheScreen({ navigation }) {

   const [search,setSearch] = React.useState('');
   const [text, setText] = useState("");

   const [keywords, setKeywords]  = useState(

     ["zara", "air max nike", "t-shirt versage", "pull berksha", "sandale rouge", "sac louis vuitton","combinaison", "polo ralph laurent"],
   );

   function textChange(val){

       setText(val);
   }

  

  React.useLayoutEffect(() => {
    
      console.log("action ");
      navigation.setOptions({
          
         headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },

          //headerTitle : 'ddd'

         headerTitle: () => (
            
           <KeyboardAvoidingView style={{flex:1}} >
            <View style={{flex:1,  marginRight:-20, marginLeft:-20, paddingLeft:0,paddingRight:0}}>
               <SearchBar
                  placeholder="Type Here..."
                  containerStyle={{borderBottomWith:0, backgroundColor:'transparent', borderBottomColor:'transparent',borderTopColor:'transparent'}}
                  inputContainerStyle={{ backgroundColor:'#F6F6F6', borderColor:'gray'}}
                  inputStyle= {{ borderColor:'transparent', fontSize: 14 }}
                  autoFocus={true}
                  onChangeText={searchValue => textChange(searchValue)}
                  value={text}
                />  
            </View>
            </KeyboardAvoidingView  >
        ),

    });

       



  }, [navigation,text]);

  return (

    <ScrollView style={styles.main_container}>
     
        <View style={{flex:4,paddingLeft:10}}>
          <Text style={{fontWeight:'bold', marginBottom:10, fontSize:14,}}>Historique de recherche</Text>
              <View style={{flexDirection:'row', flexWrap: "wrap",}}>
                       
                {keywords.map((key,i) => {
                      return (
                            <TouchableOpacity key={i} style={styles.key}><Text>{key}</Text></TouchableOpacity>
                      )
                 })}
               </View>
        </View>
    </ScrollView>

           
      
  );
}



const styles = StyleSheet.create({

  main_container: {
      flex:1,
      backgroundColor:'white',
      
      height: 2000
  },

  section_title: {
    fontSize:18,
    flex:1,
    
  },

  grille_image: {
    flex:10,
    width: "100%",
    height: 300,
     resizeMode:'contain'
      
  },

  section_Favoris: {
    flex:5,
    
  },

 key: {
      minWidth:70,
      borderRadius:20 ,
      justifyContent:'center',
      alignItems:'center',
      marginRight:10,
      marginBottom:10 ,
      width: "auto",
      height:30,
      backgroundColor:'#d3d3d3',
      padding:5
    },
})






export default  RechercheScreen