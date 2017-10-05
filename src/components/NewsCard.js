import React from "react";

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


export const NewsCard = (props) => {
    return (
        <a href={props.url}>
            <Paper style={{margin:"7px", borderTop:"1px solid #FF4081"}} zDepth={1}>
                <ListItem 
                    secondaryTextLines={2} 
                    primaryText={props.headline} 
                    secondaryText={
                        <p style={{width: "80%"}}>
                            {props.snippet}
                        </p>    
                    }
                />
            <Divider />
            </Paper>
        </a>

    )
}

