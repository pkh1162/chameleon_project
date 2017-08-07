import React from "react";
import {connect} from "react-redux";
import "../styles/meetups.css";
import SearchBar from "./SearchBar.js";
import Map from "./Map.js";


class Meetups extends React.Component {
    render() {
        return (
            <div id="meetups">
              
                <div className="searcher">
                 
                    <SearchBar searchType="meetups"/>

                </div>
                <div className="mapper">
                    <Map 
                        containerElement={<div style={{width:"100%", height: "100%"}}/>}
                        mapElement={<div style={{width:"100%", height: "550px", margin: "0 auto"}}/>}
                        zoom={15}
                    />
                </div>

            </div>
        )
    }
}

export default connect(null, null)(Meetups)