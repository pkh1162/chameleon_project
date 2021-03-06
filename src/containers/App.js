import React, { Component } from 'react';
import  { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Tabs, Tab} from 'material-ui/Tabs';


import '../styles/App.css';


/*///Paul's  imports/////*/ 
import {Meetups} from "../components/Meetups.js";
import SearchBar from "./SearchBar.js";
import NewsItems from "../containers/NewsItems.js"
/*///////////////////////*/

/*///Ayumi's  imports/////*/ 
import NewsList from "./List.js";
/*///////////////////////*/

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="App">
            <Tabs style={{
                        margin: '0 auto',
                        border: '1px solid #388E3C'
                        }}>
              <Tab label="Home" 
                  containerElement={<Link to="/"/>}
                  style={{
                        backgroundColor: '#81C784'
                        }}/>
              <Tab label="meetups" containerElement={<Link to="/meetups"/>}
              style={{
                        backgroundColor: '#AED581'
                        }}/>
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

                      <div className="aaayumiHalf">
                      <NewsList />
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


export default connect(null, null)(App);
