// //Google Maps API KEY
// //AIzaSyDqg1UjU5IOsVhWQPMxKg3Lk2fEArXV8sY
import React, {Component} from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocoder from 'geocoder'

export class Mapcontainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
       activeMarker: {},
       selectedPlace: {},
       trucks: []
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/trucks')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({trucks: json})
    console.log(this.state.trucks)
    this.getSpots();

  }

getSpots = () => {
  let result = [];
  for (var i = 0; i < this.state.trucks.length; i++) {
    Geocoder.geocode(this.state.trucks[i].location, function ( err, data ) {
      result.push(data.results[0].geometry.location)

    })

  }
  console.log(result)
}
  // Geocoder.geocode(this.state.trucks[0].location, function ( err, data ) {
  //   console.log(data.results[0])


  onMarkerClick = (props, marker, e) => {
    console.log(this.state.trucks)

      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }



render() {
    return (
      <Map google={this.props.google} zoom={13} initialCenter={{
            lat: 	39.754185,
            lng: -105.230484
          }}>

{// {function(this.state.trucks.location)}
}
          <Marker onClick={this.onMarkerClick}
    title={'The marker`s title will appear as a tooltip.'}
    name={'Cannonball Brewing'}
    position={{lat: 39.768709, lng: -105.234893}}/>
    <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>

        <Marker onClick={this.onMarkerClick}
                name={'Golden, CO'} />

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
