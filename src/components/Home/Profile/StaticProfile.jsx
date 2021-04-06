import React, {Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";
import {CalendarToday, LocationOn} from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import dayjs from "dayjs";

const styles = {
    paper: {
        padding: 20
    },
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
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
    profileButton: {
        display: 'block',
        margin: '0 auto',
        marginTop: '20px'
    },
    progress: {
        margin: '0 auto'
    }
}

class StaticProfile extends React.Component {
    render() {
        const {classes, profile:{handle, imageUrl, bio, location, website, createdAt}
        } = this.props;

        return (
            <>
                <Paper className={classes.paper}>
                    <div>
                        <div className={classes.imageWrapper}>
                            <img src={imageUrl} alt="profile" className={classes.profileImage}/>
                        </div>
                        <hr/>
                        <div className={classes.profileDetails}>
                            <MuiLink component={Link}
                                     to={`/users/${handle}`}
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
                    </div>
                </Paper>
            </>
        )
    }
}

export default withStyles(styles)(StaticProfile);