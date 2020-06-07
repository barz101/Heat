import React, { Component } from "react";
import { connect } from "react-redux";
import userService from '../services/userService';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
  login,
  logout,
  signup
} from '../actions/userActions';
import Header from './Header';


class SignupForm extends Component {
  state = {
    first: '',
    last: '',
    email: '',
    password: '',
    imgUrl: '',
  }

  handleChange = (ev) => {
    let { name, value } = ev.target;
    value = ev.target.type === 'number' ? parseInt(value) : value;
    this.setState({ [name]: value });
  }
  handleImgUpload = (ev) => {
    userService.uploadImg(ev)
      .then(res => this.setState({ imgUrl: res.url }))
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('ev2', ev);
    const { email, password, first, last } = this.state;
    if (!email || !password || !first || !last) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    console.log('imgurl', this.state.imgUrl);

    const userToAdd = this.state;
    userToAdd.createdAt = Date.now();
    userToAdd.isAdmin = false;
    const signupCreds = userToAdd
    console.log('signupCreds', signupCreds);
    this.props.signup(signupCreds);
    this.setState({ email: '', password: '', first: '', last: '', imgUrl: '' }, () => this.props.history.push(`/`));
  }


  render() {
    return (
      <form className="form" noValidate onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="first"
              variant="outlined"
              className="no-outlined"
              required
              fullWidth
              id="first"
              label="First Name"
              autoFocus
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="last"
              label="Last Name"
              name="last"
              autoComplete="lname"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          className="submit"
          type="submit"
          fullWidth
          variant="contained"
          onClick={this.handleSubmit}
        >
          Sign Up
          </Button>
        {/* <label htmlFor="imgUpload">Img</label> */}
        {/* <input id="imgUpload" onChange={this.handleImgUpload} type="file" style={{ display: 'none' }} /> */}
        {/* <button>Save</button> */}
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/auth" variant="body2" onClick={() => { this.props.showSignup(false) }}>
              Already have an account? Sign in
              </Link>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    // isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,

};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);