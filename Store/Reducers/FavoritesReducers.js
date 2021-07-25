// Store/Reducers/favoriteReducer.js
import Toast from 'react-native-toast-message';

const initialState = { favoritesProduct: [], cartProduct: [], activeTab:"accueil", favoritesProductsNumber:0, user:null}

function toggleFavorite(state = initialState, action) {
  
   	let nextState

  	switch (action.type) {

    	case 'TOGGLE_FAVORITE':

      		const favoritesProductIndex = state.favoritesProduct.findIndex(item => item.Id === action.value.Id)

      		if (favoritesProductIndex !== -1) {
        			// Le film est déjà dans les favoris, on le supprime de la liste
		        nextState = {
		          ...state,
		          favoritesProduct: state.favoritesProduct.filter( (item, index) => index !== favoritesProductIndex),
              favoritesProductsNumber: state.favoritesProduct.length
		        }

            Toast.show({
              text1: ' le produit a été retirée de vos favoris',
              position: 'bottom'
              //text2: 'This is some something 👋'
            });

      		}

      		else {
		        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
		        nextState = {
		          ...state,
		          favoritesProduct : [...state.favoritesProduct, action.value],
              favoritesProductsNumber : state.favoritesProduct.length
		        }

            Toast.show({
              text1: 'le produit a été  ajoutée dans vos favoris',
              position: 'bottom',
            });
            
      		}

      		return nextState || state

      case 'TOGGLE_CONNECT':

        if ( state.user == null) {
            
            nextState = {
              ...state,
              user : action.value
            }
            Toast.show({
              text1: 'Vous êtes désormais connecté',
              position: 'bottom',
            });
        }

        else{

          nextState = {
              ...state,
              user : null,
              favoritesProduct: [],
               cartProduct: []
            }

          Toast.show({
              text1: 'Vous vous  êtes déconnecté',
              position: 'bottom',
            });

        }

        return nextState || state 

      case 'ADD_CART':

          const cartProductIndex = state.cartProduct.findIndex(item => item.Id === action.value.Id)

          if (cartProductIndex !== -1) {
              // Le film est déjà dans les favoris, on le supprime de la liste
            state.cartProduct.filter( (item, index) => index !== cartProductIndex);

            nextState = {
              ...state,
              cartProduct : [... state.cartProduct.filter( (item, index) => index !== cartProductIndex),action.value ] ,
              
            }


            Toast.show({
              text1: ' le produit a été ajouté dans le panier1 ',
              position: 'bottom'
              //text2: 'This is some something 👋'
            });

          }

          else {
            // Le film n'est pas dans les films favoris, on l'ajoute à la liste
            nextState = {
              ...state,
              cartProduct : [...state.cartProduct, action.value],
              
            }

            Toast.show({
              text1: 'le produit a été  ajoutée dans le panier2 ',
              position: 'bottom',
            });
            
          }

          return nextState || state

      case 'DELETE_CART':

          const cartProductIndex2 = state.cartProduct.findIndex(item => item.Id === action.value.Id)

          if (cartProductIndex2 !== -1) {
              // Le film est déjà dans les favoris, on le supprime de la liste
            nextState = {
              ...state,
              cartProduct: state.cartProduct.filter( (item, index) => index !== cartProductIndex),
              
            }

            Toast.show({
              text1: ' le produit a été retiré du panier ',
              position: 'bottom'
              //text2: 'This is some something 👋'
            });

          }


          return nextState || state

      case 'SET_TAB':

            
        nextState = {
              ...state,
              activeTab : action.value
        }
         
        return nextState || state 

  		default:
   			return state
    }

}

export default toggleFavorite