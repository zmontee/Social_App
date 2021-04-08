import React from 'react';
import {Grid} from "@material-ui/core";
import {Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles"
import AppIcon from "../../assets/images/icon.png";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser, signupUser} from "../../redux/actions/userAction";

const styles = {
    form: {
        textAlign: "center"
    },
    appIcon: {
        width: 100,
        margin: '20 auto 20 auto'
    },
    pageTitle: {
        marginTop: 25
    },
    textField: {
        margin: '10 auto 10 auto'
    },
    submitButton: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        marginTop: 20,
        color: "red",
        fontSize: "0.8rem"
    },
    progress: {
        position: 'absolute'
    }
}

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, ui: { loading, errors } } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="app icon" className={classes.appIcon}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email"
                                   name="email"
                                   type="email"
                                   label="Email"
                                   className={classes.textField}
                                   helperText={errors.email}
                                   error={errors.email ? true : false}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        <TextField className={classes.textField}
                                   id="password"
                                   name="password"
                                   type="password"
                                   label="Password"
                                   helperText={errors.password}
                                   error={errors.password ? true : false}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        <TextField className={classes.textField}
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   type="password"
                                   label="Confirm Password"
                                   helperText={errors.confirmPassword}
                                   error={errors.password ? true : false}
                                   value={this.state.confirmPassword}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        <TextField className={classes.textField}
                                   id="handle"
                                   name="handle"
                                   type="text"
                                   label="Handle"
                                   helperText={errors.handle}
                                   error={errors.handle ? true : false}
                                   value={this.state.handle}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2"
                                        className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                        >
                            Signup
                            {loading && <CircularProgress size={30} className={classes.progress}/>}
                        </Button>
                    </form>
                    <small>already have an account? login <Link to="/login">here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
})

export default connect(mapStateToProps, {
    signupUser,
    logoutUser
})(withStyles(styles)(Signup));