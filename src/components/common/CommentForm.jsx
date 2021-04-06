import React from 'react';
import {TextField} from "@material-ui/core";

const CommentForm = props => {
    return (
        <>
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
            </form>
        </>
    )
}

export default CommentForm;