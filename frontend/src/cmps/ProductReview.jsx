import React, { Component } from "react";
import { connect } from "react-redux";
import productService from "../services/productService.js";
import { loadProducts, updateProduct } from "../actions/productActions.js";
import  ReviewAdd from "../cmps/ReviewAdd.jsx";
import Button from "@material-ui/core/Button";

class ProductReview extends Component {
    state = {
        reviews: [],
        isAddReviewOn: false,
        // loggedInUser: null   
    }
    componentDidMount() {
        this.loadUser();
    }

  loadUser() {
    const { id } = this.props;

    productService.get(id).then((user) => {
      this.setState({ ...user.product });
    });
  }
  onOpenAdd = () => {
    this.setState({ isAddReviewOn: (!this.state.isAddReviewOn) ? true : false });
  };
  onAddReview = (newReview) => {
    this.setState((prevState) => ({
      reviews: [...prevState.reviews, newReview],
    }));
    const { id } = this.props;
    productService.get(id).then((user) => {
      console.log(newReview);
      user.product.reviews.push(newReview);
      this.props.updateProduct(user);
    });
  };
  getStars = (rate) => {
    var res = "";
    for (var i = 0; i < rate; i++) {
      res += "★";
    }
    return res;
  };
  render() {
    const { reviews } = this.state;
    return (
      <div className="review-container flex column">
        <button
          className="add-btn"
          variant="contained"
          onClick={this.onOpenAdd}
        >
          Write a review
        </button>
        {this.state.isAddReviewOn && (
        <div className="add-review-section">
          <ReviewAdd onAddReview={this.onAddReview} />
          </div>
          )}
        {reviews &&
          reviews.map((review, idx) => (
            <div className="buyer-review" key={idx}>
              <div
                className="buyer-review-img"
                style={{ backgroundImage: `url(${review.byUser.imgUrl})` }}
              />
              <div className="buyer-review-main">
                <div className="buyer-review-main-top">
                  <div className="buyer-review-name">
                    {review.byUser.name.first} {review.byUser.name.last}
                  </div>
                  <div className="buyer-review-rate">
                    {this.getStars(review.rate)}
                  </div>
                </div>
                <p className="buyer-review-txt">{review.txt}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.product.product,
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadProducts,
  updateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);


