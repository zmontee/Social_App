import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import MyButton from "../../utils/MyButton";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {postNewScream} from "../../redux/actions/dataAction";
import {connect} from "react-redux";
import {setError} from "../../redux/actions/uiAction";

class PostScream extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            body: ''
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit = () => {
        if(this.state.body === '') {
            this.props.setError({body: "Must not be empty"})
        } else if (this.state.body.length > 200) {
            this.props.setError({body: "Too long"})
        } else {
            const newScreamBody = {
                body: this.state.body
            };
            this.props.postNewScream(newScreamBody);
            this.setState({
                body: ''
            })
            this.handleClose();
        }
    }

    render() {
        const {ui:{errors}} = this.props;
        return (
            <>
                <MyButton title="Post new scream" onClick={this.handleOpen}>
                    <AddIcon style={{ color: '#fff' }}/>
                </MyButton>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth='sm'
                >
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='body'
                                       label='Scream'
                                       type='text'
                                       fullWidth
                                       placeholder='New scream body'
                                       helperText={errors.body}
                                       error={errors.body ? true : false}
                                       value={this.state.body}
                                       onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = state => ({
    ui: state.ui
})

export default connect(mapStateToProps, {postNewScream, setError})(PostScream);