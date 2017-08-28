import React, {Component} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

class Newownerform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''

    }
  }

newName = () => {
  this.setState({name:this.refs.name.value})
  console.log(this.refs.name.value)
}

// newDescription = () => {
//   this.setState({description:this.refs.description.value})
// }
//
// newPrice = () => {
//   this.setState({price:this.refs.price.value})
// }
//
// newImage = () => {
//   this.setState({imageUrl:this.refs.imageUrl.value})
// }

  // newPost = () => {
  //   console.log('hello')
  //   console.log(this.state)
  // }

  render() {
    return (
      <div>
        {//onClick={()=>{this.props.addPost(this.state)}} v
      }
        <Button
          bsStyle="primary"
          block onClick={()=>{if(this.refs.name.value){this.props.addOwner(this.state)}}} >New Owner? Get Started Now!</Button>
        {  // <input type='text'  placeholder='Please Enter Your Name!' ref = 'name' onChange = {this.newName}/>
    }
    {// <input type='text' onChange = {this.newDescription} placeholder='Description' ref = 'description'/>
    // <input type='text' onChange = {this.newPrice} placeholder='Price' ref = 'price'/>
    // <input type='text' onChange = {this.newImage} placeholder='Image URL' ref = 'imageUrl'/>
  }
      </div>
    )
  }

}

export default Newownerform;
