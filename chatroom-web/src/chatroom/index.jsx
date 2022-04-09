import React from 'react';
import {  Box, Divider,  Paper,  } from '@mui/material';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ChatWindow from './chat-window';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import Contact from './contact';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import chatroomStore from '../common/store';
import { observer } from "mobx-react-lite"


const Chatroom = observer((props) => {
    const [chatWindowOpen, setChatWindowOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width:900px)');

    const handleContactClick = (username) => {
        chatroomStore.setSelectedContact(username);
        chatroomStore.readMessage(username);
        if (!isDesktop) {
            setChatWindowOpen(true);
        }
    };

    const handleCloseDialog = () => {
        chatroomStore.setSelectedContact(null);
        if (!isDesktop) {
            setChatWindowOpen(false);
        }
    };

    const maxHeight = '39rem';

    const contactList = chatroomStore.contactList.filter(user => user.username !== chatroomStore.userInfo.username);
    return (
        <Box sx={{ maxHeight: maxHeight, overflow: 'hidden' }}>
            <Grid container sx={{ overflow: 'hidden', maxHeight: maxHeight }}>
                <Grid item xs={12} md={3} sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: maxHeight }}>
                    <Paper sx={{ height: '100%' }} >
                        <List sx={{ bgcolor: 'background.paper' }} component="nav"  >
                            {contactList.map((contact) => <React.Fragment key={contact.username}><Contact onClick={() => handleContactClick(contact.username)} {...contact} /><Divider /></React.Fragment>)}
                        </List>
                    </Paper>
                </Grid>

                <Grid item md={9} sx={{ display: { xs: 'none', md: 'block' } }}>
                    {isDesktop ? <ChatWindow /> : <Dialog fullScreen open={chatWindowOpen}>
                        <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                        <ChatWindow />
                    </Dialog>}
                </Grid>
            </Grid >
        </Box >
    );
});

export default Chatroom;