import React from "react";



import TextField from 'material-ui/TextField';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';


export const Searcher = (props) => {
    let paperStyle = {border: "none"};
    if(!props.paperStyle){
        paperStyle = {margin:"7px",width: "95%", borderTop:"1px solid black"}
    }
    //
    return (
        <div>
            <Paper style={paperStyle} zDepth={1}>
                {props.displayCard &&
                <div>
                    <ListItem 
                        style={{cursor: "default", textAlign:"left"}}
                        secondaryTextLines={2} 
                        primaryText={props.primaryText}
                        secondaryText={    
                            <p style={{width: "100%"}}>
                                {props.secondaryText}
                            </p>      
                        }
                    >
                    </ListItem>
                    <Divider />
                </div>
                }
                            
                
            </Paper>
        <form className={props.formClass} onSubmit={props.submit} style={props.style}>
            <div>
                {props.inputs.map((x,i) => {
                    return (
                        <div key={i}>
                            <TextField
                                autoComplete="off"
                                style={{margin: "20px"}} 
                                name={x.textName} 
                                floatingLabelText={x.textLabel}
                                errorText={x.errorText}
                                errorStyle={x.errorStyle} 
                                onChange={x.changeMethod}
                                value={x.textValue}
                            />
                            <FlatButton
                                style={x.btnStyle} 
                                className={x.btnClass} 
                                onTouchTap={x.clickMethod} 
                                icon={<i className="fa fa-close"></i>}
                            />
                        </div>
                    )
                })}

            </div>

            <div className="form-controls">
                {props.buttons.map((control,i) => {
                    return (
                        <FlatButton 
                            key={i} 
                            icon={<i className={control.iconClass}></i>}    
                            type={control.type} 
                            primary={control.primary} 
                            style={control.style}
                            onTouchTap={control.clickMethod}
                        />
                    )
                })}
            </div>
            
        </form>
        </div>

    )

}


/*
//////////////////////////////Country and City///////////////////////////////////////////
<form className="world-form" onSubmit={this.formSubmitted2} style={{display: "inline-flex", alignItems: "stretch"}}>
<div>
    <div>
        <TextField
            autoComplete="off" 
            style={{margin: "5px", position: "relative"}} 
            name="country" 
            floatingLabelText={countryPlaceholder}
            errorText={this.state.errorText}
            errorStyle={{position: 'absolute', top: '70px'}} 
        />
        <FlatButton className="countryBtn" onTouchTap={this.clearResults} icon={<i className="fa fa-close"></i>}/>
    </div>
    <div>
        <TextField
            autoComplete="off" 
            style={{margin: "5px", position: "relative"}} 
            name="city"               
            floatingLabelText={cityPlaceholder}
            errorText={this.state.errorText}
            errorStyle={{position: 'absolute', top: '70px'}} 
        />
        <FlatButton className="cityBtn" onTouchTap={this.clearResults} icon={<i className="fa fa-close"></i>}/>
    </div>
</div>

<div className="form-controls">
    <FlatButton icon={<i className="fa fa-search"></i>} type="submit" primary={true} style={{color:"white"}}/>
</div>
</form>
//////////////////////////////Country and City///////////////////////////////////////////



////////////////////////////USA Searcher//////////////////
<form onSubmit={this.formSubmitted}>
    <div>
        <TextField
            autoComplete="off" 
            style={{margin: "20px"}} 
            name="searchTerm" 
            value={this.props.searchTerm || ""} 
            onChange={this.handleSearch} 
            floatingLabelText={searchPlaceholder}
        />
        <FlatButton style={{color: "black"}} onTouchTap={this.clearResults} icon={<i className="fa fa-close"></i>}/>
    </div>                        
    <div className="form-controls">
        
        <FlatButton style={{color: "white"}} icon={<i className="fa fa-search"></i>} type="submit" secondary={true}/>
    </div>
</form>

/////////////////////////USA Searcher////////////////////////



///////////////NewItems Searcher/////////////////////////////////
<form onSubmit={this.formSubmitted}>
    <div>
        <TextField
            autoComplete="off" 
            style={{margin: "20px"}} 
            name="searchTerm" 
            value={this.props.searchTerm} 
            onChange={this.handleSearch} 
            floatingLabelText={searchPlaceholder}
        />
    </div>
    <div className="form-controls">
        <FlatButton icon={<i className="fa fa-search"></i>} type="submit" primary={true}/>
        <FlatButton onTouchTap={this.clearResults} icon={<i className="fa fa-close"></i>}/>
    </div>
</form>


//////////////NewsItems Searcher/////////////////////////////////





{
    autoComplete: "off",
    textStyle: {margin: "10px"},
    textName: "country",
    textValue: this.props.countrySearch,
    textLabel: countryPlaceholder,
    errorText: this.state.errorText,
    errorStyle: {position: 'absolute', top: '70px'},
    changeMethod: this.handleSearch,
    btnStyle: null,
    btnClass: "countryBtn",
    clickMethod: this.clearResults,
    iconClass: "fa fa-close"                        
},
{
    autoComplete: "off",
    textStyle: {margin: "10px"},
    textName: "city",
    textValue: this.props.citySearch,
    textLabel: cityPlaceholder,
    errorText: this.state.errorText,
    errorStyle: {position: 'absolute', top: '70px'},
    changeMethod: this.handleSearch,
    btnStyle: null,
    btnClass: "cityBtn",
    clickMethod: this.clearResults,
    iconClass: "fa fa-close"                        
}




autoComplete: "off",
textStyle: {margin: "10px"},
textName: "searchTerm",
textValue: this.props.searchTerm || "",
textLabel: searchPlaceholder,
errorText: "",
errorStyle: {display: "none !important"},
changeMethod: this.handleSearch,
btnStyle: {color: "black"},
btnClass: "",
clickMethod: this.clearResults,
iconClass: "fa fa-close"      




autoComplete: "off",
textStyle: {margin: "10px"},
textName: "searchTerm",
textValue: this.props.searchTerm,
textLabel: searchPlaceholder,
errorText: "",
errorStyle: {display: "none !important"},
changeMethod: this.handleSearch,
btnStyle: {display: "none"},
btnClass: "",
clickMethod: null,
iconClass: "close"        






autoComplete: "off",
---textStyle in css

*/
