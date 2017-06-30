import React, { Component } from 'react';

class NewsList extends Component {
   componentDidMount() {
       this.props.fetchData('https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey={API_KEY}');
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