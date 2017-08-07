import React from "react";
import {GoogleApiComponent, Map} from "google-maps-react";

const style = {
    width: '100vw',
    height: '100vh'
}

export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
        <div style={style}>
            <Map google={this.props.google} />
        </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: __GAPI_KEY__
})(Container)


 