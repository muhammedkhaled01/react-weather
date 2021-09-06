import React, { Component } from 'react';
import Weather from "./Components/Weather";
import Form from "./Components/Form";
import './App.css';

const API_KEY = "1b6257e701f5357f3c57aa575beb2dc0";

// http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component {

  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: ""
  }


  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}& ${country}&appid=${API_KEY}`);
    const data = await api.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "Please add city and country"
      })
    }

  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-container">

          <Form getWeather={this.getWeather} />

          <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />
        </div>


      </div>
    )
  }
}

export default App;
