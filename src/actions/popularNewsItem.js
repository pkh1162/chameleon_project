export const itemHasErrored = (bool) => {
    return {
        type : 'ITEM_HAS_ERRORED',
        hadErrored: bool
    };
}

export const articlesFetchDataSuccess = (items) => 
{
    return { type: 'ITEMS_FETCH_DATA_SUCCESS', items };
}

export const itemsFetchData = (url) => 
{
    return (dispatch) => 
    {
        fetch(url)
         .then((response) => 
        {
            if(!response.ok) 
            {
                throw Error("fetch response failed");
            } 
            
            return response;
        })
        .then((response) => response.json())
        .then((responseJson) => {            dispatch(articlesFetchDataSuccess(responseJson))
        } )
        .catch(() => dispatch(itemHasErrored(true)));
    };
}