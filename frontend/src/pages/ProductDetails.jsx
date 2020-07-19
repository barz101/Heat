import { loadProduct, updateProduct } from "../actions/productActions";
import { addOrder, updateOrder } from "../actions/orderActions";
import React from "react";
import { connect } from "react-redux";
import OrderForm from "../cmps/OrderForm.jsx";
import ProductReview from "../cmps/ProductReview.jsx";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import productService from "../services/productService.js";
import Header from "../cmps/Header";
import { Spinner } from "react-bootstrap";

class ProductDetails extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadProduct(id);
  }

  onRemoveProduct = () => {
    const { id } = this.props.match.params;
    if (!id) return;
    productService.get(id).then((user) => {
      const editedUser = { ...user };
      const cityId = editedUser.product.city._id;
      editedUser.product = null;
      this.props.updateProduct(editedUser);
      this.props.history.push(`/${cityId}`);
    });
  };
  onSendMsg = () => {
    const { id } = this.props.match.params;
    if (!id) return;
    console.log('loggedin user', this.props.loggedInUser._id);
    
    console.log('seller', this.props.match.params.id);
  }

  render() {
    const { user } = this.props;   
    if (!user)
    // return <div style={{ height: 4000, width: "100%" }}>Loading...</div>;
    return (
      <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
      const { product } = user;
      const hasReviews = !(!product.reviews || product.reviews.length === 0);
      
      let rate;
      if (hasReviews) {
        const reducer = (acc, curr) => acc + curr;
        const rateArr = product.reviews.map((review) => review.rate);
        rate = (rateArr.reduce(reducer) / rateArr.length).toFixed(1);
      }
    return (
      <div className="product-page">
        <Header pathname={this.props.location.pathname} />
        <section className="product-page-header content-container">
          <div className="product-page-title">
            <div>
              {product.title} &nbsp; &nbsp;{" "}
              {hasReviews && (
                <React.Fragment>
                  <span>★</span> {rate}
                </React.Fragment>
              )}
            </div>
            <Link to={`/${product.city._id}`}>
              <div className="product-page-city">{product.city.name}</div>
            </Link>
          </div>
          {((this.props.loggedInUser && this.props.loggedInUser.isAdmin) || user._id === (this.props.loggedInUser && this.props.loggedInUser._id))  && <div className="product-page-edit">
              <Link to={`/edit/${this.props.match.params.id}`}>
              <EditIcon className="product-page-edit-icon" />
            </Link>
              <DeleteIcon
                className="product-page-edit-icon"
                onClick={this.onRemoveProduct}
              />
          </div>}
        </section>

        <div className="product-page-img-container">
          <div
            className="prime-photo"
            style={{ backgroundImage: `url(${product.imgUrls[0]})` }}
          />
          <div
            className="prod-img prod-img-1"
            style={{ backgroundImage: `url(${product.imgUrls[1]})` }}
          />

          <div
            className="prod-img prod-img-2"
            style={{ backgroundImage: `url(${product.imgUrls[2]})` }}
          />

          <div
            className="prod-img prod-img-3"
            style={{ backgroundImage: `url(${product.imgUrls[3]})` }}
          />

          <div
            className="prod-img prod-img-4"
            style={{ backgroundImage: `url(${product.imgUrls[4]})` }}
          />
        </div>
        <main className="product-page-main content-container">
          <div className="product-page-content">
            <div className="product-page-prod-details">
              <h2>{product.category}</h2>
              <h3>{product.description}</h3>
              <h3>So what's cooking?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </p>
            </div>
            <div className="product-page-user-details">
              <div
                className="product-page-user-img"
                style={{ backgroundImage: `url(${user.imgUrl})` }}
              ></div>
              <div className="product-page-user-info">
                <div className="product-page-user-name">
                  {user.name.first} {user.name.last}
                </div>
                <div className="product-page-user-bio">"{user.bio}"</div>
              </div>
            </div>
          </div>
          <div className="product-page-spacing-vert">
            <p>&nbsp; &nbsp;</p>
          </div>
          <div className="order-form">
            <OrderForm seller={user} />
            {/* <button onClick={this.onSendMsg}>Send Messege</button> */}
          </div>
        </main>
        <section className="product-page-reviews content-container ">
          <ProductReview id={this.props.match.params.id} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.product.currProduct,
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadProduct,
  updateProduct,
  addOrder,
  updateOrder,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
