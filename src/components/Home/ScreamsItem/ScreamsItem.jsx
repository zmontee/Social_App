import React from 'react';
import s from './ScreamsItem.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../../../utils/MyButton";
import LikeIcon from '@material-ui/icons/ThumbUpAlt';

import {connect} from "react-redux";
import {likeScream, unlikeScream} from "../../../redux/actions/dataAction";
import DeleteScream from "../../common/DeleteScream";
import ScreamDialog from "../../common/ScreamDialog";

class ScreamsItem extends React.Component {

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(
            like => like.screamId === this.props.scream.screamId
        ))  {
            return true;
        } else return false;
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }

    render() {
        dayjs.extend(relativeTime);

        const {
            scream:{ screamId, userImage, userHandle, createdAt, body, likeCount, commentCount },
            user:{ authenticated, credentials: {handle} },
        } = this.props;

        const likeButton = !authenticated ? (
            <MyButton title='Like'>
                <Link to='/login'>
                    <LikeIcon />
                </Link>
            </MyButton>
            ) : (
                this.likedScream() ? (
                    <MyButton title='Unlike' onClick={this.unlikeScream}>
                        <LikeIcon color="primary"/>
                    </MyButton>
                ) : (
                    <MyButton title='Like' onClick={this.likeScream}>
                        <LikeIcon />
                    </MyButton>
                )
            )

        const fullScream = (
            <ScreamDialog userImage={userImage}
                          screamId={screamId}
                          userHandle={userHandle}
                          createdAt={createdAt}
                          body={body}
                          likeCount={likeCount}
                          commentCount={commentCount}
                          likeScream={this.likedScream}
                          unlikeScream={this.unlikeScream}
                          likeButton={likeButton}
                          screamId={screamId}
                          openDialog={this.props.openDialog}
            />
        )

        const deleteButton = authenticated && handle === userHandle ?
            (<DeleteScream screamId={screamId}/>) : null;

        return (
            <Card className={s.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={s.userImg}
                />
                <CardContent className={s.content}>
                    <Typography variant="h5"
                                component={Link}
                                to={`/user/${userHandle}`}
                                color="primary">
                        {userHandle}
                    </Typography>
                    <Typography variant="body2"
                                color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <div className={s.screamBody}>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                    </div>
                    <div className={s.screamBtns}>
                        {likeButton}
                        <span color="primary">{likeCount} Likes</span>
                        {fullScream}
                        <span color="primary">{commentCount} Comments</span>
                    </div>
                    <div className={s.delete}>
                        {deleteButton}
                    </div>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    likeScream,
    unlikeScream,
})(ScreamsItem);