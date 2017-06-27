import React, {Component} from "react";
import {getSearchResults, clearSearchResults, updateSearchWord} from "../actions/searchBarAsync.js";
import {connect} from "react-redux";
import "../styles/searchBar.css"


import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class SearchBar extends Component {

    handleSearch = (e) => {
        let input = e.target.value.trim();
        if (!input){
            this.props.clearSearchResults();
        }
        this.props.updateSearchTerm(e.target.value.trim())

    }

    clearResults = (e) => {
        e.stopPropagation();
        this.props.updateSearchTerm("")
        this.props.clearSearchResults();
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

    render() {
        return (
            <div id="searchBar">
                <form onSubmit={this.formSubmitted}>
                    <TextField
                        autoComplete="off" 
                        style={{margin: "20px"}} 
                        name="searchTerm" 
                        value={this.props.searchTerm} 
                        onChange={this.handleSearch} 
                        floatingLabelText="Search"
                    />
                    <FlatButton label="Search" type="submit" primary={true}/>
                    <FlatButton onTouchTap={this.clearResults} label="Clear"/>
                </form>
                

                {this.props.loading && <CircularProgress  style={{verticalAlign:"middle", margin:"40px 0px"}} size={120}/>}
                


                {!this.props.loading && 
                <List style={{margin:"10px", textAlign:"left"}}>
                {
                    this.props.searchResults.map((article, index) => {   
                        return (
                            <a key={index} href={article["web_url"]}>
                            <Paper style={{margin:"7px", borderTop:"1px solid #FF4081"}} zDepth={1}>
                                <ListItem 
                                    secondaryTextLines={2} 
                                    primaryText={article.headline.main} 
                                    secondaryText={
                                        <p style={{width: "80%"}}>
                                            {article.lead_paragraph}
                                        </p>
                                    
                                    }
                                />
                            <Divider />
                            </Paper>
                            </a>
                        )
                    })
                }    
                
                </List>
                }
                
            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        loading : state.searchBarReducer.isLoading,
        searchTerm : state.searchBarReducer.searchTerm,
        searchResults : state.searchBarReducer.searchResults
    }
}


const mapDispatchToProps = (dispatch) => {
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




export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);