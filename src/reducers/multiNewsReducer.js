import {REQUEST_MULTI_SOURCES, RETREIVED_ALL_SOURCES} from "../actions/multiNewsAsync.js";
import {giveArticlesSource, concatArticles, sortingFuncs, latest, filterFirstX} from "../dataManipulationFuncs/multiSourceFuncs.js";


const defaultState = {
    isLoading : false,
    multiSources : ["the-next-web", "techcrunch", "hacker-news"],
    multiSourceNews : [],
}

//, "techcrunch", "hacker-news"



const multiNewsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case (REQUEST_MULTI_SOURCES) :
            console.log("in request reducer")
            return {...state, isLoading : true}
        case (RETREIVED_ALL_SOURCES) :          
            let sortedArr = filterFirstX(6, sortingFuncs(concatArticles(giveArticlesSource(action.multiNewsData))));
            return {...state, isLoading : false, multiSourceNews : [...sortedArr]}
        default : 
            return state
    }
}

export default multiNewsReducer;