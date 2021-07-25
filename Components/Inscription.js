import React, { useState } from 'react';
import { View,StatusBar, TextInput,Text,StyleSheet,FlatList,ActivityIndicator,
         TouchableHighlight,Image,ScrollView,Keyboard,TouchableOpacity,
         Share,Dimensions,RefreshControl,KeyboardAvoidingView,TouchableWithoutFeedback, Alert} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button,Header,Avatar,Input } from 'react-native-elements';
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
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";



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

function sendSms (numero,message){

  var postUrl = "http://193.105.74.59/api/sendsms/xml";
      // XML-formatted data
  var xmlString = "<SMS><authentification><username>nanojunior</username><password>Nanojunior92</password></authentification><message><sender>nono</sender><text>Message from your friend!</text></message><recipients><gsm>237699494380</gsm></recipients></SMS>";
      
      // previously formatted XML data becomes value of "XML" POST variable
  var fields = "XML=" + encodeURIComponent(xmlString);
  console.log(fields);


    const requestOptions = {
        method: 'POST',
        body: fields
    };

    fetch(postUrl, requestOptions)
        .then(response => console.log(response))
        .then(data => console.log(""));
 
};



function NoConnectedView (props) {

  //console.log(props);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birdDate, setBirdDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log( JSON.stringify(date));
    setBirdDate(String(date.getDate())+"-"+String(date.getMonth())+"-"+String(date.getFullYear()));
    hideDatePicker();
  };

    return(

      <ScrollView>

        <Formik

          initialValues={{ nom: '', password: '', email: '',passwordC:'',sex:'' }}
          onSubmit={(values, { setSubmitting }) => {

              alert(JSON.stringify(values, null, 2));
              sendSms("699494380","hello");
             /*setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);

             }, 400);*/

          }}

          validate={values => {
            const errors = {};

               if (!values.email) {
                 errors.email = 'valeur requise';
               } 

               else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|(^6[0-9]{8}$)$/i.test(values.email))

               {
                 errors.email = 'Email non valide';
               }

               if (!values.nom) {
                 errors.nom = 'Valeur requise';
               }

               if (!values.password) {
                 errors.password = 'Valeur requise';
               }

               if (!values.passwordC) {
                 errors.passwordC= 'Valeur requise';
               }
               else if(values.passwordC != values.password){
                 errors.passwordC= 'mot de passe pas identique';
               }

               if (!values.sex) {
                 errors.sex= 'Valeur requise';
               }

               
             return errors;
            }}
        >

         {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (

            <KeyboardAvoidingView style={{flex:1}} >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                  <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>CRÉER UN COMPTE</Text>

                    <Text style={styles.labelText}>Nom*</Text>
                    <TextInput 
                        placeholder="Votre Nom" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput}
                        onChangeText={handleChange('nom')}
                        onBlur={handleBlur('nom')}
                        value={values.nom} 
                    />
                    <Text style={styles.errorText}> {errors.nom && touched.nom && errors.nom} </Text>

                    <Text style={styles.labelText}>Prénom</Text>
                    <TextInput placeholder="Votre prénom" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
                    
                    <Text style={styles.labelText}>Sex*</Text>
                    <RNPickerSelect
                      //onValueChange={(value) => console.log(value)}
                      useNativeAndroidPickerStyle={false}
                      style={pickerStyle}
                      onValueChange={handleChange('sex')}
                      onBlur={handleBlur('sex')}
                      value={values.sex}
                      placeholder={{
                        label: 'Choisir votre sex',
                        value: null,
                        color: 'gray',
                      }}

                      items={[
                          { label: 'homme', value: 'homme' },
                          { label: 'femme', value: 'femmme' },
                      ]}
                    />
                    <Text style={styles.errorText}> {errors.sex && touched.sex && errors.sex} </Text>

                    <View>
                      <Text style={styles.labelText}>Date de naissance*</Text>
                      <TextInput 
                          onFocus={showDatePicker}
                          value={birdDate}
                          placeholder="Votre date naissance"
                          placeholderColor="#c4c3cb" 
                          style={styles.loginFormTextInput}
                      />
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />

                    </View>


                    <Text style={styles.labelText}>Email/Tel*</Text>
                    <TextInput 
                        placeholder="Votre Email/Telephone" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email} 
                    />
                    <Text style={styles.errorText}> {errors.email && touched.email && errors.email} </Text>

                    
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
                    
                    <Text style={styles.labelText}>Confirmer le mot de passe*</Text>
                    <TextInput 
                        placeholder="confirmation mot de passe" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput} 
                        secureTextEntry={true}
                        onChangeText={handleChange('passwordC')}
                        onBlur={handleBlur('passwordC')}
                        value={values.passwordC}
                    />
                    <Text style={styles.errorText}> {errors.passwordC && touched.passwordC && errors.passwordC} </Text>

                    <Button
                      buttonStyle={styles.loginButton}
                      onPress={handleSubmit}
                      title="CRÉER UN COMPTE"
                    />

                    <View style={{flexDirection:'row', flex:1, justifyContent:'center',alignItems:'center',marginTop:30}}> 

                      <View style={{flexDirection:'row', flex:3,justifyContent:'center',alignItems:'center'}}>
                       <Text style={{textAlign:'center', color:'black', fontSize:16}}> ou  enregistrer vous avec :</Text>
                      </View> 

                      <View style={{flexDirection:'row', flex:2, justifyContent:'center',alignItems:'center', }}>

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
                      <Text style={{fontSize:16, color:'#3897f1'}} onPress={() => props.navigation.navigate("Connexion")}> Se connecter</Text>
                    </View>

                  </View>
                </View>
                
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

         )}

      </Formik>
        
      </ScrollView>
    )
}





function MonCompteScreen(props) {


  const [isLoaded,setIsLoaded] = useState(false);
  function navigate(page) {
    //  props.navigation.navigate(page)
  }


  React.useLayoutEffect(() => {
      setTimeout(() => {
         setIsLoaded(true);
      }, 100);
  });


  return (

      <View style={{flex:1}}>

        <View>
              <StatusBar translucent backgroundColor="#333"/>
        </View>
      
        {

          isLoaded ? 
          <View style={styles.main_container}>

            <View style={{flex:1}}>
               <NoConnectedView navigation={props.navigation}/> 
            </View>   
                  
          </View>
          :

          <View style={{flex:1,backgroundColor:'white'}}>
                
          </View>
        }

      </View>

    );

}



export default  function MonCompteStackScreen({navigation}) {
  return (
    <MonCompteScreen navigation={navigation} />
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


});

const pickerStyle = {
  

  inputAndroid: {
    color: 'gray',
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

  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  
};