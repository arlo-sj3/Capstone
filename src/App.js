import React, {Component} from 'react';
import './App.css';
import Newownerform from './newOwnerForm.js';
import Existingownerform from './existingOwnerForm.js';
import Background from './background.js';
import Mapcontainer from './mapcontainer.js';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      owner: [],
      trucks: [],
      currentUser: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/owner')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({owner: json})
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
    this.setState({currentUser:owner})
    console.log(this.state.currentUser)

  }

  oldOwner = async(owner) => {
    delete owner.showModal;
    console.log(owner);
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
    console.log(freshOwner)

for (var i = 0; i < freshOwner[0].length; i++) {

  if(freshOwner[0][i].email === owner.email && freshOwner[0][i].pass === owner.pass){
  console.log('success')
  console.log(freshOwner[0][i])
  this.setState({currentUser: freshOwner[0][i]})
  }
}
   // this.setState({owner: freshOwner})
    // console.log(this.state.owner)


  }

  render() {
    return (
      <div className="App">
        <div className="Background">
          Welcome: {this.state.currentUser.name}
          <Background/>
        </div>
        <div className="mapcontainer">
          <Mapcontainer />
        </div>

        <div className="tupper-ware">
          <div >
            <Newownerform addOwner={this.addOwner}/>
          </div>
          <div>
            <Existingownerform oldOwner={this.oldOwner}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
