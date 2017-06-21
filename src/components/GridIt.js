import React from "react";
import RowType from "./RowType.js";


const GridIt = (props) => {

    const rowOne = [];
    const rowTwo = [];
    const rowThree = [];

    props.articles.map((article, i) => {
        if (i < 3) 
            rowOne.push(article);
        else if (i < 4)
            rowTwo.push(article);
        else 
            rowThree.push(article)
    })


    return (
        <div style={{display:"flex", width:"100%", alignItems:"space-around", flexWrap:"wrap"}}>
            <RowType articles={rowOne} rowType={rowOne.length}/>
            <RowType articles={rowTwo} rowType={rowTwo.length}/>
            <RowType articles={rowThree} rowType={rowThree.length}/>
        </div>

    )

}

export default GridIt;