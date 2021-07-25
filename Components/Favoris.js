import * as React from 'react';
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Image,ScrollView,TouchableOpacity,  } from 'react-native'
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
import  { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import   BadgeScreen from './BadgeScreen';


//const Tab = createBottomTabNavigator();
const FavorisStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function FavorisScreen({ route,navigation, favoritesProduct, favoritesProductsNumber,dispatch}) {


  React.useLayoutEffect(() => {
    

      navigation.setOptions({
          
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },

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

       



  }, [navigation]);

  return (
      <View style={styles.main_container}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
             
              })}

              styles={{ackgroundColor:'white'}}

              tabBarOptions={{
                activeTintColor: '#e67e00',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Produits" component={FavorisProduitScreen} />
              <Tab.Screen name="Boutique" component={FavorisBoutiqueScreen} />
            </Tab.Navigator>
      </View>
  );
}


const styles = StyleSheet.create({

  main_container: {
      flex:1,
      backgroundColor:'white',
      
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
})

const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    
  }
}

export default connect(mapStateToProps)(FavorisScreen);


