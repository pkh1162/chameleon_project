import React from "react";
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
            //console.log("in updatet he map, ", this.props)
            if(this.state.map){
                this.state.map.panTo(this.props.center)
            }
           

            return true;
            
        }

        mapMoved = () => {
            //console.log("in map is moving: ", JSON.stringify(this.state.map.getCenter()));
            
        }
        
        mapLoaded = (map) => {
           // console.log("in map loaded: ", JSON.stringify(map.getCenter()));
            if(this.state.map != null){
                return
            }

            this.setState({
                map
            })
        }


        onMarkerRightClick = (targetMarker) => {
            console.log("target marker is : ", targetMarker)
        }

        handleMapClick = (event) => {

        }
    
    render() {
        const mapContainer = <div style={{width: "100%", height: "100%", backgroundColor: "red"}}></div> 
        const center= {lat:55.8642, lng:-4.2518};
        const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCprhc76_wVA_4I9qgY8xGFOvC1zvUCuKM";
        //let markers = this.state.markers || []
        //console.log("markers are: ", this.state.markers)
        const Pop = <div><p>this is  atesddndf </p></div>
        return (
            <GoogleMap
                ref={this.mapLoaded}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
                onDragEnd={this.mapMoved}
                onClick={this.handleMapClick}
            >
            {this.props.markers.map((marker, index) => (
                <div key={index}>
                <Marker      
                    {...marker}
                    onRightClick={() => this.onMarkerRightClick(marker)}
                    onMouseOver={() => {
                        //console.log("hovering over a marker: ", marker)
                    }}
                    onClick={(e) => {
                            //console.log("you just clicked this marker: ", marker);
                            //marker.infoboxOpen = true;
                            //console.log("you just clicked this marker again: ", marker)
                            ///console.log("this marker element: ", e)
                            this.props.updateInfoboxes(marker.key)
                        }
                    }
                    title={marker.name}
                >
                    

                    {marker.infoboxOpen &&
                        <InfoWindow onClick={() => console.log("closing info window")} className="infoWindow" position={marker.position}>
                            <div onClick={(e) => {
                                //console.log("closing info window: ", e.currentTarget)
                                e.currentTarget.style.display = "none";
                                }
                            }>
                                <p>{marker.name}</p>
                                <p>{marker.position.name}</p>
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
/*

<InfoWindow 
                    content="<div style={width:'100px', height:'100px'}>I'm a Window that contains Info Yay</div>"
                    position={marker.position}
                />

var rectangle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    bounds: {
      north: 33.685,
      south: 33.671,
      east: -116.234,
      west: -116.251
    }
  });
}
*/

const mapStateToProps = (state, ownProps) => {
    //console.log("in maps state to props: ", state.meetupsReducer.markers)
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


