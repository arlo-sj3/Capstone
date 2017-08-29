import React, {Component} from 'react';
import './App.css';
import { Button, Modal } from 'react-bootstrap';
// import Modal from 'react-bootstrap-modal'



class Existingownerform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      email: '',
      pass:''

    }
  }

  getInitialState = ()=> {
     return { showModal: false };
   }

   close = ()=> {
     this.setState({ showModal: false });
   }

   open =()=> {
     this.setState({ showModal: true });
     console.log(this.state.showModal)
   }


  render() {
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // );


    return (
      <div>

        <Button
          bsStyle="warning"

          onClick={this.open}
        >
          Registered Owner? Click Here!
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header >
            <Modal.Title>Log in.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type='text' placeholder='Enter Your Password!' ref='pass' onChange={this.newPass}></input>
            <input type='text' placeholder='Enter Your Email!' ref='email' onChange={this.newEmail}></input>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" block>SUBMIT
            </Button>
            <Button bsStyle="danger" block onClick={this.close}>CLOSE</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default Existingownerform

// ReactDOM.render(<Newownermodal />, document.getElementById('newownermodal'))
