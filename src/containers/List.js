import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, itemHasErrored } from '../actions/popularNewsItem.js';
import {Tabs, Tab} from 'material-ui/Tabs';
export const NEWS_API_KEY = "bb40bd039d1c4a1cad1325910d1674f3";


class NewsList extends Component {
 
  // add api keys reusable links 
  componentDidMount() {
    this.props.fetchData("https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=bb40bd039d1c4a1cad1325910d1674f3");  
    }

   handleChange(){
    this.props.fetchData("https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=bb40bd039d1c4a1cad1325910d1674f3");
    }

   handleBack(){
    this.props.fetchData("https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=bb40bd039d1c4a1cad1325910d1674f3");
    }

   
render() {
    if(this.props.hasErrored) {
        return <p> Error occured. Please come back later </p>;
    } 
    
    //const arr = this.props.items.articles;
    // console.log(arr);
    var articles = this.props.items.articles;

    return (
    <div>
    <Tabs style={{marginBottom:"20px"}}>
                <Tab id="trend" label="trend" onClick={this.handleBack.bind(this)} />
                <Tab id="latest" label="latest" onClick={this.handleChange.bind(this)}/>
              </Tabs>
     <ul>
        {
            articles.map((item) => (
                <li key={item.title}>
                    <a href={item.url}>
                    <h2>{item.title}</h2>
                    <img src={item.urlToImage} alt="Smiley face" />
                    <h3>{item.author}</h3>
                    <p>{item.description}</p>
                    </a>
                </li> 
            ))
        }
    
         </ul>
    </div>
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