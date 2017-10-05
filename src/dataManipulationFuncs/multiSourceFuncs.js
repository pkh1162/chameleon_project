///News Page Functions///////////////////////////////////////

export const giveArticlesSource = (newsArray) => {
    return newsArray.map(newsObj => {
        return newsObj.articles.map(article => {
            article.source = newsObj.source; 
            return article;
        })
    })
}

export const concatArticles = (newsArticles) => {
    return newsArticles.reduce((a, newsArray) => {
        return a.concat(newsArray);
    }, [])
}

export const latest = (a,b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export const sortingFuncs = (articlesArray, sortBy=latest) => {
    return articlesArray.sort(sortBy);
}

export const filterFirstX = (x=10, array) => {
    return array.filter((a, index) => {
        return index < x;
    })
}


export const chunkIt = (chunkThis) => {
    let randoms = chunkThis.map(x => {
        return Math.floor((Math.random()*3) + 1);
    })

    let chunkedArray = randoms.map(x => {
        if (chunkThis.length !== 0){
            return chunkThis.splice(0, x);  
        }  
        return null;
    })

    return chunkedArray.filter(x => {
        if(x)
            return true;
        else
            return false;
    }) 

    
}

//////////////////////////////////////////////////////////////////////



//Meetups Functions///////////////////////////////////////////////////


export const chunkMeetups = (results) => {
    /* Method used for pagination:
        -Take meetup results and chunk them into arrays of number 'pageCount - 1', 
        -Add each seperate array to container array.   
    */
    let meetupsPerPage = 6; 
    let onePage = [];
    let allPages = [];

    let count = 1;
    
    results.map((meetup,i) => {   
        if(count < meetupsPerPage){
            onePage.push(meetup);
        }
        if (count > 5 || i > results.length-2){
            allPages.push(onePage);
            onePage = [];
            count = 0;
        }
        count++; 
        return true;
    })

    return allPages;
}

////////////////////////////////////////////////////////////////////
