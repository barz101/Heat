import React, { Component } from "react";
import { connect } from "react-redux";
import orderService from "../services/orderService";
import { loadOrders } from "../actions/orderActions.js";
import OrderList from "./OrderList.jsx";
import Header from "./Header";
import SocketService from "../services/SocketService";

class UserOrders extends React.Component {
  state = {
    ordersBySeller: null,
    ordersByBuyer: null,
    ordersTypes: 'seller'
  };

  componentDidMount() {
    // this.props.loadOrders();
    // this.setState({ rating: this.props.orders })
    this.loadOrders();
    SocketService.on('setOrders', this.loadOrders);
  }

  loadOrders = () => {
    if (this.props.loggedInUser) {
      const { _id } = this.props.loggedInUser;

      orderService.queryBySeller(_id).then((orders) => {
        const reversedOrders = orders.reverse();
        this.setState({ ordersBySeller: reversedOrders });
      });

      orderService.queryByBuyer(_id).then((orders) => {
        const reversedOrders = orders.reverse();
        this.setState({ ordersByBuyer: reversedOrders });
      });
    }
  };

  openOrders = (tab) => {
    if (!tab || tab === 'buyer') {
      this.setState({ ordersTypes: 'buyer' })
    }
    else this.setState({ ordersTypes: 'seller' })
  }

  render() {
    return (
      <div className="user-orders-container">
        {/* <Header pathname={this.props.location.pathname} /> */}
        <div className="ui secondary pointing menu">
          <div onClick={() => this.openOrders('buyer')}
            className={`item ${this.state.ordersTypes === "buyer" ? "active" : ''}`} >My Orders</div>
          <div onClick={() => this.openOrders('seller')} className={`item ${this.state.ordersTypes === "seller" ? "active" : ''}`}>My Sales</div>
        </div>
        {this.state.ordersTypes === 'seller' && <OrderList orders={this.state.ordersBySeller} />}
        {this.state.ordersTypes === 'buyer' && <OrderList orders={this.state.ordersByBuyer} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};
const mapDispatchToProps = {
  loadOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
