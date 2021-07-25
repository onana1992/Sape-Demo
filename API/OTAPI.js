
const language = "en";
const apiUrl = "http://otapi.net/service-json";
const instanceKey = "d539cac8-cf64-407d-9170-f7f9aa6c1cac";


export function getAllBrands() {

  const requestUrl= apiUrl+"/GetBrandInfoList?instanceKey="+instanceKey+"&language="+language;
  console.log (requestUrl);
  return fetch(requestUrl)
  .then((response) => response.json())
    .catch((error) => {})

}


export function getAllCategories() {

  const requestUrl= apiUrl+"/GetBrandInfoList?instanceKey="+instanceKey+"&language="+language;
  return fetch(requestUrl)
  .then((response) => response.json())
    .catch((error) => {})
}


export function getSubcategories(IdParent) {

  const requestUrl= apiUrl+"/GetCategorySubcategoryInfoList?instanceKey="+instanceKey+"&language="
    +language+"&parentCategoryId="+IdParent;

  return fetch(requestUrl)
  .then((response) => response.json())
    .catch((error) => {})
}



export function getProducts(idCat,orderby,framePosition,frameSize) {

	const categoryItemFilter ="<SearchParameters><CategoryId>"+idCat+"</CategoryId><OrderBy>"+orderby+"</OrderBy></SearchParameters>";
	
  const requestUrl= apiUrl+"/FindCategoryItemInfoListFrame?instanceKey="+instanceKey+"&language="+language+"&categoryId="+
      idCat+"&categoryItemFilter="+categoryItemFilter+"&framePosition="+ framePosition+"&frameSize="+frameSize;

  //console.log(requestUrl);
  return fetch(requestUrl)
  	.then((response) => response.json())
    .catch((error) => {})

}


export function getproductsBylist(idList) {
  
  const requestUrl= apiUrl+"/GetItemInfoList?instanceKey="+instanceKey+"&language="+language+"&idsList="+
      idList;
  console.log(requestUrl);
  return fetch(requestUrl)
    .then((response) => response.json())
    .catch((error) => {})

}




export function getProductByBrands(idBrand,orderby,framePosition,frameSize) {

  const param ="<SearchItemsParameters><BrandId>"+idBrand+"</BrandId><OrderBy>"+orderby+"</OrderBy></SearchItemsParameters>";
 
  const requestUrl= apiUrl+"/SearchItemsFrame?instanceKey="+instanceKey+"&language="+language+"&xmlParameters="+param+"&framePosition="+ framePosition+"&frameSize="+frameSize;
 // console.log(requestUrl);
  return fetch(requestUrl)
    .then((response) => response.json())
    .catch((error) => {})

}

export function getProductBySeller(idvendor,orderby,framePosition,frameSize) {

  const param ="<SearchItemsParameters><VendorId>"+idvendor+"</VendorId><OrderBy>"+orderby+"</OrderBy></SearchItemsParameters>";
 
  const requestUrl= apiUrl+"/SearchItemsFrame?instanceKey="+instanceKey+"&language="+language+"&xmlParameters="+param+"&framePosition="+ framePosition+"&frameSize="+frameSize;
  console.log(requestUrl);
  return fetch(requestUrl)
    .then((response) => response.json())
    .catch((error) => {})

}




export function getCategorieInfo (idCat) {

  const requestUrl= apiUrl+"/GetCategoryInfo?instanceKey="+instanceKey+"&language="+language+"&categoryId="+idCat;
    return fetch(requestUrl)
  	.then((response) => response.json())
    .catch((error) => {})

}


export function getProductInfo (idProd) {

  const requestUrl= apiUrl+"/GetItemInfo?instanceKey="+instanceKey+"&language="+language+"&itemId="+idProd;
  console.log(requestUrl);
    return fetch(requestUrl)
    .then((response) => response.json())
    .catch((error) => {})

}


export function getVendorInfo (idVendeur) {

  const requestUrl= apiUrl+"/GetVendorInfo?instanceKey="+instanceKey+"&language="+language+"&vendorId="+idVendeur;
    //console.log(requestUrl);
    return fetch(requestUrl)
    .then((response) => response.json())
    .catch((error) => {})
}


export function getProductDesc(itemId) {

  const requestUrl= apiUrl+"/GetItemDescription?instanceKey="+instanceKey+"&language="+language+"&itemId="+itemId;
    console.log(requestUrl);
    return fetch(requestUrl)
    .then((response) => response.json())
    .catch((error) => {})

}





export function CategoryIcon(cat) {

        switch(cat) {
          case "Clothing":
            return "http://data.otcommerce.com/public/catalog/picture/odezda/zhenskaja-odezhda.png"
            break;

          case "Footwear":
            return  "http://data.otcommerce.com/public/catalog/picture/obuv/zhenskaja-obuv.png"
            break;

          case "Handbags, Wallets":
            return  "http://data.otcommerce.com/public/catalog/picture/sumki/sumki-cherez-plecho.png"
            break;

          case "Accessories":
            return  "http://data.otcommerce.com/public/catalog/picture/aksessuary/chasy-naruchnye.png"
            break;

          case "Children's World":
            return   "http://data.otcommerce.com/public/catalog/picture/detskii-mir/aksessuary-dlja-detej.png"
            break;

          case "Goods for child care, products for expectant mothers" :
            return  "http://data.otcommerce.com/public/catalog/picture/detskii-mir/tovary-dlja-uhoda-za-rebenkom.png"
            break;

          case "Sports goods" :
            return  "http://data.otcommerce.com/public/catalog/picture/sportivnye-tovary/badminton.png"
            break;

          case "Goods for tourism and recreation"  :
            return  "http://data.otcommerce.com/public/catalog/picture/tovary-dlya-turizma/rybolovnye-snasti.png"
            break;

          case "Computers, laptops, office equipment":
            return   "http://data.otcommerce.com/public/catalog/picture/kompjutery-noutbuki-orgtehnika/rabochie-stancii-monobloki.png"
            break;

          case "Health and Beauty"  :
            return  "http://data.otcommerce.com/public/catalog/picture/krasota-zdorove/kosmetika-dekorativnaja-parfjumerija.png"
            break;

          case "Jewelry" :
            return  "http://data.otcommerce.com/public/catalog/picture/juvelirnye-izdelija-bizhuterija-ukrashenija/juvelirnye-izdelija-bizhuterija-ukrashenija.png"
            break;

          case "Auto and Moto Products"  :
            return   "http://data.otcommerce.com/public/catalog/picture/avto-moto-tovary/salonnye-aksessuary-elementy-tjuninga-salona.png"
            break;

          case "Audio and video"  :
            return  "http://data.otcommerce.com/public/catalog/picture/audio-videotehnika/televizory.png"
            break;


           case "Mobile Electronics"  :
            return  "http://data.otcommerce.com/public/catalog/picture/mobilnaya-elektronika/planshetnye-pk.png"
            break;


         case "Photo, video, optics"   :
            return  "http://data.otcommerce.com/public/catalog/picture/foto-video-optika/opticheskie-pribory.png"
            break;

         case "Home Appliances"   :
            return  "http://data.otcommerce.com/public/catalog/picture/bytovaja-tehnika/melkaja-bytovaja-tehnika.png"
            break;

         case "Home"   :
            return  "http://data.otcommerce.com/public/catalog/picture/tovary-dlja-doma/osvetitelnaja-tehnika.png"
            break;

         case "Bed linen, home textiles"     :
            return   "http://data.otcommerce.com/public/catalog/picture/postelnoe-bele-tekstil-dlja-doma/postelnye-prinadlezhnosti.png"
            break;

        case "Tableware, kitchenware"  :
            return   "http://data.otcommerce.com/public/catalog/picture/posuda-kuhonnye-prinadlezhnosti/kruzhki-grafiny-termosy-butylki.png"
            break;

        case "Tableware, kitchenware"  :
            return   "http://data.otcommerce.com/public/catalog/picture/posuda-kuhonnye-prinadlezhnosti/kruzhki-grafiny-termosy-butylki.png"
            break;

        case "Musical Instruments"  :
            return  "http://data.otcommerce.com/public/catalog/picture/muzykalnye-instrumenty/drugie-kitajskie-muzykalnye-instrumenty.png"
            break;


        case "Products for adults"  :
            return  "http://data.otcommerce.com/public/catalog/picture/tovary-dlja-vzroslyh/sredstva-kontracepcii-i-planirovanija-beremennosti.png"
            break;

        case "Food and drinks"  :
            return   "http://data.otcommerce.com/public/catalog/picture/produkty-napitki/suhofrukty.png"
            break;

        case "Interior decoration, gifts, wedding products":
            return   "http://data.otcommerce.com/public/catalog/picture/dekor-interera-suveniry-svadebnye-tovary/rezba.png"
            break;

        case "Furniture for home"  :
            return    "http://data.otcommerce.com/public/catalog/picture/mebel-dlja-doma/krovati.png"
            break;

        case "Construction, Decoration Materials"   :
            return  "http://data.otcommerce.com/public/catalog/picture/stroitelnye-otdelochnye-materialy/okna.png"
            break;

        case "Tool" :
            return   "http://data.otcommerce.com/public/catalog/picture/instrument/skobjanye-izdelija.png"
            break;

        case "Other sections":
            return   "http://data.otcommerce.com/public/catalog/picture/drugie-rubriki/kanctovary.png"
            break;

          default:
            // code block
        }
}




