export const itemHasErrored = (bool) => {
    return {
        type : 'ITEM_HAS_ERRORED',
        hadErrored: bool
    };
}

export const itemsFetchDataSuccess = (items) => {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export const itemsFetchData = (url) => {
    return (dispatch) => {
        fetch(url)
         .then((response) => {
            if(!response.ok) {
                throw Error("fetch response failed");
            }
            
            return response;
        })
        .then((response) => response.json())
        .then((items) => dispatch(itemsFetchDataSuccess(items)))
        .catch(() => dispatch(itemHasErrored(true)));
    };
}