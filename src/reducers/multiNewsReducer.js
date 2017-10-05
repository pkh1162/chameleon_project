import {REQUEST_MULTI_SOURCES, RETREIVED_ALL_SOURCES, CHANGE_NO_ARTICLES_SHOWN} from "../actions/multiNewsAsync.js";
import {giveArticlesSource, concatArticles, sortingFuncs, filterFirstX, chunkIt} from "../dataManipulationFuncs/multiSourceFuncs.js";


const defaultState = {
    isLoading : false,
    multiSources : ["the-next-web", "techcrunch", "ars-technica", "techradar", "the-verge"],
    multiSourceNews : [],
    loadThisManyArticles : 10,
    howManyArticlesAreThere : 0
}

const multiNewsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case (REQUEST_MULTI_SOURCES) :
            return {...state, isLoading : true}
        case (RETREIVED_ALL_SOURCES) :     
            let numberOfArticles = sortingFuncs(concatArticles(giveArticlesSource(action.multiNewsData)));  //Finds how many articles there are 
            let sortedArr = filterFirstX(state.loadThisManyArticles, sortingFuncs(concatArticles(giveArticlesSource(action.multiNewsData))));    //Sort articles by date and filters amount you want
            let chunkedArray = chunkIt(sortedArr);  //Chunks artice array in smaller arrays of length 1 to 3
            return {...state, isLoading : false, multiSourceNews : [...chunkedArray], howManyArticlesAreThere : numberOfArticles.length}
        case (CHANGE_NO_ARTICLES_SHOWN) : 
            return {...state, loadThisManyArticles : action.amount}
        default : 
            return state
    }
}

export default multiNewsReducer;