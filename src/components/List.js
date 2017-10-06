import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { itemsFetchData, itemHasErrored } from '../actions/popularNewsItem.js';
export const NEWS_API_KEY = "bb40bd039d1c4a1cad1325910d1674f3";


class NewsList extends Component {
    componentDidMount() {
       this.props.fetchData("https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=bb40bd039d1c4a1cad1325910d1674f3");
       
       
   }
render() {
    if(this.props.hasErrored) {
        return <p> Error occured. Please come back later </p>;
    } 

    let articles = this.props.items.articles;

    return (
         <Card>
         <ul>
         {
         articles.map((item) => (
          <li key={item.title}>
              <a href={item.url}>
              <CardMedia> 
              <img src={item.urlToImage} />
              </CardMedia>     
              <CardTitle title={item.title} subtitle={item.author} />
              <CardText>
              {item.description}
              </CardText>
              </a>
          </li> 
            ))
        }
    
         </ul>
         </Card>
    );
}
}



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