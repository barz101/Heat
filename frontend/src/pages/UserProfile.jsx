import React, { Component } from "react";
import { connect } from "react-redux";
import orderService from "../services/orderService";
import { loadOrders } from "../actions/orderActions.js";
import OrderList from "../cmps/OrderList.jsx";
import Header from "../cmps/Header";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserOrders from '../cmps/UserOrders';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import PersonalDetails from './PersonalDetails.jsx'
import MessageCenter from './MessageCenter.jsx'

export default class UserProfile extends React.Component {
  state = {
    currTab: 'order'
  };

  componentDidMount() {

  }
  useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },

  }));

  openTab = (tab) => {
    // this.setState({ currTab: tab }, () => console.log('state', this.state);
    this.setState({ currTab: tab });
  }

  render() {
    const { currTab } = this.state
    return (
      <div>
        <Header pathname={this.props.location.pathname} />
        <div className="user-profile-container flex">
          <List component="nav" className="profile-menu">
            <ListItem button onClick={() => this.openTab('personal')}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Profile"  />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button onClick={() => this.openTab('order')}>
              <ListItemAvatar>
                <Avatar>
                  <LocalGroceryStoreIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Orders"  />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button onClick={() => this.openTab('messages')}>
              <ListItemAvatar>
                <Avatar>
                  <MessageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Messages"  />
            </ListItem>
          </List>
          <div className="profile-main-content">
            <div className="ui segment flex">
              {currTab === 'order' && <UserOrders />}
              {currTab === 'personal' && <PersonalDetails />}
              {currTab === 'messages' && <MessageCenter />}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

// const mapStateToProps = (state) => { };
// // const mapDispatchToProps = {};

// // export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);




