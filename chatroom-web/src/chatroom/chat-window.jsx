import React from 'react';
import { Container, Box, Grid, Divider, Typography, Button, Paper, FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import SendIconButton from './send-icon';
import useMediaQuery from '@mui/material/useMediaQuery';


const ChatContainer = styled(Paper)`
    height: 100%;
    padding: 0.5rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const MessageRow = styled.div`
    padding: 0.2rem;
    display: flex;
    flex-direction: ${props => props.right === true ? 'row-reverse' : 'row'};
`;
const MessageBox = styled(Paper)`
    max-width: 70%;
    padding: 0.4rem;
    display: inline;
    background-color: ${props => props.right === true ? '#e4edd9' : '#f5f4f2'};
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
        <MessageRow right>
            <MessageBox right>
                {props.children}
            </MessageBox>
        </MessageRow>
    );
};

const ContactInfoBar = ({ username, onClose }) => {

    return (
        <Paper elevation={1} sx={{ padding: '0.5rem', height: '2rem' }}>
            <Typography variant='h5'>{username}</Typography>
        </Paper>
    );
}



const ChatWindow = (props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const height = isDesktop ? '30rem' : '80vh';
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '0.3rem' }}>
            <ContactInfoBar username='testing' />
            <Divider />
            <Box sx={{ minHeight: height, maxHeight: height, overflow: 'auto' }}>
                <MessageLeft>Item 1</MessageLeft>
                <MessageLeft>Item111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</MessageLeft>
                <MessageLeft>Item 12em 12em 12em 12em 12  em 12em 12em 12em 12em 12222222 2 22</MessageLeft>

            </Box>
            <Grid container>
                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <TextField id="standard-basic" label="Message" variant="standard" />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <SendIconButton />
                </Grid>
            </Grid >
        </Box>
    );
};

export default ChatWindow;