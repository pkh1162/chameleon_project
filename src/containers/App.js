import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import RaisedButton from 'material-ui/RaisedButton';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
          <h2>Aaayumi and Paul's Project!</h2>       
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
