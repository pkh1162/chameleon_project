import React from "react";

const style = {
    padding: "10px",
    width: "100%",
    background: "red"
}

const SideArticle = (props) => {
    return (
        <div style={style}>
            <img style={{width: "350px", height: "220px"}} src={props.imgUrl}/> 
        </div>
    )
}

export default SideArticle;