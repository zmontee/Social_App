import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {editUserDetails} from "../../redux/actions/userAction";
import Button from "@material-ui/core/Button";
import s from "../Home/Profile/Profile.module.css";

class EditDetails extends React.Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        })
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
    return (
        <>
                <Button className={s.profileButton}
                        variant="outlined"
                        color="primary"
                        onClick={this.handleOpen}
                >
                    Edit profile info
                </Button>
            <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidh='sm'
            >
                <DialogTitle>Edit your profile info</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            label="Bio"
                            type="text"
                            fullWidth
                            placeholder='A short bio about yourself'
                            value={this.state.bio}
                            onChange={this.handleChange}
                        />
                        <TextField
                            name="website"
                            label="Website"
                            type="text"
                            fullWidth
                            placeholder='Your personal/professional website'
                            value={this.state.website}
                            onChange={this.handleChange}
                        />
                        <TextField
                            name="location"
                            label="Location"
                            type="text"
                            fullWidth
                            placeholder='Where you live'
                            value={this.state.location}
                            onChange={this.handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>

      )
    }
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {
    editUserDetails
})(EditDetails);