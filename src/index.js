import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Webcam from "react-webcam";
 
const WebcamComponent = () => <Webcam />;

  class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <label>
          What is your mobile number?<br></br>
          <input type="text" name="number" class="box" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" class="button" value="Submit" />
      </form>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Webcam />,
    document.getElementById('left')
  );

  ReactDOM.render(
    <Form />,
    document.getElementById('right')
  );