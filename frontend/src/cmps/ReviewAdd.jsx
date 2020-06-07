import React, { Component } from "react";
import { Button, Dropdown, Input, Form, TextArea } from "semantic-ui-react";
import ReviewRate from "./ReviewRate.jsx";
import { connect } from "react-redux";

class ReviewAdd extends Component {
  state = {
    txt: "",
    rate: 0,
  };

  handleChange = (ev) => {
    let { name, value } = ev.target;
    value = ev.target.type === "number" ? parseInt(value) : value;
    this.setState({ [name]: value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const reviewToAdd = this.state;
    reviewToAdd.createdAt = Date.now();
    const { loggedInUser } = this.props;
    reviewToAdd.byUser = loggedInUser
      ? {
        _id: loggedInUser._id,
        name: loggedInUser.name,
        imgUrl: loggedInUser.imgUrl,
      }
      : {
        _id: "guest_id",
        name: { first: "Guest", last: "" },
        imgUrl:
          "https://pngimage.net/wp-content/uploads/2018/05/customer-icon-transparent-png-3.png",
      };
    this.props.onAddReview(reviewToAdd);
    this.setState({ txt: "", rate: 0 });
  };

  rate = (val) => {
    this.setState({ rate: +val });
  };

  render() {
    // console.log('the state is', this.state);
    const { txt, rate } = this.state;
    let name;
    if (this.props.loggedInUser) {
       name = this.props.loggedInUser.name.first;
    }
    return (
      <div className="product-review">
        <form onSubmit={this.handleSubmit}>
          <ReviewRate rate={this.rate} />
          <div>
            <label>
              <Input
                value={txt}
                type="text"
                name="txt"
                required
                autoComplete="off"
                placeholder={`Tell us about your experience ${(name)? `, ${name}` : ''}`}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <button>SAVE</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};

//   const mapDispatchToProps = {

//   };

export default connect(mapStateToProps)(ReviewAdd);
