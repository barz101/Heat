import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";

import { connect } from "react-redux";
import { login } from "../actions/userActions.js";
import Swal from "sweetalert2";

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };


  doLogin = async (ev) => {
    ev.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({ msg: "Please enter user/password" });
    }
    const userCreds = { email, password };
    // try {
    this.props.login(userCreds)
      .then(res => this.props.history.push(`/`))
      .catch(error => {
        this.setState({ email: '', password: '' })
        Swal.fire({
          title: 'Wrong password or email',
          text: 'Please try again',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
  }

  // doLogin = async (ev) => {
  //   ev.preventDefault();
  //   const { email, password } = this.state;
  //   if (!email || !password) {
  //     return this.setState({ msg: "Please enter user/password" });
  //   }
  //   const userCreds = { email, password };
  //   this.props.login(userCreds);
  //   this.setState({ email: "", password: "" }, () =>
  //     this.props.history.push(`/`)
  //   );
  // };


  render() {

    const classes = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    return (
      // <div class="background-container">
      < form className={classes.form} noValidate onSubmit={this.doLogin} >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={this.handleChange}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={this.handleChange}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
            </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link to="/auth/signup" variant="body2" onClick={() => { this.props.showSignup(true) }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form >
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
