import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsList from "../components/List.js";
import { itemsFetchData, itemHasErrored } from '../actions/popularNewsItem.js';
export const NEWS_API_KEY = "bb40bd039d1c4a1cad1325910d1674f3";


class NewsListContainer extends Component {
   componentDidMount() {
       this.props.fetchData("https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=bb40bd039d1c4a1cad1325910d1674f3");
   }
render() {
    if(this.props.hasErrored) {
        return <p> Error occured. Please come back later </p>;
    } 
    
    //const arr = this.props.items.articles;
    // console.log(arr);
    var articles = this.props.items.articles;

      return (<NewsList items={this.state.items} />
    );
}
}

NewsList.propTypes = {
    fetchData: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired,
    hasErrored: React.PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);