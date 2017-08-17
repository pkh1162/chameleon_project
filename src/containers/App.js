import React, { Component } from 'react';
import  { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Tabs, Tab} from 'material-ui/Tabs';






import '../styles/App.css';


/*///Paul's  imports/////*/ 
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
                <Route path="/meetups" component={SearchBar}/>
                <Route path="/" render={() => {
                  return (
                    <div id="wrapper">
                      <div className="paulHalf">
                        <SearchBar/>
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


const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(null, null)(App);
