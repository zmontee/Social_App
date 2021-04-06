import React from 'react';
import {IconButton, Tooltip} from "@material-ui/core";

export default ({children, onClick, title, btnClassName, tipClassName}) => {
    return (<Tooltip title={title} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>)
}