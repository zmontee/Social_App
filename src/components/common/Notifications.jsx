import React from 'react';
import {markNotificationsRead} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import {Badge, IconButton, Menu, MenuItem, Tooltip, Typography} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import {Link} from "react-router-dom";

class Notifications extends React.Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null
        }
    }

    handleOpen = event => {
        this.setState({
            anchorEl: event.target
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    onMenuOpen = () => {
        let unreadNotificationIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);

        this.props.markNotificationsRead(unreadNotificationIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
                ? notificationIcon = (
                    <Badge badgeContent={notifications.filter(not => not.read === false).length}
                           color={"secondary"}
                    >
                        <NotificationsIcon style={{ color: '#FFFFFF' }}/>
                    </Badge>
                ) : (
                    notificationIcon = <NotificationsIcon style={{ color: '#FFFFFF' }}/>
                )
        } else {
            notificationIcon = <NotificationsIcon style={{ color: '#FFFFFF' }}/>
        }
        let notificationsMarkUp =
            notifications && notifications.length > 0 ? (
                notifications.map(not => {
                    const verb = not.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like' ? (
                        <LikeIcon color={iconColor} style={{ marginRight: 10 }}/>
                    ) : (
                        <CommentIcon color={iconColor} style={{ marginRight: 10 }} />
                    )

                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            <Typography component={Link}
                                        variant="body1"
                                        to={`/user/${not.recipient}/scream/${not.screamId}`}
                            >
                                {icon} {not.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )
        return (
            <>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpen}
                                >
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpen}
                >
                    {notificationsMarkUp}
                </Menu>
            </>
        )
    }
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);