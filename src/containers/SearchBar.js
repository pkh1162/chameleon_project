import React, {Component} from "react";
import {getSearchResults, clearSearchResults, updateSearchWord} from "../actions/searchBarAsync.js";
import {getMeetupsResults, clearMeetupsResults, updateSearchPostcode, changeMapCoordinates} from "../actions/meetupsSearchAsync.js";

import {connect} from "react-redux";
import "../styles/searchBar.css"


import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chunkIndex : 0
        }
    }

    handleSearch = (e) => {
        let input = e.target.value.trim();
        if (!input){
            this.props.clearSearchResults();
        }
        this.props.updateSearchTerm(e.target.value.trim())

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
        let chunks = this.props.searchResults;
        

        if(this.props.searchType === "meetups"){
            searchPlaceholder = "Enter Postcode";
            chunks = this.props.chunks;
            if(this.props.chunks.length>0){
                chunks = this.props.chunks[this.state.chunkIndex];
         //       console.log("in render and chunks are: ", chunks)
            }
        }


        return (
            <div id="searchBar">
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
                                            
                                                <p style={{width: "80%"}}>
                                                    {article.description}
                                                </p>
                                            
                                        
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
    //console.log("in searchbar map state to props: ", state);
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
            chunks : state.meetupsReducer.chunkedResults
        }
    }
    
    
}


const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.searchType === "meetups"){
        return {
            updateSearchTerm : (postcode) => {
                dispatch(updateSearchPostcode(postcode))
            },
            fetchSearchResults : (postcode) => {
                dispatch(getMeetupsResults(postcode))
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