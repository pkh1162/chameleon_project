import React, {Component} from "react";
import PropTypes from "prop-types";
import {getSearchResults, clearSearchResults, updateSearchWord, updateWorldSearch} from "../actions/searchBarAsync.js";
import {getMeetupsResults, clearMeetupsResults, updateSearchPostcode, changeMapCoordinates} from "../actions/meetupsSearchAsync.js";

import {connect} from "react-redux";
import "../styles/searchBar.css"

import {MeetupCard} from "../components/MeetupCard.js";
import {NewsCard} from "../components/NewsCard.js";
import MeetupsSearch from "../containers/MeetupsSearch.js";
import NewsSearch from "../containers/NewsSearch.js";
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chunkIndex : 0,
            errorText: ""            
        }
    }


    handleSearch = (e) => {
        let input = e.target.value;
        if (!input){
            this.props.clearSearchResults();
        }

        if(e.target.name === "country"){
            this.props.updateWorldSearch(this.props.citySearch, input);
        }

        if(e.target.name === "city"){
            this.props.updateWorldSearch(input, this.props.countrySearch);
        }

        this.props.updateSearchTerm(input)
    }

    clearResults = (e) => {
        e.stopPropagation();

        if(e.currentTarget.className === "countryBtn"){
            this.props.updateWorldSearch(this.props.citySearch, "");
        }

        if(e.currentTarget.className === "cityBtn"){
            this.props.updateWorldSearch("", this.props.countrySearch)
        }
        
        this.props.updateSearchTerm("")
        this.props.clearSearchResults();
        this.setState({errorText: ""})
    }

    panTheMap = (e) => {
        this.props.updateCoordinates({
            lat: e.venue.lat,
            lng: e.venue.lon
        })
    }

    formSubmitted = (e) => {
        e.preventDefault();

        let searchWord = e.target.searchTerm.value.trim();
        if (searchWord){
            this.setState({errorText: ""})
            this.props.fetchSearchResults(searchWord, this.props.loading);
        }
        else {
            this.setState({errorText: "input required"})
            this.props.clearSearchResults();
        }
    }

    worldFormSubmit = (e) => {
        e.preventDefault();
        let city = e.target.city.value.trim();
        let country = e.target.country.value.trim();

        

        if (city && country){
            this.setState({errorText: ""})
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
        let chunks = this.props.searchResults;
        
        if(this.props.searchType === "meetups"){
            chunks = this.props.chunks;
            if(this.props.chunks.length>0){
                chunks = this.props.chunks[this.state.chunkIndex];
            }
        }


        return (
            <div id="searchBar">
                               
                {this.props.searchType === "meetups" &&
                
                    <MeetupsSearch 
                        handleSearch={this.handleSearch} 
                        clearResults={this.clearResults} 
                        errorText={this.state.errorText}
                        formSubmitted={this.formSubmitted}
                        worldFormSubmit={this.worldFormSubmit}
                    />
                
                }

                {this.props.searchType === "newsSearch" &&
                    <NewsSearch 
                        handleSearch={this.handleSearch} 
                        clearResults={this.clearResults} 
                        errorText={this.state.errorText}
                        formSubmitted={this.formSubmitted}
                    />
                }



                {this.props.loading && 
                <CircularProgress  style={{verticalAlign:"middle", margin:"40px 0px"}} size={120}/>}
                


                {!this.props.loading && 
                    <List style={{margin:"10px", textAlign:"left"}}>
                        {                           
                            chunks.map((article, index) => {
                                if(this.props.searchType === "meetups"){
                                    return (
                                        <MeetupCard
                                            key={index}
                                            panTheMap={this.panTheMap}
                                            article={article}
                                            name={article.name}
                                            time={article.time}
                                            description={article.description}
                                            event_url={article.event_url}                  
                                        />
                                    )
                                }
                                else {
                                    return (  
                                        <NewsCard 
                                            key={index}
                                            url={article["web_url"]}
                                            headline={article.headline.main}
                                            snippet={article.snippet}
                                        />
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
                        {this.props.chunks.length > 0 && 
                            <p className="pageNumber">page <span>{this.state.chunkIndex + 1}</span></p> 
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
            citySearch: state.searchBarReducer.citySearch,
            countrySearch: state.searchBarReducer.countrySearch,
            chunks : state.meetupsReducer.chunkedResults
        }
    } 
}



SearchBar.propTypes = {
    loading: PropTypes.bool,
    searchTerm: PropTypes.string,
    searchResults: PropTypes.array,
    chunks: PropTypes.array,
    citySearch: PropTypes.string,
    countrySearch: PropTypes.string
}

const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.searchType === "meetups"){
        return {
            updateSearchTerm : (postcode) => {
                dispatch(updateSearchPostcode(postcode))
            },
            updateWorldSearch : (city, country) => {
                dispatch(updateWorldSearch(city, country))
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