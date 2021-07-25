import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,Share } from 'react-native';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';
import  Feather from 'react-native-vector-icons/Feather';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';

import  {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import  { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import  {connect } from 'react-redux';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};


function BadgeScreen({ route,navigation, favoritesProduct, favoritesProductsNumber,dispatch}) {

 return (
    <Badge
         containerStyle={{position: 'absolute', top: -3, right: -12, color:'#4C4C4C',width:30 }}
         value={favoritesProduct.length }
         status="primary"
         badgeStyle={{
                backgroundColor: "#e67e00"
         }}
     />
  );

}


const mapStateToProps = (state) => {
  return {
      favoritesProduct: state.favoritesProduct,
      favoritesProductsNumber: state.favoritesProductsNumber,
  }
}


export default connect(mapStateToProps)(BadgeScreen)