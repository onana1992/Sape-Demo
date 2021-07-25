import React, { useState } from 'react';
import { View,StatusBar, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,
         TouchableHighlight,Image,ScrollView,Keyboard,TouchableOpacity,
         Share,Dimensions,RefreshControl,KeyboardAvoidingView,
         TouchableWithoutFeedback, Alert} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button, Icon,Header,Avatar } from 'react-native-elements';
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
import {connect } from 'react-redux';
import { Formik } from 'formik';


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

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);


function connection(props,user) {
    const action = { type: "TOGGLE_CONNECT", value: user};
    props.dispatch(action);
    props.navigation.navigate("Sappé", {screen: 'Mon compte'});
}


function NoConnectedView (props) {

    return(
      
      <View style={{flex:1}} >
          
          {

          !props.connecting ? 
          
            <Formik

              initialValues={{password: '', login : '' }}
              onSubmit={(values, { setSubmitting }) => {
                    //alert(JSON.stringify(values, null, 2));
                    props.setConnecting(true);
                   setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                     connection(props,{password: values.password, login : values.login  })
                     props.setConnecting(false);

                   }, 1000)
              }}

                validate={values => {
                  const errors = {};

                     if (!values.login) {
                       errors.login = 'valeur requise';
                     } 


                     if (!values.password) {
                       errors.password = 'Valeur requise';
                     }
                     
                   return errors;
                }}
              >

              {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
                  <KeyboardAvoidingView style={{flex:1}} >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>

                          <Text style={styles.logoText}>CONNECTER VOUS </Text>

                          <Text style={styles.labelText}>email/Tel*</Text>
                          <TextInput 
                              placeholder="Votre Email/Telephone" 
                              placeholderColor="#c4c3cb" 
                              style={styles.loginFormTextInput}
                              onChangeText={handleChange('login')}
                              onBlur={handleBlur('login')}
                              value={values.login} 
                          />
                          <Text style={styles.errorText}> {errors.login && touched.login && errors.login} </Text>


                          <Text style={styles.labelText}>Mot de passe*</Text>
                          <TextInput 
                              placeholder="Votre mot de passe" 
                              placeholderColor="#c4c3cb" 
                              style={styles.loginFormTextInput} 
                              secureTextEntry={true}
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}
                          />
                          <Text style={styles.errorText}> {errors.password && touched.password && errors.password} </Text>
                          
                          <Button
                            buttonStyle={styles.loginButton}
                            onPress={handleSubmit}
                            title="SE CONNECTER"
                          />
                          
                          <View style={{justifyContent: 'center',marginLeft: 15,  marginTop:30, marginBottom:30 }}>
                            <Text style={{fontSize:14, color:'#3897f1'}}> Mot de passe oublié ?</Text>
                          </View>
                        </View>
                        
                        <View style={{flexDirection:'row', flex:1, justifyContent:'center',alignItems:'center'}}> 

                          <View style={{flexDirection:'row', flex:3,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{textAlign:'center', color:'black', fontSize:16}}> ou  enregistrer vous avec :</Text>
                          </View> 

                          <View style={{flexDirection:'row', flex:2, justifyContent:'center',alignItems:'center'}}>

                             <TouchableOpacity activeOpacity={0.5}  style={{marginRight:15}}
                                onPress={() => openPanel()}>
                                 <Image  
                                    source={require('../assets/Images/facebook.png') } 
                                    style={{height:40,width:40}} 
                                 />
                             </TouchableOpacity>

                             <TouchableOpacity activeOpacity={0.5}  style={styles.TouchableOpacityStyle}
                                onPress={() => openPanel()}>
                                 <Image  
                                    source={require('../assets/Images/google.png') } 
                                    style={{height:40,width:40}} 
                                 />
                             </TouchableOpacity>
                          </View>
                        </View> 

                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:30, marginBottom:30 }}>
                           <Text style={{fontSize:14}}> Avez-vous déja un compte?</Text>
                          <Text style={{fontSize:16, color:'#3897f1'}} onPress={() => props.navigation.navigate("Inscription")}> Creer un compte</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
              )}

            </Formik>

            :
          
            <View style={styles.loadingCover}>
                <View style={{flex:1, marginTop:200}}>  
                      <ActivityIndicator
                             color='#e67e00'
                             size='large' />
                      <Text style={{marginTop:20,color:'gray',fontSize:12,}}>Connexion,veuillez patienter ...</Text>
                </View>
            </View>

        }

      </View>
    )
}





function MonCompteScreen( { route,navigation, favoritesProduct, favoritesProductsNumber,user, dispatch }) {

  console.log(user);

  const [isLoaded,setIsLoaded] = useState(false);
  const [connecting,setConnecting] = useState(false);
    
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
        }, 100);

    }, [navigation]);




    return (

      <View style={{flex:1}}>

          <View>
              <StatusBar translucent backgroundColor="#333"/>
          </View>
      
        {

          isLoaded ? 
         

          <ScrollView style={styles.main_container}>
               <NoConnectedView navigation={navigation} dispatch={dispatch} style={{flex:1,justifyContent: 'center', alignItems: 'center',}} setConnecting={setConnecting} connecting={connecting}/>
          </ScrollView>   
                  
       
          :
            <View style={{flex:1,backgroundColor:'white',justifyContent: 'center',
                alignItems: 'center', }}>
                <Text></Text>
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

    containerView: {
      flex: 1,
    },

    loginScreenContainer: {
        flex: 1,
    },

    logoText: {
      fontSize: 20,
      fontWeight: "800",
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center',
    },

    errorText: {
      fontSize: 10,
      color:'red',
      marginBottom: 10,
      paddingLeft: 15,
      marginTop: -10
    },

   

    loginFormView: {
      flex: 1
    },

    labelText: {
      fontSize: 14,
      marginBottom: 5,
      paddingLeft: 20,
      paddingTop: 0
    },


    loginFormTextInput: {

      height: 43,
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 0,
      marginBottom: 10,

    },

    loginButton: {
      //backgroundColor: '#3897f1',
      //borderRadius: 5,
      fontSize:16,
      height: 45,
      marginTop: 20,
      marginLeft: 15,
      marginRight: 15,
    },

    fbLoginButton: {
      height: 45,
      marginTop: 10,
      backgroundColor: 'white',
      color:'red'
    },


    loginFormTextInput: {

      height: 43,
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 0,
      marginBottom: 10,

    },

    loginButton: {
      //backgroundColor: '#3897f1',
      //borderRadius: 5,
      fontSize:16,
      height: 45,
      marginTop: 20,
      marginLeft: 15,
      marginRight: 15,
    },

    fbLoginButton: {
      height: 45,
      marginTop: 10,
      backgroundColor: 'white',
      color:'red'
    }

   

})

const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    favoritesProductsNumber: state.favoritesProductsNumber,
    user: state.user,
    
  }
}

export default connect(mapStateToProps)(MonCompteScreen) ;
