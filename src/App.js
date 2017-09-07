import React, {Component} from 'react';
import './App.css';
import Newownerform from './newOwnerForm.js';

import Existingownerform from './existingOwnerForm.js';
import Truckdetailsform from './truckDetailsForm.js'
import Background from './background.js';
import Mapcontainer from './mapcontainer.js';
import Logout from './logout.js';
import Newbusinessform from './newBusinessForm.js';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props)


    this.state = {
      owner: [],
      trucks: [],
      currentUser: [],
      business: [],
      currentBusiness: null,
      showAdd: true,
      showLog: false,
      showMap: true,
      showNextForm:false
    }
  }

  async getOwners() {
    const response = await fetch('/owner')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({owner: json})
  }

  async getBusinesses() {
    const response = await fetch('/business')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({business: json})
  }

  async getTrucks() {
    const response = await fetch('/trucks')
    const json = await response.json()
    console.log('trucks res', json);
    // this.setState({trucks : json})
    this.setState({trucks: json})
  }

  addOwner = async(owner) => {
    delete owner.showModal;
    delete this.currentUser
    console.log(owner);
    const response = await fetch('/owner', {
      method: 'POST',
      body: JSON.stringify(owner),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
    if(response.ok === false){
      return alert('bad email')
    }
    const json = await response.json()

    let freshOwner = [json];
    for (var i = 0; i < this.state.owner.length; i++) {
      freshOwner.push(this.state.owner[i]);

    }

    this.setState({owner: freshOwner})
    console.log(this.state.owner)
    this.setState({currentUser:owner, showAdd:false, showLog:true, showMap:false, showNextForm: true})
    console.log(this.state.currentUser)

  }

  oldOwner = async(owner) => {
    delete owner.showModal;
    const response = await fetch('/owner', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
    const json = await response.json()

    let freshOwner = [json];

    for (var i = 0; i < freshOwner[0].length; i++) {

      if(freshOwner[0][i].email === owner.email && freshOwner[0][i].pass === owner.pass){
      this.setState({currentUser: freshOwner[0][i], showAdd:false, showLog:true, showMap:false, showNextForm: true})
    }
  }
}


  addBusiness = async (business) => {
    delete business.showModal;
    business.owner_id = this.state.currentUser.owner_id;
    const response = await fetch('/business', {
      method: 'POST',
      body: JSON.stringify(business),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
    if(response.ok === false){
      return alert('bad email')
    }
    const json = await response.json()
    console.log(business);
    let freshBusiness = [json];
    console.log(freshBusiness)
    for (var i = 0; i < this.state.business.length; i++) {
      freshBusiness.push(this.state.business[i]);
    }

    this.setState({business: freshBusiness})
    this.setState({showAdd:false, showLog:true, showMap:false,})
    console.log(this.state.business);
    this.setState({currentBusiness:json});
    console.log(this.state.currentBusiness);


  }

  addTruck = async (truck) => {
    console.log(this.state.currentBusiness)
    delete truck.showModal;
    truck.business_id = this.state.currentBusiness.business_id
    // truck.name = this.state.currentBusiness.name;
    const response = await fetch('/trucks', {
      method: 'POST',
      body: JSON.stringify(truck),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
    if(response.ok === false){
      return alert('bad email')
    }
    const json = await response.json()
    console.log(truck);
    let freshTruck = [json];
    console.log(freshTruck)
    for (var i = 0; i < this.state.trucks.length; i++) {
      freshTruck.push(this.state.trucks[i]);
    }

    this.setState({truck: freshTruck})
    this.setState({showAdd:false, showLog:true, showMap:false,})
    console.log(this.state.trucks);
    this.setState({currentTruck:truck});
    console.log(this.state.currentTruck);


  }





logout = () => {
  this.setState({currentUser:'', showAdd: true, showLog: false, showMap:true, showNextForm: false, currentBusiness:''})
}

  render() {
    return (
      <div className="App">

            {this.state.showLog?<Logout
              logout={this.logout}/>:null}


        <div className="Background">
          {this.state.showLog? <div className="welcome">Welcome: {this.state.currentUser.name}</div>:null}

          <Background/>
        </div>

        {this.state.currentBusiness?<Truckdetailsform addTruck = {this.addTruck}/>:null}

        {this.state.showNextForm? <Newbusinessform  addBusiness={this.addBusiness} />:null}

        {this.state.showMap? <div className="mapcontainer">
          <Mapcontainer currentBusiness={this.state.currentBusiness}/>
        </div>:null }

        {this.state.showAdd?<div
          className="tupper-ware">
          <div >
            <Newownerform addOwner={this.addOwner}/>
          </div>
          <div>
            <Existingownerform oldOwner={this.oldOwner}/>
          </div>
        </div>:null}
      </div>
    );
  }
}

export default App;
