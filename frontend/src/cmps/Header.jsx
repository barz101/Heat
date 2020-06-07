import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { RiLoginCircleLine } from 'react-icons/ri';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import CitySearchBar from "./CitySearchBar.jsx";



class Header extends React.Component {
  state = {
    isUp: false
  }
  componentDidMount() {
    if (this.props.pathname === "/" || this.props.pathname === `/${this.props.city}`) {
      window.addEventListener("scroll", this.handleScroll);
    }
    else {
      this.setState({ isUp: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (
      document.body.scrollTop > 350 ||
      document.documentElement.scrollTop > 350
    ) {
      this.setState({ isUp: true })
      document.querySelector(".main-header").style.background = "#4eaf6a";
      document.querySelector(".logo").style.background = "none";
      document.querySelector(".main-header").style.boxShadow = "0 1px 3px #0000006b";

    } else {
      this.setState({ isUp: false })
      document.querySelector(".main-header").style.background = "transparent";
      document.querySelector(".logo").style.background = "4eaf6a";
      document.querySelector(".main-header").style.boxShadow = "none";
    }
  };

  render() {
    const {isUp} = this.state;
    return (
      <div
        className={
          this.props.pathname === "/" || this.props.pathname === `/${this.props.city}` ? "main-header" : "main-header regular"
        }
      >
        <Link to="/">
          <div className="logo">
            {/* className="events-nav-icon"  */}
            <span>HEAT</span>

          </div>
        </Link>
        {isUp && <CitySearchBar></CitySearchBar>}
        <div className="header-nav">
          {this.props.loggedInUser && (
            <div className="welcome-user-nav">
              Welcome, {this.props.loggedInUser.name.first}!
            </div>
          )}
          {this.props.loggedInUser && (
            <Link to="/profile">
              <FaUserCircle className="profile" />
            </Link>
          )}
          {!this.props.loggedInUser && (
            <Link to="/auth">
              <div className="login flex align-center justify-center">
                <span>Login</span>
                <RiLoginCircleLine />
              </div>
            </Link>
          )}
          {this.props.loggedInUser && (
            <Link to="/">
              <RiLogoutCircleLine className="logout" onClick={this.props.logout} />
            </Link>
          )}
        </div>
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
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
