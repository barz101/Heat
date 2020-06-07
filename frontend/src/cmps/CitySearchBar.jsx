import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Button } from "semantic-ui-react";
import { loadCities } from "../actions/cityActions";
import { withRouter } from "react-router";

class CitySearchBar extends Component {

  state = {
    curCity: null
  }

  componentDidMount() {
    this.props.loadCities();
  }

  getCitiesForDropDown() {
    return this.props.cities.map((city) => {
      return { value: city._id, text: city.name, key: city._id };
    });
  }

  selectCity = () => {
    if (this.state.curCity) {
      this.props.history.push(`/${this.state.curCity}`);
    }
  }


  render() {
    const options = this.getCitiesForDropDown()
    return (
      <div className="city-search-bar">
        <Dropdown className="icon"
          placeholder="Where Are We Eating Today?"
          search
          labeled
          selection
          fluid
          floating
          options={options}
          onChange={(e, { value }) => { this.setState({ curCity: value }) }}
        />
        <Button positive onClick={this.selectCity}>EAT!</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.city.cities,
  };
};

const mapDispatchToProps = {
  loadCities,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CitySearchBar));
