import React from "react";
import ArticleCard from "./ArticleCard.js";



const RowType = (props) => {
    let cardStyle;
    
    switch(props.rowType){
        case 1 :
            cardStyle = {
                cardWidth: "97%",
                imgHeight: ""
            }
            break;
        case 2 :
            cardStyle = {
                cardWidth : "47%",
                imgHeight : "200px"
            }
            break;
        case 3 :
            cardStyle = {
                cardWidth : "30%",
                imgHeight : "130px"
            }
            break;
        default : 
            cardStyle = {
                cardWidth : "30%",
                imgHeight : "130px"
            }
    }
        


    return (
        <div style={{display:"flex", flexWrap:"wrap", justifyContent: "space-around", margin: "9px 0px"}}>
            {props.articles.map((article, index) => {
                    return (
                        <ArticleCard
                            key={index}
                            source={article.source}
                            cardWidth={cardStyle.cardWidth}
                            imgHeight={cardStyle.imgHeight}
                            imgUrl = {article.urlToImage} 
                            url = {article.url}
                            title={article.title}
                            description={article.description}
                        />
                    )                   
                })}
        </div>
    )
    
}

export default RowType;