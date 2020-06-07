import React, { Component } from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class MessageCenter extends React.Component {
  state = {
    msgByUser: null,
    msgByResponder: null,
    openTab: 'inbox'
  };

  componentDidMount() {
    if (!this.props.loggedInUser.msgs) return
    // this.props.loadUsers();
    // this.setState({ rating: this.props.users })
    const currUser = this.props.loggedInUser;
    // console.log(currUser._id, 'id');
    const { msgs } = currUser;
    // console.log('msgs', msgs);
    // console.log('user', this.props.loggedInUser);
    const userMsg = msgs.filter((msg) => msg.sentBy._id == currUser._id)
    const responderMsg = msgs.filter((msg) => msg.sentBy._id !== currUser._id)
  }

  openMsgs = (tab) => {
    this.setState({ openTab: tab })
  }

  render() {
    const { openTab } = this.state
    return (
      <div className="messege-center-container">
        <div className="ui secondary pointing menu">
          <div onClick={() => this.openMsgs('inbox')}
            className={`item ${openTab === "inbox" ? "active" : ''}`} >Inbox</div>
          <div onClick={() => this.openMsgs('sent')}
            className={`item ${openTab === "sent" ? "active" : ''}`}>Sent</div>
        </div>
        <List className="messeges-list">
        {openTab === "sent" && <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
              </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    to Scott, Alex, Jennifer
              </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem> 
          <Divider variant="inset" component="li" />
          </div>}
          {openTab === "inbox" && <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    Sandra Adams
              </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItem>
          </div>}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  }
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MessageCenter);

