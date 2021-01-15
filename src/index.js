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
        <h3><strong>Occupancy: </strong>{this.state.place.occupancy}</h3>
        <h3><strong>Max Occupancy: </strong>{this.state.place.max_occupancy}</h3>
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
        line: []
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

    onSubmit(e) {
      e.preventDefault();
      const data = {
        phone: this.state.phone,
        num_of_people: this.state.num_of_people,
        stay_length: this.state.stay_length,
        wheelchair: this.state.wheelchair,
        childsupport: this.state.childsupport
      }

      const line = this.state.line;
      const num = line.length;
      const waittime = 0;

      line.forEach(element => waittime += element.stay_length);

      console.log(data);

      const Nexmo = require('nexmo');
      const nexmo = new Nexmo({
        apiKey: '92c9aae3',
        apiSecret: '3BfLlBNjZ5VuNQHB',
      });
      const from = '15715095603';
      const to = '1' + this.state.phone.toString();
      const text = 'Hello. There are ' + String(num) + ' people in front of you. Your approximate wait time is ' + String(waittime) + " minutes.";
      nexmo.message.sendSms(from, to, text);

      axios.post('data/add', data)
      .then(res => console.log(res.data));

      window.location = '/'
    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>

        <label>What is your 10 digit mobile number?</label><br></br>
        <input type="text" className="box" onChange={this.onChangePhone} />
        <br></br>

        <label>How many people are you reserving for?</label><br></br>
        <input type="text" className="box" onChange={this.onChangePeople} />
        <br></br>
        
        <label>How long do you plan to stay (in minutes)?</label><br></br>
        <input type="text" className="box" onChange={this.onChangeStayLength} />
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