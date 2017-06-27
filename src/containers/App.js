import React, { Component } from 'react';
import  { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {connect} from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


import '../styles/App.css';


/*///Paul's  imports/////*/ 
import SearchBar from "./SearchBar.js";
import GridIt from "../components/GridIt.js"
import NewsItems from "../containers/NewsItems.js"
import {fetchMultiNews} from "../actions/multiNewsAsync.js";
/*///////////////////////*/


class App extends Component {

  componentDidMount() {
    this.props.fetchMultiSources(this.props.sources);     //Fetches latest news items from NewsApi's
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="App">
              


              <Tabs style={{marginBottom:"20px"}}>
                <Tab label="Home" containerElement={<Link to="/"/>}/>
                <Tab label="meetups" containerElement={<Link to="/meetups"/>}/>
              </Tabs>

              
              <Switch>
                <Route path="/meetups" component={SearchBar}/>
                <Route path="/" render={() => {
                  return (
                    <div id="wrapper">
                      <div className="paulHalf">
                        <SearchBar/>
                        <NewsItems/>
                        
                      </div>

                      <div className="aaayumiHalf"></div>

                    </div> 
                  )

                }}/>
               
              </Switch>
              
           

          </div>
        </MuiThemeProvider>
      </BrowserRouter>
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
