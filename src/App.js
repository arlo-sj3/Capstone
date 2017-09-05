import React, {Component} from 'react';
import './App.css';
import Newownerform from './newOwnerForm.js';
import Existingownerform from './existingOwnerForm.js';
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
      showAdd: true,
      showLog: false,
      showMap: true,
      showNextForm:false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/owner')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({owner: json})
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/business')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({business: json})
  }

  addOwner = async(owner) => {
    delete owner.showModal;
    delete this.currentUser
    console.log(owner);
    const response = await fetch('http://localhost:8000/owner', {
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
    const response = await fetch('http://localhost:8000/owner', {
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
    const response = await fetch('http://localhost:8000/business', {
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
  }




logout = () => {
  this.setState({currentUser:'', showAdd: true, showLog: false, showMap:true, showNextForm: false})
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

        {this.state.showNextForm? <Newbusinessform  addBusiness={this.addBusiness} />:null}

        {this.state.showMap? <div className="mapcontainer">
          <Mapcontainer />
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
