import {REQUEST_POSTCODE, RETRIEVED_MEETUPS, CLEAR_MEETUPS_RESULTS, UPDATE_MARKERS, UPDATE_SEARCH_POSTCODE, CHANGE_MAP_COORDINATES, UPDATE_SEARCH_WORDS, SEARCHING_ERROR} from "../actions/meetupsSearchAsync.js";

const defaultState = {
    meetupsResults : [],
    chunkedResults : [],
    postcode : "",
    city: "",
    country: "",
    isLoading : false,
    markers: [],
    center: {lat:55.8642, lng:-4.2518}
}


const searchError = {
    description: "Please try again.",
    name: "Search error",
    time: 1505847600000
}


const chunkIt = (results) => {
    let tempArr = [];
    let t2 = [];
    let count = 1;
    //console.log("in chunk it: ", results);
    
    results.map((x,i) => {   
        if(count < 6){
            tempArr.push(x);
            //console.log("in less than 5: ", tempArr.length);
        }
        if (count > 5 || i > results.length-2){
            //console.log("in greater than 5: ", tempArr);
            t2.push(tempArr);
            tempArr = [];
            count = 0;
        }
        count++; 
    })

    return t2;
}

const meetupsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SEARCHING_ERROR : 
            console.log("error, searching error, in reducer");
            let newArr = [[searchError]];
            return {...state, chunkedResults: newArr};
        case REQUEST_POSTCODE :
            //console.log("in request search") 
            return {...state, postcode : action.postcode, isLoading : true};
        case RETRIEVED_MEETUPS :
            //console.log("in retreived search: ", action)
            if (action.meetupsResults.length === 0)
                action.meetupsResults = [{headline : {main : "Sorry, no search results"}}]

            let firstEventCenter = {
                lat: action.meetupsResults[0].venue.lat,
                lng: action.meetupsResults[0].venue.lon      
            } 

            let newArray = chunkIt(action.meetupsResults);
            console.log("new array: ", newArray);

            return {...state, meetupsResults : action.meetupsResults, chunkedResults: newArray, markers: action.markers, isLoading : false, center: firstEventCenter};
        case CLEAR_MEETUPS_RESULTS : 
            //console.log("in clear search results, reducer")
            return {...state, meetupsResults : [], markers: [], chunkedResults: [], isLoading: false}
        case UPDATE_SEARCH_POSTCODE : 
            return {...state, postcode : action.searchPostcode}
        case UPDATE_SEARCH_WORDS : 
            return {...state, city : action.city, country: action.country}        
        case CHANGE_MAP_COORDINATES:
            return {...state, center: action.location}
        case UPDATE_MARKERS:
            let updatedMarkers = state.markers.map((marker) => {
                marker.infoboxOpen = false;

                if (marker.key === action.markerId)
                    marker.infoboxOpen = true; 
                
                return marker;
            })
             //console.log("updated markers in reducer are: ", updatedMarkers)
             return {...state, markers: updatedMarkers}

        default : 
            return {...state};
    }

}

export default meetupsReducer;
