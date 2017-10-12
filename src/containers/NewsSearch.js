import React from "react"
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Searcher} from "../components/Searcher.js";
import AppBar from 'material-ui/AppBar';

class NewsSearch extends React.Component {
    render () {
        return (
            <div className="news-search-container">
                <AppBar 
                    style={{textAlign:"left", backgroundColor:"rgba(255, 0, 50, 0.89)", width: "97%", margin:"0 auto"}} 
                    title="Search"
                    iconElementLeft={<div></div>}         
                />

                <Searcher
                    paperStyle={true}
                    displayCard={false}
                    primaryText=""
                    secondaryText=""
                    formClass=""
                    submit={this.props.formSubmitted}
                    style={null}
                    inputs={
                        [{
                            textName: "searchTerm",
                            textValue: this.props.searchTerm,
                            textLabel: "Article Search",
                            errorText: this.props.errorText,
                            errorStyle: {position: 'absolute', top: '70px'},
                            changeMethod: this.props.handleSearch,
                            btnStyle: {display: "none"},
                            btnClass: "",
                            clickMethod: null,
                            iconClass: ""                        
                        }]
                    }
                    buttons = {
                        [
                            {
                                iconClass: "fa fa-close",
                                type: "button",
                                primary: false,
                                style: null,
                                clickMethod: this.props.clearResults
                            },
                            {
                                iconClass: "fa fa-search",
                                type: "submit",
                                primary: true,
                                style: null,
                                clickMethod: () => {}
                            }
                          
                        ]
                    }                 
                />

            </div>

        )
    }
}

NewsSearch.propTypes = {
    searchTerm: PropTypes.string,
    handleSearch: PropTypes.func,
    clearResults: PropTypes.func,
    formSubmitted: PropTypes.func,
    errorText: PropTypes.string
}




const mapStateToProps = (state, ownProps) => {
        return {
            searchTerm : state.searchBarReducer.searchTerm,
            handleSearch: ownProps.handleSearch,
            clearResults: ownProps.clearResults,
            formSubmitted: ownProps.formSubmitted,
            errorText: ownProps.errorText
        }
}


export default connect(mapStateToProps, null)(NewsSearch);

