import React from "react";
import RowType from "./RowType.js";
import CircularProgress from 'material-ui/CircularProgress';
              


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


    if(props.loading){
      return <CircularProgress  color={"red"} style={{verticalAlign:"middle", margin:"40px 0px"}} size={120}/>; 
    }
    else{
        return (
            <div style={{display:"flex", width:"100%", alignItems:"space-around", flexWrap:"wrap"}}>
                <RowType articles={rowOne} rowType={rowOne.length}/>
                <RowType articles={rowTwo} rowType={rowTwo.length}/>
                <RowType articles={rowThree} rowType={rowThree.length}/>
            </div>

        )
    }

}

export default GridIt;