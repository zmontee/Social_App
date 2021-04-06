import React from 'react';
import MyButton from "../../utils/MyButton";
import {
    Button,
    Dialog,
    DialogContent,
    Typography, TextField, CircularProgress
} from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import {connect} from "react-redux";
import {commentOnScream, getScreamDetails} from "../../redux/actions/dataAction";
import Comment from "./Comment";

const styles = {
    screamDialog: {
        position: 'relative'
    },
    dialogClose: {
        position: 'absolute',
        width: 50,
        right: 30
    },
    userImage: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    userImgWrapper: {
        width: 150
    },
    scream: {
        display: 'flex'
    },
    comments: {
        marginLeft: 50
    },
    dialogContentBody: {
        marginLeft: 25
    },
    screamDialogBody: {
        width: 350
    },
    splitLine: {
        width: '100%',
        margin: '0 auto',
        marginTop: 5,
        height: 2,
        backgroundColor: '#E4E6E7'
    },
    commentBtn: {
        marginTop: 15,
        marginLeft: '80%'
    },
    commentForm: {
        marginTop: 10
    },
    progress: {
        marginLeft: '45%'
    }
}

class ScreamDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            commentBody: '',
            oldPath: '',
            newPath: ''
        }
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        const newPath = `/user/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath) oldPath = `/user/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.props.getScreamDetails(this.props.screamId);
        this.setState({
            open: true,
            oldPath,
            newPath
        })
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);

        this.setState({
            open: false
        })
    }

    handleChange = (event) => {
        this.setState({
            commentBody: event.target.value
        })
    }

    handleSubmit = () => {
        this.setState({
            screamLoading: true
        });
        if (this.state.commentBody.length > 200) {
            this.props.setError({comment: "Too long"})
        } else {
            const newScreamBody = {
                body: this.state.commentBody
            };
            this.props.commentOnScream(this.props.screamId, newScreamBody);
            this.setState({
                commentBody: '',
                screamLoading: false
            })
        }
    }

    render() {
        const {
            classes, userImage, userHandle, createdAt, body,
            likeButton, likeCount, loading, authenticated, ui: {errors}
        } = this.props;

        const comments = this.props.comments.map(c => <Comment userImage={c.userImage}
                                                               userHandle={c.userHandle}
                                                               createdAt={c.createdAt}
                                                               body={c.body}
        />).reverse();

        return (
            <>
                <MyButton title="Comments" onClick={this.handleOpen}>
                    <CommentIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth='sm'
                        className={classes.screamDialog}
                >
                    <MyButton title="Close" onClick={this.handleClose} tipClassName={classes.dialogClose}>
                        <CloseIcon/>
                    </MyButton>
                    <>
                        <DialogContent className={classes.dialogContent}>
                            <div className={classes.scream}>
                                <div className={classes.userImgWrapper}>
                                    <img src={userImage} className={classes.userImage} alt="User image"/>
                                </div>
                                <div className={classes.dialogContentBody}>
                                    <Typography variant="h5"
                                                component={Link}
                                                to={`/user/${userHandle}`}
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
                                    <div className={classes.screamBtns}>
                                        {likeButton}
                                        <span color="primary">{likeCount} Likes</span>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <CircularProgress className={classes.progress}/>
                            ) : (
                                <div className={classes.comments}>
                                    {comments}
                                    <div className={classes.splitLine}></div>
                                    {authenticated ?
                                        (<>
                                            <form className={classes.commentForm}>
                                                <TextField name='body'
                                                           label='Comment on scream'
                                                           type='text'
                                                           fullWidth
                                                           placeholder='Comment'
                                                           helperText={errors.comment}
                                                           error={errors.comment ? true : false}
                                                           value={this.state.commentBody}
                                                           onChange={this.handleChange}
                                                />
                                                <Button onClick={this.handleSubmit}
                                                        color='primary'
                                                        className={classes.commentBtn}
                                                        variant="contained"
                                                >
                                                    Post
                                                </Button>
                                            </form>
                                        </>)
                                        :
                                        null}
                                </div>
                            )}
                        </DialogContent>
                    </>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.data.currentScream.comments,
    loading: state.data.loading,
    ui: state.ui,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {getScreamDetails, commentOnScream})(withStyles(styles)(ScreamDialog));