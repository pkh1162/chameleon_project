import {MEETUPS_API_KEY} from "../apiKeys.js";
import countries from "../countryCodes.js";

const fetchJsonp = require("fetch-jsonp");
export const REQUEST_POSTCODE = "REQUEST_POSTCODE";
export const RETRIEVED_MEETUPS = "RETRIEVED_MEETUPS";
export const CLEAR_MEETUPS_RESULTS = "CLEAR_MEETUPS_RESULTS";
export const UPDATE_SEARCH_POSTCODE = "UPDATE_SEARCH_POSTCODE";
export const CHANGE_MAP_COORDINATES = "CHANGE_MAP_COORDINATES";
export const UPDATE_MARKERS = "UPDATE_MARKERS";
export const UPDATE_SEARCH_WORDS = "UPDATE_SEARCH_WORDS";
export const SEARCHING_ERROR = "SEARCHING_ERROR";

export const updateSearchWords = (city, country) => {
    return {
        type : UPDATE_SEARCH_WORDS,
        city,
        country
    }
}

export const searchingError = () => {
    return {
        type: SEARCHING_ERROR
    }

}

export const clearMeetupsResults = () => {
    return {
        type : CLEAR_MEETUPS_RESULTS
    }
}


export const requestPostcode = (postcode) => {
    return {
        type : REQUEST_POSTCODE,
        postcode 
    }
}

export const retrievedMeetups = (meetupsResults, markers) => {
    return {
        type : RETRIEVED_MEETUPS,
        meetupsResults,
        markers
    }
}

export const changeMapCoordinates = (location) => {
    return {
        type: CHANGE_MAP_COORDINATES,  
        location
    }
}

export const updateSearchPostcode = (searchPostcode) => {
    return {
        type : UPDATE_SEARCH_POSTCODE,
        searchPostcode
    }
}

export const updateMarkers = (markerId) => {
    return {
        type: UPDATE_MARKERS,
        markerId
    }
}

const removeHTML = (summary) => {
    let div = document.createElement("div");
    div.innerHTML = summary;
    let text = div.textContent || div.innerText || "";
    return text;
}


const extractMarker = (location) => {
    let {lon, lat, name} = location.venue;
    return {
        position: {
            lng: lon,
            lat: lat,
            name
        }, 
        key: location.id, 
        name: location.name,
        infoboxOpen: false
    }
}




export const getMeetupsResults = (postcode, loading, city, country) => {
    return (dispatch) => {
        dispatch(requestPostcode(postcode));
           let str = "";
           let str1 = "";
           let countryEntry = {};

            if(postcode){
                str1 = postcode.replace(/\s\s+/g, ' ');     //Replace multiple spaces with one space.      
                str = str1.replace(/ /g, '+').toUpperCase();              //The concierge api only seems to working when spaces are encoded as +, and not through normal encoding.
            }
            else {
                country = country.toLowerCase();
                city = city.toLowerCase();

                countryEntry = countries.find((x,i) => {
                    return (x.name === country || x.code === country.toUpperCase());
                })
            
                if(countryEntry){
                    country = countryEntry.code;
                }
            
            }

            
            let uri = postcode ?
            "https://api.meetup.com/2/concierge?zip=" + str + "&offset=0&radius=50&format=json&photo-host=public&page=500&key=" + MEETUPS_API_KEY
            :
            "https://api.meetup.com/2/concierge?country=" + country + "&city="+ city + "&offset=0&radius=50&format=json&photo-host=public&page=500&key=" + MEETUPS_API_KEY;
            

            fetchJsonp(uri)           
            .then(res => {
                return res.json()
            })
            .then(data => {
                let markerArray = [];
                let modifiedData = 
                data.results
                .filter(y => y.venue)
                .map(x => {
                    x.description = removeHTML(x.description);
                    markerArray.push(extractMarker(x));

                    return x
                })

                dispatch(retrievedMeetups(modifiedData, markerArray))
            })
            .catch(e => {
               dispatch(clearMeetupsResults());
               dispatch(searchingError());
            })
          

        }
        
}


