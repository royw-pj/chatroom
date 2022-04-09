import React from 'react';
import {  Box, Grid, Divider, Typography, Button, Paper, FormControl } from '@mui/material';
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { observer } from "mobx-react-lite"
import chatroomStore from '../common/store';
import websocketClient from '../common/websocket-client';
import SendIcon from '@mui/icons-material/Send';


const MessageRow = styled.div`
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    display: flex;
    flex-direction: ${props => props.right === true ? 'row-reverse' : 'row'};
`;
const MessageBox = styled(Paper)`
    max-width: 70%;
    padding: 0.4rem;
    display: inline;
    background-color: ${props => props.right ? '#e4edd9' : '#f5f4f2'};
    overflow-wrap: anywhere;
`;

const MessageLeft = (props) => {
    return (
        <MessageRow>
            <MessageBox>
                {props.children}
            </MessageBox>
        </MessageRow>
    );
};
const MessageRight = (props) => {
    return (
        <MessageRow right={true}>
            <MessageBox right={true}>
                {props.children}
            </MessageBox>
        </MessageRow>
    );
};

const ContactInfoBar = observer(() => {
    return (
        <Paper elevation={1} sx={{ padding: '0.5rem', height: '2rem' }}>
            <Typography variant='h5'>{chatroomStore.selectedContact}</Typography>
        </Paper>
    );
});

const ChatWindow = observer((props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const height = isDesktop ? '30rem' : '80vh';

    const messages = chatroomStore.chats[chatroomStore.selectedContact];
    const username = chatroomStore.userInfo.username;
    const onSubmit = (e) => {
        e.preventDefault();
        if (!e.target.message.value) {
            return;
        }
        const message = {
            sender: username,
            receiver: chatroomStore.selectedContact,
            body: e.target.message.value
        };
        websocketClient.sendMessage(message);
        chatroomStore.sendMessage(message);
        
        e.target.message.value = '';
    };

    return (
        <Paper sx={{ height: '100%', overflow:'hidden' }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '0.3rem' }}>
                <ContactInfoBar />
                <Divider />
                <Box sx={{ minHeight: height, maxHeight: height, overflow: 'auto' }}>
                    {Boolean(chatroomStore.selectedContact) && Array.isArray(messages) && messages.map((message, idx) => {
                        if (message.sender !== username) {
                            return <MessageLeft key={idx}>{message.body}</MessageLeft>;
                        } else {
                            return <MessageRight key={idx}>{message.body}</MessageRight>;
                        }
                    })}
                </Box>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            <FormControl fullWidth>
                                <TextField id="standard-basic" label="Message" variant="standard" name='message' />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex' }}>
                            <Button type='submit' variant="contained" color="primary" aria-label="Send" endIcon={<SendIcon />} sx={{ padding: '0.4rem', minWidth: '3rem' }} />
                        </Grid>
                    </Grid >
                </form>
            </Box>
        </Paper>
    );
});

export default ChatWindow;