import React, { Component } from "react";
import GradeIcon from "@material-ui/icons/Grade";

export default class ReviewRate extends React.Component {
  state = {
    rating: null,
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    // console.log(value)
    this.props.rate(value);
    this.setState((prevState) => ({ [field]: value }));
  };
  componentDidMount() {}
  render() {
    const { rating } = this.state;
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={`${ratingValue}-stars`}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={this.handleChange}
              />
              <GradeIcon
                style={{
                  color: `${ratingValue <= rating ? "#FFC107" : "#b2a3a3"}`,
                }}
              />
            </label>
          );
        })}
      </div>
    );
  }
}
