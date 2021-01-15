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
        phone: e.target.value.replace("-", "")
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

      require('dotenv').config();

      axios.post('data/add', data)
      .then(res => console.log(res.data));

      window.location = '/'
    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <div style={{display: "inline-block", textAlign: "left"}}>
            <label>What is your 10 digit mobile number?</label><br></br>
            <input type="tel" placeholder="i.e. 123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="box1" className="box" onChange={this.onChangePhone}/>
            <br></br>

            <label>How many people are you reserving for?</label><br></br>
            <input type="text" placeholder="i.e. 5" id="box2" pattern="[0-9]{1,}" className="box" onChange={this.onChangePeople}/>
            <br></br>
            
            <label>How long do you plan to stay (in minutes)?</label><br></br>
            <input type="text" placeholder="i.e. 30" id="box3" pattern="[0-9]{1,}" className="box" onChange={this.onChangeStayLength}/>
            <br></br>

            <label>Do you need any additional support?
              <div className="indent">
                <input type="checkbox" checked={this.state.wheelchair} onChange={this.onChangeWheelchair}/>
                <label className="options"> Wheelchair Access</label><br></br>
                <input type="checkbox" checked={this.state.childsupport} onChange={this.onChangeChildSupport}/>
                <label className="options"> Child Support</label><br></br>
              </div>
            </label>
          </div>

        <br></br>
        <div style={{alignItems: "center"}}>
          <input type="submit" className="button" value="Submit" />
        </div>
        
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