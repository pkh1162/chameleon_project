import React, { Component } from 'react';
import  { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Tabs, Tab} from 'material-ui/Tabs';


import '../styles/App.css';


/*///Paul's  imports/////*/ 
import Meetups from "./Meetups.js";
import SearchBar from "./SearchBar.js";
import GridIt from "../components/GridIt.js"
import NewsItems from "../containers/NewsItems.js"
import {fetchMultiNews} from "../actions/multiNewsAsync.js";
/*///////////////////////*/

/*///Ayumi's  imports/////*/ 
import NewsList from "./List.js";
/*///////////////////////*/

class App extends Component {

  componentDidMount() {
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
                <Route path="/meetups" 
                  render={() => {
                    return (
                      <Meetups/>
                    
                    )
                  }}
                
                
                />
                <Route path="/" render={() => {
                  return (
                    <div id="wrapper">
                      <div className="paulHalf">
                        <SearchBar searchType="newsSearch"/>
                        <NewsItems/>
                        
                      </div>

                      <div className="aaayumiHalf"><NewsList />
                      </div>

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
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(null, null)(App);



/*
<Map 
                        containerElement={<div style={{width:"400px", height: "400px"}}/>}
                        mapElement={<div style={{width:"400px", height: "400px"}}/>}
                        zoom={15}
                      />*/