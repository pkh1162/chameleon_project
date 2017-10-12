import React from "react"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../styles/searchBar.css"

import {Searcher} from "../components/Searcher.js";
//import {MeetupCard} from "../components/MeetupCard.js";
import {Tabs, Tab} from 'material-ui/Tabs';

class MeetupsSearch extends React.Component {

    render () {

        return (
            <Tabs style={{marginBottom:"20px"}}>
                <Tab value="a" label="Rest of World" style={{background: '#FFCA28'}}>
                    <div className="meetups-form-container">            
                        <Searcher
                            paperStyle={null}
                            displayCard={true}
                            primaryText="Enter a country and city to find coding meetups in your area."
                            secondaryText="If the details you provide are not recognised, a location based upon your public ip address will be shown."
                            formClass="world-form"
                            submit={this.props.worldFormSubmit}
                            style={null}
                            inputs={
                                [
                                    {
                                        textName: "country",
                                        textValue: this.props.countrySearch || "",
                                        textLabel: "Country",
                                        errorText: this.props.errorText,
                                        errorStyle: {position: 'absolute', top: '70px'},
                                        changeMethod: this.props.handleSearch,
                                        btnStyle: null,
                                        btnClass: "countryBtn",
                                        clickMethod: this.props.clearResults,                        
                                    },
                                    {
                                        textName: "city",
                                        textValue: this.props.citySearch || "",
                                        textLabel: "City",
                                        errorText: this.props.errorText,
                                        errorStyle: {position: 'absolute', top: '70px'},
                                        changeMethod: this.props.handleSearch,
                                        btnStyle: null,
                                        btnClass: "cityBtn",
                                        clickMethod: this.props.clearResults,                       
                                    }
                                ]
                            }
                            buttons = {
                                [
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
                </Tab>
            
                <Tab label="USA"style={{background: '#FFB74D'}}>
                    <div className="usa-form-container">
                        <Searcher
                            paperStyle={null}
                            displayCard={true}
                            primaryText="Enter your zip code code to find coding meetups in your area."
                            secondaryText=""

                            formClass=""
                            submit={this.props.formSubmitted}
                            style={null}
                            inputs={
                                [{
                                    autoComplete: "off",
                                    textStyle: {margin: "10px"},
                                    textName: "searchTerm",
                                    textValue: this.props.searchTerm || "",
                                    textLabel: "Search",
                                    errorText: this.props.errorText,
                                    errorStyle: {position: 'absolute', top: '70px'},
                                    changeMethod: this.props.handleSearch,
                                    btnStyle: {color: "black"},
                                    btnClass: "",
                                    clickMethod: this.props.clearResults,
                                    iconClass: "fa fa-close"                        
                                }]
                            }
                            buttons = {
                                [
                                    {
                                        iconClass: "fa fa-search",
                                        type: "submit",
                                        primary: false,
                                        style: {color: "rgb(0, 188, 212)"},
                                        clickMethod: () => {} 
                                    }
                                ]
                            }                 
                        />
                    </div>
                </Tab>
            </Tabs>
        )
    }

}


MeetupsSearch.propTypes = {
    searchTerm: PropTypes.string,
    citySearch: PropTypes.string,
    countrySearch: PropTypes.string,
    handleSearch: PropTypes.func,
    clearResults: PropTypes.func,
    formSubmitted: PropTypes.func,
    worldFormSubmit: PropTypes.func,
    errorText: PropTypes.string   
}


const mapStateToProps = (state, ownProps) => {
        return {
            searchTerm : state.meetupsReducer.postcode,
            citySearch: state.searchBarReducer.citySearch,
            countrySearch : state.searchBarReducer.countrySearch,
            handleSearch: ownProps.handleSearch,
            clearResults: ownProps.clearResults,
            formSubmitted: ownProps.formSubmitted,
            worldFormSubmit: ownProps.worldFormSubmit,
            errorText: ownProps.errorText
        }
}



export default connect(mapStateToProps, null)(MeetupsSearch);