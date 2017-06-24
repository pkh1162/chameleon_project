import React from "react";
import ArticleCard from "./ArticleCard.js";
import SideArticle from "./SideArticle.js";


const RowType = (props) => {
    let cardStyle;

    console.log("the row type prop is: ", props.rowType);
    if (props.rowType === 1){
        console.log("row type one")
        cardStyle = {
            cardWidth: "97%",
            imgHeight: ""
        }

        /*
        return (    
        <div style={{display:"flex", flexWrap:"wrap", justifyContent: "space-around", margin: "5px 0px"}}>
            {props.articles.map((article, index) => {
                    return (
                        <SideArticle
                            imgUrl={article.urlToImage}
                        />
                    )                   
                })}
        </div>
        )
        */


    }

    if (props.rowType === 2){
        console.log("row type two")
        cardStyle = {
                cardWidth : "47%",
                imgHeight : "200px"
            }
    }

    if (props.rowType === 3){
        console.log("row type three")
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
                            title={article.title}
                            description={article.description}
                        />
                    )                   
                })}
        </div>
    )
    
}

export default RowType;