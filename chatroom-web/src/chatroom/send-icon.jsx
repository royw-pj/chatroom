import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

const SendButton = (props) => {
    return (
        <IconButton color="primary" aria-label="Send" component="span">
            <SendIcon sx={{marginTop:'0.5rem'}}/>
        </IconButton>
    );
};
export default SendButton;
