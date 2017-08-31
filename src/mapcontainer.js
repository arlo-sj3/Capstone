// //Google Maps API KEY
// //AIzaSyDqg1UjU5IOsVhWQPMxKg3Lk2fEArXV8sY
import React, {Component} from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocoder from 'geocoder'
import _ from 'lodash';

export class Mapcontainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      trucks: [],
      spots: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/trucks')
    const json = await response.json()
    var result = [];
    var trucks = json;
    let promises = [];
    for (var i = 0; i < trucks.length; i++) {
      let truck = trucks[i]
      Geocoder.geocode(truck.location, (err, data) => {
        data.results[0].geometry.location['name'] = truck.name
        result.push(data.results[0].geometry.location)
        this.setState({spots: result, trucks: json})
      })
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({selectedPlace: props, activeMarker: marker, showingInfoWindow: true});
  }

  render() {
    return (
      <div>

        <Map google={this.props.google} zoom={13} initialCenter={{
          lat: 39.754185,
          lng: -105.230484
        }}>
          {this.state.spots.map((spot, i) => {
            return (<Marker key={i} position={{
              lat: spot.lat,
              lng: spot.lng
            }} onClick={this.onMarkerClick} title={spot.name} name={spot.name}/>)
          })}

          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>

          {
            //starting marker below
          // <Marker onClick={this.onMarkerClick}
          //         name={'Golden, CO'} />
        }

        </Map>

      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: ('AIzaSyDqg1UjU5IOsVhWQPMxKg3Lk2fEArXV8sY')})(Mapcontainer)
