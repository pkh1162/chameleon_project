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
