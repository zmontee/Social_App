import React from 'react';
import MyButton from "../../utils/MyButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import {deleteScream} from "../../redux/actions/dataAction";
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";

class DeleteScream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
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

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.handleClose();
    }

    render() {
        return (
            <>
                <MyButton title="Delete" onClick={this.handleOpen}>
                    <DeleteIcon color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth='sm'
                >
                    <DialogTitle>Do you want to delete your scream?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default connect(null, {
    deleteScream
})(DeleteScream);