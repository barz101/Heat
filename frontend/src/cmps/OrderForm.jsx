import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import EventCalendar from "./EventCalendar";
import { addOrder } from "../actions/orderActions";
import Swal from "sweetalert2";
import SocketService from "../services/SocketService";

class OrderForm extends React.Component {
  state = {
    dueDate: Date.now(),
    quantity: 1,
    totalPrice: 0,
  };
  componentDidMount() {
    let totalPrice = this.state.quantity * this.props.seller.product.price;
    this.setState({ totalPrice });
  }

  onDateChange = (eventDate) => {
    this.setState({ dueDate: eventDate });
  };

  handleChange = (ev) => {
    console.log(this.props.seller.product.price);
    let { name, value } = ev.target;
    value = ev.target.type === "number" ? parseInt(value) : value;
    let totalPrice = value * this.props.seller.product.price;
    this.setState({ [name]: value, totalPrice });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.loggedInUser){
    const newOrder = this.state;
    console.log(newOrder);
    const seller = this.getMiniSeller();
    const buyer = this.getMiniBuyer();
    console.log("miniBuyer", buyer, "mini seller", seller);
    newOrder.createdAt = Date.now();
    newOrder.status = "Active";
    newOrder.seller = seller;
    newOrder.buyer = buyer;
    this.props.addOrder(newOrder);
    Swal.fire('Booked! Have fun :)');
    this.setState({
      quantity: 1,
      totalPrice: 1 * this.props.seller.product.price,
      dueDate: Date.now(),
    });
    SocketService.emit('makeOrder')
    console.log("orderd!", newOrder);
    }
  };

  getMiniBuyer = () => {
    let { _id, name, imgUrl } = this.props.loggedInUser;
    const buyer = { _id, name, imgUrl };
    return buyer;
  };

  getMiniSeller = () => {
    let { _id, name, imgUrl } = this.props.seller;
    const seller = { _id, name, imgUrl };
    return seller;
  };

  changeQuantity = (number) => {
    console.log(number, 'ev');
    this.setState(prevState => ({ quantity: prevState.quantity + number }), () => {
      let totalPrice = (this.state.quantity * this.props.seller.product.price)
      this.setState({ totalPrice })
    }
    )
  }
  render() {
    const { quantity, totalPrice } = this.state
    return (
        <form onSubmit={this.handleSubmit} >
          <EventCalendar onDateChange={this.onDateChange} />
          <div className="pax-query">How Many In Your Party?</div>
          <div className="order-controller">
            <div className="order-quantity">
              <button type="button" onClick={() => this.changeQuantity(-1)}>-</button>
              <input value={quantity} name="quantity" readOnly min="0"></input>
              <button type="button" onClick={() => this.changeQuantity(1)}>+</button>
            </div>
            <div className="order-final">
              <div>Total: ${totalPrice}</div>
              <button>Book Now</button>
            </div>
          </div>
        </form>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  addOrder,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderForm)
);
