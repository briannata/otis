import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

export default class Occupancy extends React.Component {
  state = {
    place: {}
  }

  componentDidMount() {
    axios.get('occupancy/6000a0b12480f9d0c84af1c0')
      .then(res => {
        const place = res.data;
        this.setState({ place });
      })
  }

  render() {
    return (
      <div>
        <h3>Occupancy: {this.state.place.occupancy} / {this.state.place.max_occupancy}</h3>
      </div>
    )
  }
} 

  class Form extends React.Component {
    constructor(props) {
      super(props);

      this.onChangePhone = this.onChangePhone.bind(this)
      this.onChangePeople = this.onChangePeople.bind(this)
      this.onChangeStayLength = this.onChangeStayLength.bind(this)
      this.onChangeWheelchair = this.onChangeWheelchair.bind(this)
      this.onChangeChildSupport = this.onChangeChildSupport.bind(this)
      this.onSubmit = this.onSubmit.bind(this)

      this.state = {
        phone: 1234567890,
        num_of_people: 0,
        stay_length: 0,
        wheelchair: false,
        childsupport: false,
        users: [],
        line: [],
        color: "#04b85a"
      }
    }

    componentDidMount() {
      axios.get('data/')
        .then(res => {
          const line = res.data;
          this.setState({ line });
        })
      }

    componentDidMount() {
      this.setState({
        users: ['test user'],
        username: 'test user'
      })
    }

    onChangePhone(e) {
      this.setState({
        phone: e.target.value
      })
    }

    onChangePeople(e) {
      this.setState({
        num_of_people: e.target.value
      })
    }

    onChangeStayLength(e) {
      this.setState({
        stay_length: e.target.value
      })
    }

    onChangeWheelchair(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
  
      this.setState({
        wheelchair: value
      });
    }

    onChangeChildSupport(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
  
      this.setState({
        childsupport: value
      });
    }

    checkValidity(data) {
      const phone = data.phone;
      const num = data.num_of_people;
      const len = data.stay_length;
      if(isNaN(phone))
        return false;
      if(isNaN(num))
        return false;
      if(isNaN(len))
        return false;
    }

    onSubmit(e) {
      e.preventDefault();
      const data = {
        phone: this.state.phone,
        num_of_people: this.state.num_of_people,
        stay_length: this.state.stay_length,
        wheelchair: this.state.wheelchair,
        childsupport: this.state.childsupport
      }

      while(this.checkValidity(data) == false){
        var box1 = getElementById("box1");
        var box2 = getElementById("box2");
        var box3 = getElementById("box3");
        //box1.border-color = "#ff0703"; FIX THISSS
      }

      const line = this.state.line;
      const num = line.length;
      const waittime = 0;

      line.forEach(element => waittime += element.stay_length);

      console.log(data);

      require('dotenv').config();

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require('twilio')(accountSid, authToken);

      client.messages
        .create({
          body: 'Hello. There are ' + String(num) + ' people in front of you. Your approximate wait time is ' + String(waittime) + " minutes.",
          from: process.env.TWILIO_PHONE_NUM,
          to: '+1' + String(this.state.phone)
        })
        .then(message => console.log(message.sid));

      axios.post('data/add', data)
      .then(res => console.log(res.data));

      window.location = '/'
    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>

        <label>What is your 10 digit mobile number?</label><br></br>
        <input type="text" id="box1" className="box" onChange={this.onChangePhone} value={this.onChangePhone}/>
        <br></br>

        <label>How many people are you reserving for?</label><br></br>
        <input type="text" id="box2" className="box" onChange={this.onChangePeople} value={this.onChangePeople}/>
        <br></br>
        
        <label>How long do you plan to stay (in minutes)?</label><br></br>
        <input type="text" id="box3" className="box" onChange={this.onChangeStayLength} value={this.onChangeStayLength}/>
        <br></br>

        <label>Do you need any additional support?
          <div className="indent">
            <input type="checkbox" checked={this.state.wheelchair} onChange={this.onChangeWheelchair}/>
            <label className="options"> Wheelchair Access</label><br></br>
            <input type="checkbox" checked={this.state.childsupport} onChange={this.onChangeChildSupport}/>
            <label className="options"> Child Support</label><br></br>
          </div>
        </label>

        <br></br>
        <input type="submit" className="button" value="Submit" />
      </form>
      );
    }
  }
  
  // ========================================

  ReactDOM.render(
    <Occupancy />,
    document.getElementById('occupancy')
  );
  
  ReactDOM.render(
    <Form />,
    document.getElementById('thing')
  );