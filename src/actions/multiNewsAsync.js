import {NEWS_API_KEY} from "../apiKeys.js";
export const REQUEST_MULTI_SOURCES = "REQUEST_MULTI_SOURCES";
export const RETREIVED_SOURCE = "RETREIVED_SOURCE";
export const RETREIVED_ALL_SOURCES = "RETREIVED_ALL_SOURCES";
export const ERROR_RETREIVING_SOURCES = "ERROR_RETREIVING_SOURCES";
export const CHANGE_NO_ARTICLES_SHOWN = "CHANGE_NO_ARTICLES_SHOWN";



export const requestMultiSources = () => {
    return {
        type : REQUEST_MULTI_SOURCES,
    }
}

export const retreivedAllSources = (multiNewsData) => {
    return {
        type : RETREIVED_ALL_SOURCES,
        multiNewsData
    }
}

export const changeAmountOfArticlesShown = (amount) => {
    return {
        type: CHANGE_NO_ARTICLES_SHOWN,
        amount
    }
}



const fetchSources = (source) => {
    //Fetch API which gets latest news stories from whatever source is passed in.
    return fetch("https://newsapi.org/v1/articles?source=" + source + "&sortBy=latest&apiKey=" + NEWS_API_KEY)
            .then(res => {
                if(res.ok){
                    
                return res.json()
                }
            
                throw new Error("fetch response failed");
            
            })
            .then(data => {
                return data
            })
    
}

export const fetchMultiNews = (newsSources) => {
    //Takes in array of sources and calls the fetch function on each one. Returns promises which when resolved, will update the store
    //with an array of articles.
    return (dispatch) => {

        dispatch(requestMultiSources());

        let promises = newsSources.map((source) => {
            return fetchSources(source);
        })
    

        Promise.all(promises)
            .then((newsData) => {
                dispatch(retreivedAllSources(newsData));
            })
            .catch((err) => {
                console.log("Something went wrong with the retreival of sources: ", err.message);
            })       
    }
}