import React from "react";
import "../styles/articleCard.css";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


import tc from "../assets/images/techcrunch.png";
import tnw from "../assets/images/thenextweb.jpg";
import tv from "../assets/images/theverge.png"
import at from "../assets/images/arstechnica.png"
import tr from "../assets/images/techradar.jpg"

import muiThemeable from 'material-ui/styles/muiThemeable';

const sourcesInfo = {
    "the-next-web" : [tnw, "the next web"],
    "techcrunch" : [tc, "tech crunch"],
    "ars-technica" : [at, "ars technica"],
    "techradar" : [tr,"tech radar"],
    "the-verge" : [tv, "the verge"]
}



const ArticleCard = (props) => {
    let imgSource;
    if (props.imgUrl){
        imgSource = props.imgUrl;
    }
    else {
        imgSource =sourcesInfo[props.source][0];
    }
    return (
    
        <Card id="article-card" zDepth={1} style={{width: props.cardWidth, textAlign:"left"}}>
             <a href={props.url}>
            <CardHeader
                titleColor={props.muiTheme.palette.darkColor}
                titleStyle={{fontSize:"0.8rem"}}
                style={{padding:"10px",  backgroundColor:props.muiTheme.palette.primary1Color}}
                title={(sourcesInfo[props.source][1]).toUpperCase()}
                
            />
            <CardMedia id="card-media" style={{overflow : "hidden"}} >
                <img style={{height:props.imgHeight}} src={imgSource} alt="" />
            </CardMedia>
            <CardTitle titleStyle={{fontSize:"1rem", lineHeight:"1.55rem"}} title={props.title}>
            </CardTitle>
            </a>
        </Card>
        
    )

    
}

export default muiThemeable()(ArticleCard);