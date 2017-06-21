import React, {Component} from "react";
import {connect} from "react-redux";
import ArticleCard from "../components/ArticleCard.js";
import TextField from 'material-ui/TextField';
import GridIt from "../components/GridIt.js";

import {fetchMultiNews} from "../actions/multiNewsAsync.js";

class SearchBar extends Component {

    handleSearch = (e) => {
        console.log(e.target.value);
        //this.props.fetchMultiSources();
    }

    componentDidMount() {
        console.log("in search bar componentDidMount");
        this.props.fetchMultiSources(this.props.sources);
    }

    render() {
        return (
            <div>
                <TextField onChange={this.handleSearch} floatingLabelText="Search"/>
                {this.props.loading.toString()}
                

                <GridIt articles={this.props.articles}/>

                

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        loading : state.multiNewsReducer.isLoading,
        sources : state.multiNewsReducer.multiSources,
        articles : state.multiNewsReducer.multiSourceNews
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchMultiSources : (sources) => {
            dispatch(fetchMultiNews(sources))
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);