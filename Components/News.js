import React, { useState } from 'react';
import { View, TextInput, Text,StyleSheet,FlatList,ActivityIndicator,Modal,TouchableHighlight,Dimensions,TouchableOpacity,Image,} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActionButton from 'react-native-action-button';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import TextTicker from 'react-native-text-ticker';
import dataReplays from '../data.json';
import {SwipeablePanel} from 'rn-swipeable-panel';
import  NewsModal from './NewsModal';
import RCTYouTubeExample from './RCTYouTubeExample';

const sliderWidth = Dimensions.get('window').width;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const autoplay=true;



const Actus=[

	{
		id: 0,
		name : 'nnnnn'
	},
	{
		id: 1,
		name : 'nnnnn'
	},
	{
		id: 2,
		name : 'nnnnn'
	},
	{
		id: 3,
		name : 'nnnnn'
	},
	{
		id: 4,
		name : 'nnnnn'
	},
	{
		id: 5,
		name : 'nnnnn'
	},

	{
		id: 6,
		name : 'nnnnn'
	},

	{
		id: 7,
		name : 'nnnnn'
	}

]

const Tags=[

	{
		id: 0,
		name : 'nnnnn'
	},
	{
		id: 1,
		name : 'nnnnn'
	},
	{
		id: 2,
		name : 'nnnnn'
	},
	{
		id: 3,
		name : 'nnnnn'
	},
	{
		id: 4,
		name : 'nnnnn'
	},
	{
		id: 5,
		name : 'nnnnn'
	}
]


function getData() {
    setTimeout(() => {
         //this.setState({ dataLoaded: true })
    }, 3000);
}



function TagView (){
	return(
		<Text>#politique</Text>
	)
}


function renderItem ({item, index}) {

	  if(item.id==0){
		  	 return (
	            <Text style={{color:'black',fontSize:16}}>toute l'actu</Text>
	        );
	  }

	  if(item.id==1){
		  	 return (
	            <Text style={{color:'red',fontSize:16}}>#Politique</Text>
	        );
	  }

	  if(item.id==2){
		  	 return (
	            <Text style={{color:'green',fontSize:16}}>#Santé</Text>
	        );
	  }

	  if(item.id==3){
		  	 return (
	            <Text style={{color:'orange', fontSize:16}}>#Sport</Text>
	        );
	  }

	   if(item.id==4){
		  	 return (
	            <Text style={{color:'blue', fontSize:16}}>#Culture</Text>
	        );
	  }

	  if(item.id==5){
		  	 return (
	            <Text style={{color:'gray', fontSize:16}}>#Étranger</Text>
	        );
	  }
       
}


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



function NewsScreen({ navigation }) {

	const [replayList,setReplayList] = useState([]);
	const [isLoaded,setIsLoaded] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

    const IoniconsHeaderButton = (props) => (
  		<HeaderButton {...props} IconComponent={FontAwesome} iconSize={23} color="#4C4C4C" />
   	);
 
	const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
 
	const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;


	React.useLayoutEffect(() => {

		
        //console.log(navigation.gerouslyGetParent);
       // console.log(navigation.dangerouslyGetParent());
		//navigation.reset();	
     

	    // simulation de la requete reseaux
		setTimeout(() => {
	        setReplayList(dataReplays);
	        setIsLoaded(true);
	    }, 1000);

    	navigation.setOptions({
      		// in your app, extract the arrow function into a separate component
     		// to avoid creating a new one every time
	      	headerRight: () => (

		        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
		          <Item title="search" iconName="bell-o" onPress={() => alert('search')} />
		          <Item title="search" iconName="bookmark-o" onPress={() => alert('search')} />
				</HeaderButtons>
	        ),
    	});
  	}, [navigation]);

  	
  	return (

   		isLoaded ? 
               
		   		<View style={{flex:1}}>
   	      
			       	<View style={{ flexDirection:'row',height:30,alignItems: 'center',justifyContent: 'center',backgroundColor: '#4C4C4C'}}>
			        	<View style={{flex:2}}>
			        	    <Text style={{fontSize:12,color:'white',fontWeight:'bold',textAlign:'center'}}>FLASH INFO </Text>
			        	</View>	

			        	<View style={{flex:6}}>
						    <TextTicker
						        style={{ fontSize: 12}}
						        animationType='auto'
						        duration={20000}
						        scrollSpeed={5}
						        loop
						        repeatSpacer={50}
						        marqueeDelay={1000}
						    >
						    <Text style={{color:'white'}}>Super long piece of text is long. The quick brown fox jumps over the lazy dog***Super long piece of text is long. The quick brown fox jumps over the lazy dog</Text>
						         
					        </TextTicker>
				        </View>
			      	</View>

			      	<View style={{backgroundColor:'white',paddingBottom:5, paddingTop:5}}>
		        		
			        	<Carousel
				              layout={"default"}
				              data={Tags}
				              renderItem={renderItem}
				              sliderWidth={viewportWidth}
				              itemWidth={90}
				              firstItem={2}
				              loop={autoplay}
				        />
				    </View>

			      	<View style={{marginBottom:20}} >
				      	<FlatList 
				      		style={{marginBottom:10}}
			        		numColumns={2}                  // set number of columns 
			        		columnWrapperStyle={{ flex: 1}}  // space them out evenly
			            	data={replayList}
			            	keyExtractor={(item) => item.id.toString()}
			            	renderItem={(item) =>  <ReplayCard  article={item} navigation={navigation} />
        							  }
			            /> 
		            </View>
		        </View> 
		    	:
			    <View style={{flex:1, backgroundColor:"white"}}>
				    <View style={styles.loadingCover}>
				            <ActivityIndicator
				               color='#06B4FF'
				               size='large' />
				            <Text style={{marginTop:20,color:'gray',fontSize:12}}>Chargement,veuillez patienter ...</Text>
				        
			        </View>
		        </View>
  );
}






const NewsStack = createStackNavigator();

export default  function NewsStackScreen() {
  return (
    <NewsStack.Navigator
    	headerMode='screen'
    	mode="modal"

    	screenOptions={{
            
		    headerStyle: {
		        backgroundColor: '#06B4FF',
		    },
		    
	        headerTintColor: '#4C4C4C',
	        headerTitleAlign:'center',
	        headerTitleStyle: {
            	fontSize:20,
            },
		        
      	}}      
    >

	 	<NewsStack.Screen 
	    	name="Vision 4 Tv" 
	        headerMode='screen'
	    	component={NewsScreen}
	    	options={{ 

	      		title: 'Vision 4 Tv',
	      		headerMode: 'screen',
	      		headerStyle: {
	            	backgroundColor: '#fff',
	            }


	      	}}
	    />

	    <NewsStack.Screen 
	    	name="modal" 
	        headerMode='screen'
	    	component={NewsModal}
	    	options={{ 

	      		title: '',
	      		headerMode: 'screen',
	      		headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }

	      	}}
	    />
    </NewsStack.Navigator>
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