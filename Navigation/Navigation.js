import  React from 'react';
import  { View, TextInput, Button, Image,Share, Text,StyleSheet,FlatList,ActivityIndicator,ScrollView,TouchableOpacity, } from 'react-native';
import  { NavigationContainer } from '@react-navigation/native';
import  { createStackNavigator } from '@react-navigation/stack';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Feather from 'react-native-vector-icons/Feather';
import  AccueilStack from '../Components/Accueil';
import  RechercheScreen from '../Components/Recherche';
import  InscriptionScreen from '../Components/Inscription';
import  ConnexionScreen from '../Components/Connexion';
import  FavorisScreen from '../Components/Favoris';
import  VendeurScreen from '../Components/Vendeur';
import  ReplayStack from '../Components/Replay';
import  DirectStack from '../Components/Direct';
import  ProgrammeStack from '../Components/Programme';
import  MarqueScreen from '../Components/Marque';
import  ProduitScreen from '../Components/Product';
import  ProduitDayScreen from '../Components/ProductDay';
import  PanierScreen from '../Components/Panier2';
import  MenuStack from '../Components/Menu';
import  NewsStack from '../Components/News';
import  CatProductScreen from '../Components/CatProduits';
import  {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  CategoryStack from '../Components/Category';
import  MonCompteStack from '../Components/MonCompte'
import  PanierStack from '../Components/Panier';
import  RecommandationStack from '../Components/Recommendation';
import  FavorisStack from '../Components/Favoris';
import  { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import  ProductScreen from '../Components/Product';
import  { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import  BadgeScreen from '../Components/BadgeScreen';
import  {connect } from 'react-redux';
import HomeTabs from '../Components/HomeTabs'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const onShare = async () => {

  try {
        
      const result = await Share.share({
          message:
            'https://play.google.com/store/apps/details?id=io.ounkoun.starter&hl=fr&gl=US',
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




function Navigation({ route,navigation, favoritesProduct, favoritesProductsNumber,activeTab, dispatch }) {

  const config = {
  screens: {
    Marque: 'marque',
    Produit: 'produit/:id',
  },
};

    const linking = {
    prefixes: ['https://www.linternaute.fr'],
    config
  };

  


  return (

    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>

      <Stack.Navigator
         headerMode='screen'
         screenOptions={{
            
            headerStyle: {
            },
            headerTintColor: '#4C4C4C',
            headerTitleAlign:'center',
            headerTitleStyle: {
               fontSize:20,
            },
        }}
      >

          <Stack.Screen 

              name="Sappé" 
              mode="modal"
              component={HomeTabs}
              options={{ headerShown: false }}

              //options={{ headerTitle: props => <LogoTitle {...props} /> }}
              /*options={headerOption()}*/
          />

         
          
          <Stack.Screen
              name="Inscription" 
              component={InscriptionScreen}
              headerMode='screen'
              options={{ 

                  title: "S'inscrire",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}

          />

          <Stack.Screen
              name="Connexion" 
              component={ConnexionScreen}
              headerMode='screen'
              options={{ 
                  title: "Se connnecter",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />

          <Stack.Screen
              name="CatProduct" 
              component={CatProductScreen}
              headerMode='screen'
              options={{ 
                  title: "",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />

          <Stack.Screen
              name="Marque" 
              component={MarqueScreen}
              headerMode='screen'
              options={{ 
                  title: "",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />

          <Stack.Screen
              name="Favoris" 
              component={FavorisScreen}
              headerMode='screen'
              options={{ 
                  title: "Favoris",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          /> 

          <Stack.Screen
              name="Recherche" 
              component={RechercheScreen}
              headerMode='screen'
              options={{ 
                  title: "Recherche",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          /> 

          <Stack.Screen
              name="Produit" 
              component={ProduitScreen}
              headerMode='screen'
              options={{ 
                  title: "",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />

          <Stack.Screen
              name="Vendeur" 
              component={VendeurScreen}
              headerMode='screen'
              options={{ 
                  title: "",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />

          <Stack.Screen
              name="Panier1" 
              component={PanierScreen}
              headerMode='screen'
              options={{ 
                  title: "Panier",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />

          <Stack.Screen
              name="ProductDay" 
              component={ProduitDayScreen}
              headerMode='screen'
              options={{ 
                  title: "Selection du jour",
                  headerMode: 'screen',
                 //headerTintColor: '#fff',
                  headerTitleAlign:'left',
                  headerTitleStyle: {
                  fontSize:18,
                },
              }}
          />     
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});


const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    cartProduct: state.cartProduct,
    activeTab: state.activeTab,
    
  }
}

export default connect(mapStateToProps)(Navigation);

