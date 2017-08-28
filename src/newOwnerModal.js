import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap-modal'



class Newownermodal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false

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
   }


  render() {
    {// const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // );
  }

    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a  here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a  here</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default Newownermodal

// ReactDOM.render(<Newownermodal />, document.getElementById('newownermodal'))
