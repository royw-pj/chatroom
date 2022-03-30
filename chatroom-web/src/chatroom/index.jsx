import React from 'react';
import { Container, Box, Divider, Typography, Button, Paper, Modal } from '@mui/material';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ChatWindow from './chat-window';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled'
import Contact from './contact';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import websocketClient from '../common/websocket-client';

const contactList = [
    { username: 'testing', gender: 'M', country: 'Hong Kong', age: 1 },
    { username: 'ABC', gender: 'F', country: 'China', age: 2 },
    { username: 'ABC7', gender: 'M', country: 'India', age: 3 },
    { username: 'ABC6', gender: 'M', country: 'China', age: 4 },
    { username: 'ABC5', gender: 'F', country: 'China', age: 5 },
    { username: 'ABC1', gender: 'F', country: 'China', age: 6 },
    { username: 'ABC2', gender: 'M', country: 'India', age: 7 },
    { username: 'ABC3', gender: 'F', country: 'Hong Kong', age: 8 },
    { username: 'ABC22', gender: 'F', country: 'Hong Kong', age: 8 },
    { username: 'ABC31', gender: 'F', country: 'Hong Kong', age: 8 },
    { username: 'ABC32', gender: 'F', country: 'Hong Kong', age: 8 },
    { username: 'ABC33', gender: 'F', country: 'Hong Kong', age: 8 },
    { username: 'ABC34', gender: 'F', country: 'Hong Kong', age: 8 },
];

const Chatroom = (props) => {

    const isDesktop = useMediaQuery('(min-width:900px)');
    const maxHeight = '39rem';

    React.useEffect(() => {
        websocketClient.connect();
    }, []);

    return (
        <Box sx={{ maxHeight: maxHeight, overflow: 'hidden' }}>
            <Grid container sx={{ overflow: 'hidden', maxHeight: maxHeight }}>
                <Grid item xs={12} md={3} sx={{ overflow: 'auto', maxHeight: maxHeight }}>
                    <List sx={{ bgcolor: 'background.paper' }} component="nav"  >
                        {contactList.map((contact) => <React.Fragment key={contact.username}><Contact  {...contact} /><Divider /></React.Fragment>)}
                    </List>
                </Grid>

                <Grid item md={9} sx={{ display: { xs: 'none', md: 'block' } }}>
                    {isDesktop ? <ChatWindow /> : <Dialog fullScreen open={true}>
                        <IconButton sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                        <ChatWindow />
                    </Dialog>}


                </Grid>
            </Grid >
        </Box >
    );
};

export default Chatroom;