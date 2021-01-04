import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Webcam from "react-webcam";
 
const WebcamComponent = () => <Webcam />;

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
        phone: 0,
        num_of_people: 0,
        stay_length: 0,
        wheelchair: false,
        childsupport: false,
        users: []
      }
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

    onChangeWheelchair(bool) {
      this.setState({
        wheelchair: bool
      })
    }

    onChangeChildSupport(bool) {
      this.setState({
        childsupport: bool
      })
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

      console.log(data);

      window.location = '/'
    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>

        <label>What is your mobile number?</label><br></br>
        <input type="text" name="number" class="box" value={this.state.value} onChange={this.onChangePhone(this.state.value)} />
        <br></br>

        <label>How long do you plan to stay (in minutes)?</label><br></br>
        <input type="text" name="number" class="box" value={this.state.value} onChange={this.onChangeStayLength(this.state.value)} />
        <br></br>

        <label>Do you need any additional support?</label>
        <div class="indent">
          <input type="checkbox" id="support1" name="support1" value="Wheelchair"/>
          <label for="vehicle1" class="options"> Wheelchair Access</label><br></br>
          <input type="checkbox" id="support2" name="support2" value="Child"/>
          <label for="vehicle2" class="options"> Child Support</label><br></br>
          <input type="checkbox" id="support3" name="support3" value="Disability"/>
          <label for="vehicle3" class="options"> Disability</label><br></br>
        </div>

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