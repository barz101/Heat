import React, { Component } from "react";
import LoginForm from '../cmps/LoginForm';
import SignupForm from '../cmps/SignupForm';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


export default class AuthPage extends Component {
    state = {
        isSignup: false
    }

    componentDidMount() {
        document.querySelector('.main-footer').style.display = 'none';
        this.showSignup(this.props.history.location.pathname.includes('signup'))
    }

    showSignup = (shouldShowSignup) => {
        this.setState({ isSignup: shouldShowSignup }, () => { console.log("Called", shouldShowSignup) });
    }

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
            <div className="background-container">
                {/* <Header pathname={this.props.location.pathname} /> */}
                <Container component="main" maxWidth="xs" className="signin-container">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Link to="/">
                            <div className="logo">HEAT</div>
                        </Link>
                        {!this.state.isSignup && <LoginForm showSignup={this.showSignup} history={this.props.history}></LoginForm>}
                        {this.state.isSignup && <SignupForm showSignup={this.showSignup} history={this.props.history} />}
                    </div>
                    {/* <Box mt={8}></Box> */}
                </Container>
            </div>
        );
    }
}
