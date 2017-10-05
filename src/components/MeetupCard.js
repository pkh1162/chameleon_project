import React from "react";

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


import moment from 'moment';
moment().format();





export const MeetupCard = (props) => {
    return  (
        <div onClick={() => props.panTheMap(props.article)}>
        <Paper style={{margin:"7px", borderTop:"1px solid #FF4081"}} zDepth={1}>
            <ListItem 
                secondaryTextLines={2} 
                primaryText={props.name} 
                secondaryText={
                    <div>
                        <p className="time">{moment(props.time).format('DD/MM/YY')}</p>    
                        <p style={{width: "80%"}}>
                            {props.description}
                        </p>
                    </div>            
                }
            >
                <a style={{position:"absolute", right:"10px", bottom:"5px"}} href={props.event_url}>More details</a>
            </ListItem>
            <Divider />
        </Paper>
        </div>

    )
}