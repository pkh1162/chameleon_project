export const REQUEST_MULTI_SOURCES = "REQUEST_MULTI_SOURCES";
export const RETREIVED_SOURCE = "RETREIVED_SOURCE";
export const RETREIVED_ALL_SOURCES = "RETREIVED_ALL_SOURCES";
export const ERROR_RETREIVING_SOURCES = "ERROR_RETREIVING_SOURCES";


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



const fetchSources = (source) => {
    console.log("in search bars innner fetch");
    return fetch("https://newsapi.org/v1/articles?source=" + source + "&sortBy=latest&apiKey=bb40bd039d1c4a1cad1325910d1674f3")
            .then(res => {
                if(res.ok){
                return res.json()
                }
            
                throw new Error("fetch response failed");
            
            })
            .then(data => {
                console.log("in fetch sources, return data is: ", data)
                return data
            })
    
}

export const fetchMultiNews = (newsSources) => {
    console.log("in fetch multi news, action")
    return (dispatch) => {

        dispatch(requestMultiSources());

        let promises = newsSources.map((source) => {
            return fetchSources(source);
        })
    

        Promise.all(promises)
            .then((newsData) => {
                console.log("promises all resolved: ", newsData)
                dispatch(retreivedAllSources(newsData));
            })
            .catch((err) => {
                console.log("Something went wrong with the retreival of sources: ", err.message);
            })
        
        
        
       
    }
}