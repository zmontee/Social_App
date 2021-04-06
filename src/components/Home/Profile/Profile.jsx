import React, { Fragment } from 'react';
/*import s from './Profile.module.css';*/
import {connect} from "react-redux";
import { Paper, Typography} from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import {LocationOn, CalendarToday} from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import {logoutUser, uploadImage} from "../../../redux/actions/userAction";
import EditDetails from "../../common/EditDetails";
import MyButton from "../../../utils/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    paper: {
        padding: 20
    },
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
        marginLeft: 50
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    profileDetails: {
        textAlign: 'center'
    },
    'span, svg': {
        verticalAlign: 'middle'
    },
    hr: {
        border: 'none',
        margin: '0 0 10px 0'
    },
    'svg.button:hover': {
        cursor: 'pointer'
    },
    profileButton: {
        display: 'block',
        margin: '0 auto',
        marginTop: '20px'
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    progress: {
        margin: '0 auto'
    }
}

class Profile extends React.Component {
    handleImageChange = event => {
        const image = event.target.files[0];
        this.props.uploadImage(image);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes,
            user: {
                authenticated,
                credentials: { handle, createdAt, imageUrl, bio, website, location}
            }
        } = this.props;

        let ProfileMarkup = authenticated ? (
            <Paper className={classes.paper}>
                <div>
                    <div className={classes.imageWrapper}>
                        <img src={imageUrl} alt="profile" className={classes.profileImage}/>
                        <input type="file"
                               id="imageInput"
                               hidden="hidden"
                               onChange={this.handleImageChange}
                        />
                        <MyButton title="Edit profile picture"
                                  onClick={this.handleEditPicture}>
                            <EditIcon color="primary"/>
                        </MyButton>
                    </div>
                    <hr/>
                    <div className={classes.profileDetails}>
                        <MuiLink component={Link}
                                 to={`/user/${handle}`}
                                 color="primary"
                                 variant="h5"
                        >
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary"/>
                                <span>{location}</span>
                            </Fragment>
                        )}
                        <hr/>
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website}
                                   target="_blank"
                                   ref="noopener noreferrer"
                                   className={classes.a}
                                >
                                    {website}
                                </a>
                            </Fragment>
                        )}
                        <hr/>
                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>

                    <EditDetails/>
                        <Button className={classes.profileButton}
                                variant="contained"
                                color="primary"
                                onClick={this.handleLogout}
                        >
                            Logout
                        </Button>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2"
                            align="center"
                >
                    No profile found, please login or signup.
                    <div className={classes.buttons}>
                        <Button variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                                className={classes.a}
                        >
                            Login
                        </Button>
                        <Button variant="contained"
                                component={Link}
                                to="/signup"
                                className={classes.a}
                        >
                            Signup
                        </Button>
                    </div>
                </Typography>
            </Paper>
        )

        return (
            ProfileMarkup
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
})

const mapDispatchToProps = {
    uploadImage,
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));