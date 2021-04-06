import React from 'react';
import {Grid} from "@material-ui/core";
import {Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles"
import AppIcon from "../../assets/images/icon.png";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../../redux/actions/userAction";

const styles = {
    form: {
        textAlign: "center"
    },
    appIcon: {
        width: 50,
        margin: '20 auto 20 auto'
    },
    pageTitle: {
        margin: '10 auto 10 auto'
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

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        //destructuring
        const { classes, ui: {loading, errors} } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="app icon" className={classes.appIcon}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
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
                            Login
                            {loading && <CircularProgress size={30} className={classes.progress}/>}
                        </Button>
                    </form>
                    <small>dont have an account? sign up <Link to="/signup">here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        ui: state.ui
    }
}

export default connect(mapStateToProps, {
    loginUser
})(withStyles(styles)(Login));