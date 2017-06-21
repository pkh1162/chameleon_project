import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBar from "./SearchBar.js";
//import RaisedButton from 'material-ui/RaisedButton';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <h2>Aaayumi and Paul's Project!</h2>
            <div id="wrapper">
              <div className="myHalf">
                <SearchBar/>
              </div>

              <div className="aaayumiHalf">
              
              </div>
            </div>       
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
