
import  React from 'react';
import  { View, TextInput, Button, Image,Share, Text,StyleSheet,FlatList,ActivityIndicator,ScrollView,TouchableOpacity, } from 'react-native';
import  { NavigationContainer } from '@react-navigation/native';
import  { createStackNavigator } from '@react-navigation/stack';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Feather from 'react-native-vector-icons/Feather';
import  { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import   BadgeScreen from './BadgeScreen';
import  AccueilStack from './Accueil';
import  CategoryStack from './Category';
import  RechercheStack from './Recherche';
import  { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import  PanierStack from './Panier';
import  MonCompteStack from './MonCompte'
import  {connect } from 'react-redux';
import  {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from  "react-native-splash-screen";




const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const TabAccueilStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Sappé'
        component={AccueilStack}
        options={{
          title: "Sappé",
          headerMode: 'screen',
          headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign:'Center',
          /*headerTitleStyle: {
              fontSize:18,
              height: 90
          },*/
           
        }}
      />
    </Stack.Navigator>
  );
};

const TabCategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Categories'
        component={CategoryStack}
        options={{
          title: "Categories",
          headerMode: 'screen',
          headerTitleAlign:'left',
          headerTitleStyle: {
              fontSize:18,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabPanierStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Panier'
        component={PanierStack}
        options={{
          title: "Mon panier",
          headerMode: 'screen',
          headerTitleAlign:'left',
          headerTitleStyle: {
              fontSize:18,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabMonCompteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Mon compte'
        component={MonCompteStack }
        options={{
          title: "Mon compte",
          headerMode: 'screen',
          headerTitleAlign:'left',
          headerTitleStyle: {
              fontSize:18,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabRechercheStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Recherche'
        component={RechercheStack}
        options={{
          title: "",
          headerMode: 'screen',
          headerTitleAlign:'left',
          headerTitleStyle: {
              fontSize:18,
          },
        }}
      />
    </Stack.Navigator>
  );
};



function LogoTitle() {
  return (
    <View style={{flex:1, flexDirection:'row',justifyContent: 'flex-start',
        alignItems: 'center', }}>
      <Image
        style={{ width: 70, height: 55 }}
        source={require('../assets/Images/icon.png')}
      />
      {/*<Text style={{color:'orange', fontSize:18}}>C-Package</Text>*/}
      </View>
  );
}

function HomeTabs({ route,navigation, favoritesProduct, user,cartProduct, favoritesProductsNumber,dispatch }) {


  function goTofavorite(){

      if (user!=null) {
       navigation.navigate('Favoris')
      }
      else{
        navigation.navigate('Connexion')
      }
  }

  const IoniconsHeaderButton = (props) => (
      
      <HeaderButton {...props} IconComponent={FontAwesome} iconSize={20} color="#fff" />
  );

  const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
  const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

  React.useLayoutEffect(() => {

      navigation.setOptions({

        headerRight: () => (
           

            <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center', marginRight:0}}>

                  <View style={{ flex:1,marginHorizontal: 5, }} >

                    <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
                        <Ionicons name="ios-search-outline" size={28} color="#4C4C4C"  />
                    </TouchableOpacity>

                  </View>

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
                        <HiddenItem title="Partager l'application" onPress={() => onShare()} />
                    </OverflowMenu>
                  </View>
            </View>
      ),

      });

       SplashScreen.hide();

  }, [navigation]);



  return (

    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            let iconName;

            if (route.name === 'Accueil') {
              return <Ionicons name="home-outline" size={size} color={color} />
            }
            else if (route.name === 'Categories') {
              return <Ionicons name="md-menu-outline" size={size} color={color} />
            } 
            else if (route.name === 'Panier') {

              return (

                <View>
                   <Ionicons name="cart-outline" size={size} color={color}  />
                   <Badge
                           status="primary"
                           value={cartProduct.length}
                           containerStyle={{ position: 'absolute', fontSize:10, top: -6, right: -12, color:'#4C4C4C',width:30,   }}
                           badgeStyle={{
                                  backgroundColor: "#e67e00"
                           }}
                     />
                </View>
              )

            } 

            else if (route.name === 'Favoris') {
              iconName = 'heart';
            }

            else if (route.name === 'Recommandations') {
              return <Ionicons name="ios-star-outline" size={size} color={color}  />
              
            }
            else if (route.name === 'Mon compte') {
              iconName = 'user-o';
            }

             else if (route.name === 'Recherche') {
              iconName = 'Recherche';
              return <Ionicons name="ios-search-outline" size={size} color={color}  />
              
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color}  fontFamily= 'fantasy' />;
          },
        })}

        tabBarOptions={{
          activeTintColor: '#e67e00',
          inactiveTintColor: 'gray',
          keyboardHidesTabBar: true
        }}
    >
        <Tab.Screen name="Accueil" component={TabAccueilStack} />
        <Tab.Screen name="Categories" component={TabCategoryStack} />
        <Tab.Screen name="Recherche" component={TabRechercheStack} />
        <Tab.Screen name="Panier" component={TabPanierStack}/>
        <Tab.Screen name="Mon compte" component={TabMonCompteStack} />
   </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    cartProduct : state.cartProduct,
    user:state.user
  }
}

export default connect(mapStateToProps)(HomeTabs);

