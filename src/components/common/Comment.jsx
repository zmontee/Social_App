import React from 'react';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    comment: {
        marginTop: 10,
        display: 'flex'
    },
    userImage: {
        width: 120,
        height: 120,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    userImgWrapper: {
        width: 120
    },
    dialogContentBody: {
        marginLeft: 25
    },
    screamDialogBody: {
        width: 300
    },
    splitLine: {
        width: '100%',
        margin: '0 auto',
        marginTop: 5,
        height: 2,
        backgroundColor: '#E4E6E7'
    }
}

const Comment = props => {
    const {classes, userImage, userHandle, createdAt, body} = props;
    return (
        <>
            <div className={classes.splitLine}></div>
            <div className={classes.comment}>
                <div className={classes.userImgWrapper}>
                    <img src={userImage} className={classes.userImage} alt='User image'/>
                </div>
                <div className={classes.dialogContentBody}>
                    <Typography variant="h5"
                                component={Link}
                                to={`/users/${userHandle}`}
                                color="primary">
                        @{userHandle}
                    </Typography>
                    <Typography variant="body2"
                                color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <Typography variant="body1"
                                className={classes.screamDialogBody}
                    >
                        {body}
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default withStyles(styles)(Comment);