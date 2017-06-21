import React from "react";
import ArticleCard from "./ArticleCard.js";

const RowType = (props) => {

    console.log("the row type prop is: ", props.rowType);
    if (props.rowType === 1){
        console.log("row type one")

        return (
            <div style={{display:"flex", flexWrap:"wrap", justifyContent: "space-around", margin: "5px 0px"}}>
                {props.articles.map((article, index) => {
                    return (
                        <ArticleCard
                            key={index}
                            cardWidth="97%"
                            imgWidth="40%"
                            imgHeight=""
                            imgUrl = {article.urlToImage} 
                            title={article.title}
                            description={article.description}
                        />

                    )                   
                })}
            </div>
        )

        

    }

    if (props.rowType === 2){
        console.log("row type two")

        return (
            <div style={{display:"flex", flexWrap:"wrap", justifyContent: "space-around", margin: "5px 0px"}}>
                {props.articles.map((article, index) => {
                    return (
                        <ArticleCard
                            key={index}
                            cardWidth="47%"
                            imgHeight="200px"
                            imgUrl = {article.urlToImage} 
                            title={article.title}
                            description={article.description}
                        />

                    )                   
                })}
            </div>
        )
    }

    if (props.rowType === 3){
        console.log("row type three")
        return (
            <div style={{display:"flex", flexWrap:"wrap", justifyContent: "space-around", margin: "5px 0px"}}>
                {props.articles.map((article, index) => {
                    return (
                        <ArticleCard
                            key={index}
                            cardWidth="30%"
                            imgHeight="130px"
                            imgUrl = {article.urlToImage} 
                            title={article.title}
                            description={article.description}
                        />

                    )                   
                })}
            </div>
        )
    }

    return <div></div>


    
}

export default RowType;