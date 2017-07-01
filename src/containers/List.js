import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/popularNewsItem.js';

export const NEWS_API_KEY = "bb40bd039d1c4a1cad1325910d1674f3";

class NewsList extends Component {
   componentDidMount() {
       this.props.fetchData('https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey={NEWS_API_KEY}');
   }
render() {
    if(this.state.hasErrored) {
        return <p> Error occured. Please come back later </p>;
    }
    
    return (
    <ul>
    {this.state.items.map((item) => (
     <li key={item.id}>
      {item.article}
    </li>
    ))}
    </ul>
    );
}
}

NewsList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropsTypes.array.isRequired,
    hadErrored: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hadErrored: state.itemsHasErrored
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);