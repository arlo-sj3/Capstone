// //Google Maps API KEY
// //AIzaSyDqg1UjU5IOsVhWQPMxKg3Lk2fEArXV8sY
import React, {Component} from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Mapcontainer extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
    selectedPlace:''
    }
  }
render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDqg1UjU5IOsVhWQPMxKg3Lk2fEArXV8sY')
})(Mapcontainer)
