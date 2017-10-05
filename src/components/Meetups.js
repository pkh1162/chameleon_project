import React from "react";
import "../styles/meetups.css";
import SearchBar from "../containers/SearchBar.js";
import Map from "../containers/Map.js";

export const Meetups = (props) => {
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
