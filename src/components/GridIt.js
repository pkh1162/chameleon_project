import React from "react";
import RowType from "./RowType.js";
import CircularProgress from 'material-ui/CircularProgress';
              


const GridIt = (props) => {

    if(props.loading){
      return <CircularProgress  color={"red"} style={{verticalAlign:"middle", margin:"40px 0px"}} size={120}/>; 
    }
    else{
        return (
            <div style={{display:"flex", width:"100%", alignItems:"space-around", flexWrap:"wrap"}}>
            {props.articles.map((articleArray, index) => {
                return  <RowType key={index} articles={articleArray} rowType={articleArray.length}/>
            })}
            </div>

        )
    }

}

export default GridIt;