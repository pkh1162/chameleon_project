import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import test from "../assets/images/test.jpg"



const ArticleCard = (props) => {
    return (
        <Card style={{width: props.cardWidth}}>
            <CardMedia >
                <img style={{height:props.imgHeight}} src={props.imgUrl} alt="" />
            </CardMedia>
            <CardTitle titleStyle={{fontSize:"1.1rem", lineHeight:"1.55rem"}} title={props.title}>
            </CardTitle>
         
         {/*   <CardText style={{fontSize:"1rem"}}>
                {props.description}
            </CardText>*/}
            
        </Card>
    )

    
}

export default ArticleCard;