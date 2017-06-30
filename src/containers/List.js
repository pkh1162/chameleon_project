import React, { Component } from 'react';

class NewsList extends Component {
    constructor(){
        super();
        this.state = {
            items: [],
            hasErrored: false
        };
    }

render() {
    if(this.state.hasErrored) {
        return <p> Error occured. Please come back later </p>;
    }
    
    return (
    <ul>
    {this.state.items.map((item) => (
     <li key={item.id}>
      {item.name}
    </li>
    ))}
    </ul>
    );
}
}

export default NewsList;