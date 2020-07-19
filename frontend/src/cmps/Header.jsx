import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { RiLoginCircleLine } from 'react-icons/ri';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import CitySearchBar from "./CitySearchBar.jsx";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';



class Header extends React.Component {
  state = {
    isUp: false,
    hamburger: 'navClosed'
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
  toggleHamburger = () => {
    if (this.state.hamburger === 'navClosed') this.setState({ hamburger: 'navOpened' });
    else this.setState({ hamburger: 'navClosed' });
  }

  render() {
    const { isUp } = this.state;
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
        <div className={"container-nav " + this.state.hamburger}>
          <div onClick={this.toggleHamburger} className="hamburger">
            {this.state.hamburger === 'navClosed' && <MenuIcon style={{ fontSize: 40 }} />}
            {this.state.hamburger === 'navOpened' && <CloseIcon style={{ fontSize: 40 }} />}
          </div>
          <div className={"header-nav " + this.state.hamburger}>
            {this.props.loggedInUser && (
              <div className="welcome-user-nav">
                Welcome, {this.props.loggedInUser.name.first}!
              </div>
            )}
            {this.props.loggedInUser && (
              <Link to="/profile">
                {this.state.hamburger === 'navClosed' && <FaUserCircle className="profile" />}
                {this.state.hamburger === 'navOpened' && <span className="profile-content">My Profile</span>}
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
                <div onClick={this.props.logout}>
                  {this.state.hamburger === 'navClosed' && <RiLogoutCircleLine className="logout" />}
                  {this.state.hamburger === 'navOpened' && <span className="logout-content" >Logout</span>}
                </div>
              </Link>
            )}
          </div>
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
