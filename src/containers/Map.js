import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import {connect} from "react-redux";
import {updateMarkers} from "../actions/meetupsSearchAsync.js";
import "../styles/map.css";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null
        }
    }

    componentDidUpdate(props, nextProps) {
        if(this.state.map){
            this.state.map.panTo(this.props.center)
        }
        return true;
    }

    mapLoaded = (map) => {
        if(this.state.map != null){
            return
        }
        this.setState({
            map
        })
    }

    render() {
        //const mapContainer = <div style={{width: "100%", height: "100%", backgroundColor: "red"}}></div> 
        //const center= {lat:55.8642, lng:-4.2518};
        //const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCprhc76_wVA_4I9qgY8xGFOvC1zvUCuKM";

        return (
            <GoogleMap
                ref={this.mapLoaded}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
               
               
            >
            {this.props.markers.map((marker, index) => (
                <div key={index}>
                <Marker      
                    {...marker}
                    onRightClick={() => this.onMarkerRightClick(marker)}
                    onClick={(e) => {
                            this.props.updateInfoboxes(marker.key)
                        }
                    }
                    title={marker.name}
                >
                    

                    {marker.infoboxOpen &&
                        <InfoWindow onClick={() => console.log("closing info window")} className="infoWindow" position={marker.position}>
                            <div
                            style={{margin: "10px", maxWidth:"200px"}}
                            onClick={(e) => {
                                 e.currentTarget.style.display = "none";
                            }}
                            >
                                <p className="infoBoxName">{marker.name}</p>
                                <p className="infoBoxDesc"><span>@</span> {marker.position.name}</p>
                            </div>
                        </InfoWindow>
                    }
                    
                </Marker>
                
                </div>
            ))}
            </GoogleMap>
        )
    }
}

Map.PropTypes = {
    markers: PropTypes.array,
    center: PropTypes.object
}


const mapStateToProps = (state, ownProps) => {
    return {
        markers: state.meetupsReducer.markers,
        center: state.meetupsReducer.center
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateInfoboxes: (markerId) => {
            dispatch(dispatch(updateMarkers(markerId)))
        }
    }
}

export default withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(Map));


