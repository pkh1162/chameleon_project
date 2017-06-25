import React, { Component } from 'react';
import {connect} from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/App.css';


/*///Paul's  imports/////*/ 
import SearchBar from "./SearchBar.js";
import GridIt from "../components/GridIt.js"
import {fetchMultiNews} from "../actions/multiNewsAsync.js";
/*///////////////////////*/


class App extends Component {

  componentDidMount() {
    this.props.fetchMultiSources(this.props.sources);     //Fetches latest news items from NewsApi's
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
