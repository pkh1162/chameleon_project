import React, {Component} from "react";
import {getSearchResults, clearSearchResults, updateSearchWord} from "../actions/searchBarAsync.js";
import {getMeetupsResults, clearMeetupsResults, updateSearchPostcode, changeMapCoordinates, updateSearchWords} from "../actions/meetupsSearchAsync.js";

import {connect} from "react-redux";
import "../styles/searchBar.css"
import  { Route, Link, Switch } from "react-router-dom";



import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chunkIndex : 0,
            errorText: "",
            
            
        }
    }


    handleCountrySearch = (e) => {
        console.log("the searches are: ", e.currentTarget)
        let input = e.target.value.trim();
        if (!input){
            this.props.clearSearchResults();
        }

        this.props.updateSearchWords(this.props.city, input)
    }

    handleSearch = (e) => {
        //console.log("the searches are: ", e.target.value)
        let input = e.target.value.trim();
        if (!input){
            this.props.clearSearchResults();
        }

        this.props.updateSearchTerm(input)
    }

    clearResults = (e) => {
        e.stopPropagation();
       // console.log("the clear button is kndld: ", this.props.searchTerm)
        this.props.updateSearchTerm("")
        this.props.clearSearchResults();
    }

    panTheMap = (e) => {
     //   console.log("in item click: ", this.props.updateCoordinates);
        this.props.updateCoordinates({
            lat: e.venue.lat,
            lng: e.venue.lon
        })
    }

    formSubmitted = (e) => {
        e.preventDefault();
        let searchWord = e.target.searchTerm.value.trim();
        if (searchWord){
            this.props.fetchSearchResults(searchWord, this.props.loading);
        }
        else {
            this.props.clearSearchResults();
        }
    }

    formSubmitted2 = (e) => {
        e.preventDefault();
        let city = e.target.city.value.trim();
        let country = e.target.country.value.trim();

        

        if (city && country){
            this.setState({errorText: ""})
            console.log("form submit2, city: " + city + " : country: " + country);
            this.props.fetchSearchResults(null, this.props.loading, city, country);
        }
        else {
            this.setState({errorText: "both fields required"})
            this.props.clearSearchResults();
        }
    }

    handlePrev = () => {
        if(this.state.chunkIndex > 0){
            this.setState({
                chunkIndex: this.state.chunkIndex - 1
            })
        }
        
    }
    
    handleNext = () => {
        if(this.state.chunkIndex < this.props.chunks.length - 1){
            this.setState({
                chunkIndex: this.state.chunkIndex + 1
            })
        }
    }

    render() {
       // console.log("in searchbar render: props: ", this.props)
        let searchPlaceholder = "Search"; 
        let countryPlaceholder = "Country Code";
        let cityPlaceholder = "City";
        let chunks = this.props.searchResults;
        

        if(this.props.searchType === "meetups"){
            searchPlaceholder = "Enter Zip Code";
            countryPlaceholder = "Enter Country Code";
            cityPlaceholder = "Enter City";
            chunks = this.props.chunks;
            if(this.props.chunks.length>0){
                chunks = this.props.chunks[this.state.chunkIndex];
         //       console.log("in render and chunks are: ", chunks)
            }
        }


        return (
            <div id="searchBar">
                               
                {this.props.searchType === "meetups" &&
                <div>
                
                <Tabs style={{
                            marginBottom:"20px",
            　　　　　　　　}}>
                    <Tab value="a" label="Rest of World"
            　　　　　　　　style={{
            　　　　　　　　　　backgroundColor: '#FFCA28'
            　　　　　　　　}}>
                        <div>
                        <Paper style={{margin:"7px",width: "95%", borderTop:"1px solid black"}} zDepth={1}>
                            <ListItem 
                                style={{textAlign:"left"}}
                                secondaryTextLines={2} 
                                primaryText="Enter a two letter country code and city name to find coding meetups in your area."
                                secondaryText={    
                                    <p style={{width: "100%"}}>
                                        If the details you provide are not recognised, meetups in the default location of Glasgow will be shown.
                                    </p>      
                                }
                            >
                            </ListItem>
                            
                            <Divider />
                        </Paper>

                        <form onSubmit={this.formSubmitted2} style={{display: "inline-flex", alignItems: "baseline"}}>
                            <div>
                            <TextField
                                autoComplete="off" 
                                style={{margin: "5px", position: "relative"}} 
                                name="country" 
                                floatingLabelText={countryPlaceholder}
                                errorText={this.state.errorText}
                                errorStyle={{position: 'absolute', top: '70px'}} 
                            />
                            <TextField
                                autoComplete="off" 
                                style={{margin: "5px", position: "relative"}} 
                                name="city"                
                                floatingLabelText={cityPlaceholder}
                                errorText={this.state.errorText}
                                errorStyle={{position: 'absolute', top: '70px'}} 
                            />
                            </div>
                            <div>
                            <FlatButton label="Search" type="submit" primary={true}/>
                            <FlatButton onTouchTap={this.clearResults} label="Clear"/>
                            </div>
                        </form>
                        </div>        
                    </Tab>
                    
                    <Tab label="USA"
            　　　　　　　　style={{
            　　　　　　　　　　backgroundColor: '#FFB74D'
            　　　　　　　　}}>
                    <div>
                    <Paper style={{margin:"7px",width: "95%", borderTop:"1px solid black"}} zDepth={1}>
                            <ListItem 
                                style={{textAlign:"left"}}
                                secondaryTextLines={2} 
                                primaryText="Enter your zip code code to find coding meetups in your area."
                                secondaryText={    
                                    <p style={{width: "100%"}}>
                                        If your zip code is not recognised, meetups in the default location of Glasgow will be shown.
                                    </p>      
                                }
                            >
                            </ListItem>
                            
                            <Divider />
                        </Paper>

                        <form onSubmit={this.formSubmitted}>
                            <TextField
                                autoComplete="off" 
                                style={{margin: "20px"}} 
                                name="searchTerm" 
                                value={this.props.searchTerm} 
                                onChange={this.handleSearch} 
                                floatingLabelText={searchPlaceholder}
                            />
                            <FlatButton label="Search" type="submit" label="Search" secondary={true}/>
                            <FlatButton onTouchTap={this.clearResults} label="Clear"/>
                        </form>

                        </div>

                    
                    </Tab>
                </Tabs>

                </div>
                }

                {this.props.searchType === "newsSearch" &&
                    <form onSubmit={this.formSubmitted}>
                    <TextField
                        autoComplete="off" 
                        style={{margin: "20px"}} 
                        name="searchTerm" 
                        value={this.props.searchTerm} 
                        onChange={this.handleSearch} 
                        floatingLabelText={searchPlaceholder}
                    />
                    <FlatButton label="Search" type="submit" primary={true}/>
                    <FlatButton onTouchTap={this.clearResults} label="Clear"/>
                </form>
                }



                {this.props.loading && <CircularProgress  style={{verticalAlign:"middle", margin:"40px 0px"}} size={120}/>}
                


                {!this.props.loading && 
                <List style={{margin:"10px", textAlign:"left"}}>
                {
                   // this.props.searchResults.map((article, index) => {
                    
                    chunks.map((article, index) => {



                        if(this.props.searchType === "meetups"){
                            return (
                                <div key={index} onClick={() => {
                                    this.panTheMap(article);    
                                }} >
                                <Paper style={{margin:"7px", borderTop:"1px solid #FF4081"}} zDepth={1}>
                                    <ListItem 
                                        secondaryTextLines={2} 
                                        primaryText={article.name} 
                                        secondaryText={
                                                <div>
                                                <p className="time">{article.time}</p>    
                                                <p style={{width: "80%"}}>
                                                    {article.description}
                                                </p>
                                                </div>
                                            
                                        
                                        }
                                    >
                                    <a style={{position:"absolute", right:"10px", bottom:"5px"}} href={article.event_url}>More details</a>
                                    </ListItem>
                                   
                                <Divider />
                                </Paper>
                                </div>
                            )



                        }
                        else {

                            return (
                                <a key={index} href={article["web_url"]}>
                                <Paper style={{margin:"7px", borderTop:"1px solid #FF4081"}} zDepth={1}>
                                    <ListItem 
                                        secondaryTextLines={2} 
                                        primaryText={article.headline.main} 
                                        secondaryText={
                                            <p style={{width: "80%"}}>
                                                {article.snippet}
                                            </p>
                                        
                                        }
                                    />
                                <Divider />
                                </Paper>
                                </a>
                            )
                        
                        
                        }

                        
                    })
                }    
                
                </List>
                }

                {this.props.searchType === "meetups" && 
                    <div className="pagination">
                        {this.state.chunkIndex !== 0 &&
                            <p className="prev" onClick={this.handlePrev}><i className="fa fa-arrow-left"></i></p>
                        }
                        {this.props.chunks.length > 0 && <p className="pageNumber">page <span>{this.state.chunkIndex + 1}</span></p> } 
                        {this.state.chunkIndex < this.props.chunks.length-1 &&
                            <p className="next" onClick={this.handleNext}><i className="fa fa-arrow-right"></i></p>
                        }
                       
                        
                    </div>
                }
                
                
            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    console.log("in searchbar map state to props: ", state);
    if (ownProps.searchType === "newsSearch"){
        return {
            loading : state.searchBarReducer.isLoading,
            searchTerm : state.searchBarReducer.searchTerm,
            searchResults : state.searchBarReducer.searchResults,
            chunks : state.searchBarReducer.chunkedResults
        }
    }
    else {
        return {
            loading : state.meetupsReducer.isLoading,
            searchTerm : state.meetupsReducer.postcode,
            searchResults : state.meetupsReducer.meetupsResults,
            chunks : state.meetupsReducer.chunkedResults,
            country: state.meetupsReducer.country,
            city: state.meetupsReducer.city
        }
    }
    
    
}


const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.searchType === "meetups"){
        return {
            updateSearchTerm : (postcode) => {
                dispatch(updateSearchPostcode(postcode))
            },
            updateSearchWords : (city, country) => {
                dispatch(updateSearchWords(city, country))
            },
            fetchSearchResults : (postcode, loading, city, country) => {
                dispatch(getMeetupsResults(postcode, loading, city, country))
            },
            clearSearchResults : () => {
                dispatch(clearMeetupsResults())
            },
            updateCoordinates : (location) => {
                dispatch(changeMapCoordinates(location))
            }
        }
    }
    else {    
        return {
            updateSearchTerm : (searchTerm) => {
                dispatch(updateSearchWord(searchTerm))
            },
            fetchSearchResults : (searchTerm) => {
                dispatch(getSearchResults(searchTerm))
            },
            clearSearchResults : () => {
                dispatch(clearSearchResults())
            }
        }
    }

}





export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);



/*

<form onSubmit={this.formSubmitted}>
                    <TextField
                        autoComplete="off" 
                        style={{margin: "20px"}} 
                        name="searchTerm" 
                        value={this.props.searchTerm} 
                        onChange={this.handleSearch} 
                        floatingLabelText={searchPlaceholder}
                    />
                    <FlatButton label="Search" type="submit" primary={true}/>
                    <FlatButton onTouchTap={this.clearResults} label="Clear"/>
                </form>

*/