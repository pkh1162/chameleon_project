import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab, Slider} from 'material-ui/Tabs';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class NewsTab extends Component {
    render() {
        return(
          <Tabs>
    <Tab label="Today" >
      <div>
        
        <h3>
          Most popular news today.
        </h3>
    
      </div>
    </Tab>
    <Tab label="This Week" >
      <div>
        
        <h3>
          Most popular news this week.
        </h3>
      </div>
    </Tab>
    <Tab
      label="This Month"
      route="/home"
     
    >
      <div>
        
        <h3>
          Most popular news this month.
        </h3>
      </div>
    </Tab>
  </Tabs>
        )
    }
}

export default NewsTab;