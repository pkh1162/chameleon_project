import React from "react";

class ItemDisplay extends React.Component {
    render() {
        return (
        <ul>
        {this.props.items.map((item) => (
         <li key={item.id}>
         {item.label}
         </li>
          ))}
         </ul>
        );
    }
}

ItemDisplay.propTypes = {
    item: React.PropTypes.string,
};

export default ItemDisplay;