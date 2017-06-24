import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBar from "./SearchBar.js";
import GridIt from "../components/GridIt.js"
import {connect} from "react-redux";
import {fetchMultiNews} from "../actions/multiNewsAsync.js";

import '../styles/App.css';

class App extends Component {

  componentDidMount() {
    console.log("in search bar componentDidMount");
    this.props.fetchMultiSources(this.props.sources);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <h2>Aaayumi and Paul's Project!</h2>
            <div id="wrapper">
              <div className="paulHalf">
                  <SearchBar/>
                  <GridIt articles={this.props.articles} loading={this.props.multiNewsLoading}/>
              </div>

              <div className="aaayumiHalf">
              
              </div>
            </div>       
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log("state in multi news is : ", state)
  return {
    articles : state.multiNewsReducer.multiSourceNews,
    sources : state.multiNewsReducer.multiSources,
    multiNewsLoading : state.multiNewsReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMultiSources : (sources) => {
            dispatch(fetchMultiNews(sources))
        }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
