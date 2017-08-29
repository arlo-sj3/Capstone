import React, {Component} from 'react';
import './App.css';
import Newownerform from './newOwnerForm.js';
import Existingownerform from './existingOwnerForm.js';
import Background from './background.js';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      owner: [],
      trucks: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/owner')
    const json = await response.json()
    // this.setState({trucks : json})
    this.setState({owner: json})
    console.log(this.state.owner)
  }

  addOwner = async(owner) => {
    delete owner.showModal;
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
    const json = await response.json()

    let freshOwner = [json];
    for (var i = 0; i < this.state.owner.length; i++) {
      freshOwner.push(this.state.owner[i]);
    }
    this.setState({owner: freshOwner})
    console.log(this.state.owner)
  }

  render() {
    return (
      <div className="App">
        <div className="Background">
          <Background/>
        </div>
        <div className="tupper-ware">
          <div >
            <Newownerform addOwner={this.addOwner}/>
          </div>
          <div>
            <Existingownerform/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
