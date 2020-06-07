import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

class Footer extends React.Component {
  componentDidUpdate() {}
  render() {
    return (
      <div className="main-footer">
        <div className="logo">HEAT</div>
        {/* <small>It's a Heat!</small> */}
        <small>©2020 all rights reserved</small>
        {/* <div className="footer-social flex">
          <a href="https://www.facebook.com/" target="_blank">
            <FacebookIcon />
          </a>
          <a href="https://twitter.com/home" target="_blank">
            <TwitterIcon />
          </a>
          <a href="https://www.linkedin.com/feed/" target="_blank">
            <LinkedInIcon />
          </a>
        </div> */}
      </div>
    );
  }
}

export default withRouter(Footer);
