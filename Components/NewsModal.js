
import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,TouchableOpacity, Dimensions,ScrollView  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import { Entypo} from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button1, Icon,Header  } from 'react-native-elements';
import Video from 'react-native-video';
import RCTYouTubeExample from './RCTYouTubeExample';
import dataReplays from '../data.json';
import dataReplays1 from '../data.json';



export default  function NewsModal({ route, navigation }) {

   // const {item} = route.params;
    const activeIndex= 0
	const autoplay=true
	const loop =true
	const videoWidth=200;
	const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
	const [isLoaded,setIsLoaded] = useState(false);
	const [columnA,setColumnA] = useState([]);
	const [columnB,setColumnB] = useState([]);
	const [{item},setItem] = useState(route.params);

	
	
	function ReplayCard (props){

			return(
				<View style={{flex:1}} >
					<TouchableOpacity style={styles.main_container} onPress={() => props.navigation.navigate("modal",{item: props.article.item})}>
						<Card containerStyle={{padding:0,margin:5,marginBottom:5, borderRadius:5 }} onPress={() => console.log("clikef allright")} >
										 
							<Card.Image  style={{width:'100%',paddingLeft:0,height:130,borderTopLeftRadius:5,borderTopRightRadius:5}}  source={{uri:props.article.item.imageUrl}} />
										  		
							<View style={{flexDirection: 'row', height:80}}>
								<Text numberOfLines={3} style={{marginBottom: 10, padding:10,paddingBottom:0,fontSize:12}}>
									{props.article.item.titre}
								</Text>
							</View>

							<View style={{flexDirection: 'row'}}>

								<View style={{flex:4}}>
									<Text style={{marginBottom: 10, padding:10, fontSize:10, paddingTop:0, color:'#06B4FF'}}>
										23/09/2020 
									</Text>
								</View>

								<View style={{flex:1}}>
									<Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
										<FontAwesome style={{flex:1}} name={'bookmark-o'} size={16} color="gray"/>
									</Text>
								</View>

								<View style={{flex:1, }}>
									<Text style={{ marginBottom: 10, padding:5, fontSize:10, paddingTop:0}}>
										<FontAwesome style={{flex:1}} name={'share'} size={16} color="gray"/>
									</Text>
								</View>
							</View>
					    </Card>
					</TouchableOpacity>
			    </View>
		)
	}


	React.useLayoutEffect(() => {  
		//console.log('hello nr');
		setItem(route.params);

		setTimeout(() => {
         
		console.log('okajj');	
			//console.log(columnB.length);
	       // setActuList(dataReplays.splice(0, 4));
	        //setIsLoaded(true);
	    }, 1000);

  	}, [navigation]);
		

  	return (
	    <FlatList

	    	style={{flex:1, backgroundColor:'white'}}
	    	ListHeaderComponent={
		    	<View style={{flex:1}}>
			    	<View style={{backgroundColor:'black', paddingTop:0, marginTop:0,flex:1}}>
				  		<RCTYouTubeExample idVideo={item.url}/>
					</View>
					<View style={{ backgroundColor:'#ededed'}}>
						<View style={{flexDirection: 'row', backgroundColor:'#ededed'}}>
							<Text numberOfLines={3} style={{marginBottom: 10, padding:10,paddingBottom:0,fontSize:14}}>
								{item.titre}
							</Text>
						</View>
						<View style={{flexDirection: 'row',}}>

							<View style={{flex:6}}>
								<Text style={{marginBottom: 10, padding:10, fontSize:10, paddingTop:0, color:'#06B4FF'}}>
									23/09/2020 
								</Text>
							</View>

							<View style={{flex:1}}>
								<Text style={{ marginBottom: 10, padding:10, fontSize:10, paddingTop:0, marginRight:-5,}}>
									<FontAwesome style={{flex:1}} name={'bookmark-o'} size={18} color="gray"/>
								</Text>
							</View>

							<View style={{flex:1, }}>
								<Text style={{ marginBottom: 10, padding:5, fontSize:10, paddingTop:0}}>
									<FontAwesome style={{flex:1}} name={'share'} size={18} color="gray"/>
								</Text>
							</View>
										
						</View>
					</View>
					<View>
					<Header
			  					placement="left"
			  					leftComponent={{ icon: 'repeat', color: 'gray' }}
			  					centerComponent={{ text: 'REGARDER AUSSI', style: { color: '#4C4C4C' } }}
			  					containerStyle={{
			    		 			backgroundColor: 'white',
			    					paddingTop: 0,
			    					height:50
			  					}}
					/>
					</View>
				</View>
			}
			
			numColumns={2}                  // set number of columns 
			columnWrapperStyle={{ flex: 1}}  // space them out evenly
			data={dataReplays}
			keyExtractor={(item) => item.id.toString()}
			renderItem={(item) =>  
				<ReplayCard article={item} navigation={navigation}  />
        	}
		/> 
		      

		
  	);



}

const styles = StyleSheet.create({

  main_container: {
  		flex:1,
  		backgroundColor:'white',
  },

  loadingCover: {
  		
  		backgroundColor:'#fff',
  		justifyContent: 'center',
  		alignItems: 'center', 
    	position: 'absolute',
    	top: 0,
    	left: 0,
    	right: 0,
    	bottom: 0,
    	backgroundColor: 'transparent',
  	},

})


