


import React from 'react'
import { View, TextInput, Button, Text,StyleSheet,FlatList,ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'


// Components/Search.js


// Helpers/filmsData.js


class Search extends React.Component {


    constructor(props) {
      super(props)
      //this._films = []
      this.searchedText = ""
      this.page = 0 // Compteur pour connaître la page courante
      this.totalPages = 0

      this.state = {
        films: [] ,
        isLoading: false

      }
    }

   

     _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => { 
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms() 
        })
    }



    _loadFilms() {
        if (this.searchedText.length > 0) {
          this.setState({ isLoading: true })
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page = data.page
              this.totalPages = data.total_pages
              this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
              })
          })
        }
    }

     _searchTextInputChanged(text) {
        this.searchedText= text 
    }

     _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
      }
    }

    
    _displayDetailForFilm = (idFilm) => {
      console.log("Display film with id " + idFilm)
      this.props.navigation.navigate("FilmDetail",{ idFilm: idFilm })
    }



    render() {

        return (
          <View style={styles.main_container}>

            <TextInput
              style={styles.textinput}
              placeholder='Titre du film'
              onChangeText={(text) => this._searchTextInputChanged(text)}
              onSubmitEditing={() => this._searchFilms()}
            />

            <Button title='Rechercher' onPress={() => this._searchFilms()}/>

            <FlatList
              data={this.state.films}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                  if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                     this._loadFilms()
                  }
              }}
            />

            {this._displayLoading()}

            

          </View>
        )
    }
}



const styles = StyleSheet.create({

  main_container: {

  	/*flexDirection: 'column',*/
  	//justifyContent: 'flex-start', //flex-start, center. flex-end, space-between, space-around,space-evenly
  	//alignItems: 'stretch', //center, flex-start, flex-end, stretch
    flex: 1,
    //marginTop: 20
  },

  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },

   loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default Search