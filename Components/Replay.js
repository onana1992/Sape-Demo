import * as React from 'react';
import { View, TextInput, Text,StyleSheet,FlatList,ActivityIndicator,TouchableHighlight,style,Dimensions,ScrollView  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, HeaderButton,Item, HiddenItem,OverflowMenu} from 'react-navigation-header-buttons';
import TextTicker from 'react-native-text-ticker';
import Carousel from 'react-native-snap-carousel';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';

const list = [0,1,2,3,4,5,6,7,8,9]
var sourceImage = require('../assets/Images/play.png');
const activeIndex= 0
const autoplay=false
const loop =true
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


function ReplayCard (){

	return(

		<Card containerStyle={{padding:0,margin:5,marginBottom:10, borderRadius:5 }} >
						 
			<Card.Image style={{width:'100%',paddingLeft:0,height:130,borderTopLeftRadius:5,borderTopRightRadius:5}}  source={{uri:"https://gentlemanmoderne.com/wp-content/uploads/2017/11/Nike-histoire.jpeg"}} />
						  		
			<View style={{flexDirection: 'row'}}>
				<Text style={{marginBottom: 10, padding:10,paddingBottom:0,fontSize:12}}>
					Bulletin d'information de la mi-journé  - 23/09/2020
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
	)
}

function VoirToutScreen(props) {
  
   if(props.categorie =="replay"){
   		return(
		    <View>
				<Text onPress={() => props.navigation("Replay")}
				 style={{marginTop:20,fontSize:12,color: '#06B4FF'}}> Plus de détails</Text>
			</View>
	   )
   }
	
}




function ReplayScreen({ navigation }) {

	function navigate(page) {
      navigation.navigate(page)
	}

	const IoniconsHeaderButton = (props) => (
  		// the `props` here come from <Item ... />
  		// you may access them and pass something else to `HeaderButton` if you like
  		<HeaderButton {...props} IconComponent={FontAwesome} iconSize={23} color="#4C4C4C" />
   );
 
	const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
 
	const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

	React.useLayoutEffect(() => {

    	navigation.setOptions({
      		// in your app, extract the arrow function into a separate component
     		// to avoid creating a new one every time
      		headerRight: () => (
        		<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>

          		<Item title="search" iconName="bell-o" onPress={() => alert('search')} />
          		<Item title="search" iconName="bookmark-o" onPress={() => alert('search')} />

		          {/*<ReusableSelectItem onPress={() => alert('Edit')} />*/}

		          {/*<OverflowMenu
		            style={{ marginHorizontal: 10 }}
		            OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />}
		          >
		            <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
		            <ReusableHiddenItem onPress={() => alert('hidden2')} />
		          </OverflowMenu>*/}

		        </HeaderButtons>
        	),
    	});
  	}, [navigation]);

  return (
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

      		<ScrollView style={{flex:1}}>

		        <View style={{flex:1,backgroundColor:'white', marginTop:10 }}>
		            <Header
	  					placement="left"
	  					centerComponent={{ text: 'JOURNAL DE 20H', style: { color: '#4C4C4C' } }}
	  					rightComponent={<VoirToutScreen navigation={navigate} categorie="replay"/> }
	  					containerStyle={{
	    		 			backgroundColor: 'white',
	    					paddingTop: 0,
	    					height:50
	  					}}
					/>

			    	<Carousel
			    	  style={{marginLeft:0}}
		              layout={"default"}
		              data={carouselItems}
		              renderItem={ReplayCard}
		              sliderWidth={400}
		              itemWidth={200}
		              firstItem={1}
		             
			          loop={loop}
		        	/>
		        </View>

		        <View style={{flex:1,backgroundColor:'white', marginTop:10 }}>
		            <Header
	  					placement="left"
	  					centerComponent={{ text: 'JOURNAL DE L\'AFRIQUE ', style: { color: '#4C4C4C' } }}
	  					rightComponent={<VoirToutScreen navigation={navigate} categorie="replay"/> }
	  					containerStyle={{
	    		 			backgroundColor: 'white',
	    					paddingTop: 0,
	    					height:50
	  					}}
					/>

			    	<Carousel
			    	  style={{marginLeft:0}}
		              layout={"default"}
		              data={carouselItems}
		              renderItem={ReplayCard}
		              sliderWidth={400}
		              itemWidth={200}
		              firstItem={1}
		             
			          loop={loop}
		        	/>
		        </View>

		        <View style={{flex:1,backgroundColor:'white', marginTop:10 }}>
		            <Header
	  					placement="left"
	  					centerComponent={{ text: 'TOUR D\'HORIZON', style: { color: '#4C4C4C' } }}
	  					rightComponent={<VoirToutScreen navigation={navigate} categorie="replay"/> }
	  					containerStyle={{
	    		 			backgroundColor: 'white',
	    					paddingTop: 0,
	    					height:50
	  					}}
					/>

			    	<Carousel
			    	  style={{marginLeft:0}}
		              layout={"default"}
		              data={carouselItems}
		              renderItem={ReplayCard}
		              sliderWidth={400}
		              itemWidth={200}
		              firstItem={1}
		             
			          loop={loop}
		        	/>
		        </View>

		        <View style={{flex:1,backgroundColor:'white', marginTop:10 }}>
		            <Header
	  					placement="left"
	  					centerComponent={{ text: 'AFRO CAFÉ', style: { color: '#4C4C4C' } }}
	  					rightComponent={<VoirToutScreen navigation={navigate} categorie="replay"/> }
	  					containerStyle={{
	    		 			backgroundColor: 'white',
	    					paddingTop: 0,
	    					height:50
	  					}}
					/>

			    	<Carousel
			    	  style={{marginLeft:0}}
		              layout={"default"}
		              data={carouselItems}
		              renderItem={ReplayCard}
		              sliderWidth={400}
		              itemWidth={200}
		              firstItem={1}
		             
			          loop={loop}
		        	/>
		        </View>

		        <View style={{flex:1,backgroundColor:'white', marginTop:10 }}>
		            <Header
	  					placement="left"
	  					centerComponent={{ text: 'AU COEUR DU MYSTÈRE', style: { color: '#4C4C4C' } }}
	  					rightComponent={<VoirToutScreen navigation={navigate} categorie="replay"/> }
	  					containerStyle={{
	    		 			backgroundColor: 'white',
	    					paddingTop: 0,
	    					height:50
	  					}}
					/>

			    	<Carousel
			    	  style={{marginLeft:0}}
		              layout={"default"}
		              data={carouselItems}
		              renderItem={ReplayCard}
		              sliderWidth={400}
		              itemWidth={200}
		              firstItem={1}
		             
			          loop={loop}
		        	/>
		        </View>
		    </ScrollView>

      
    	{/*<FlatList style={{margin:5}}
        	numColumns={2}                  // set number of columns 
        	columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}  // space them out evenly
            data={list}
            renderItem={(item) => <Text> item </Text> }
        /> */}

    </View>
  );
}



const ReplayStack = createStackNavigator();

export default  function ReplayStackScreen() {
  return (
    <ReplayStack.Navigator
    	headerMode='screen'
    	screenOptions={{
            
		    headerStyle: {
		        backgroundColor: '#06B4FF',
		        //height: 80,
		    },
		    
	        headerTintColor: '#4C4C4C',
	        headerTitleAlign:'center',
	        headerTitleStyle: {
            	//fontWeight: 'bold',
            	fontSize:20,
            },

            headerRight: () => (
	
	     		<View style={{marginRight: 5}}>

	     		    <Text>
		         		<Entypo 
		         			name="dots-three-vertical" 
		         			size={18} 
		         			color="#4C4C4C"
		         			iconStyle={{marginRight: 20}}
		         			onPress={() => alert('Login with Facebook')} />
	         		</Text>
	     		</View>
	 				
	        )
		        
      	}}
    >

	    <ReplayStack.Screen 

	    	name="Vision 4 Tv" 
	    	component={ReplayScreen}
	    	options={{ 

	      		title: 'Vision 4 Tv',
	      		headerMode: 'screen',
	      		//headerTintColor: '#fff',
	      		headerStyle: {
	            	backgroundColor: '#fff',
	            	//height: 90
	            }

	      		/*headerStyle: {
	            	backgroundColor: '#06B4FF',
	            }, 
	            headerTintColor: '#fff',
	            headerTitleStyle: {
	               fontWeight: 'bold',
	           },*/

	      	}}

	    />
    </ReplayStack.Navigator>
  );
}

const styles = StyleSheet.create({

  main_container: {
  		flex:1,
  		backgroundColor:'white',
  },

  row: {
            flex: 1,
            justifyContent: "space-around"
        }

})

