import React from 'react';
import { Container, Box, Grid, Divider, Typography, Button } from '@mui/material';
import styled from '@emotion/styled'

const Disclaimer = styled(Typography)`
    color: #888888;
`;

const Footer = (props) => (
    <Container sx={{ marginTop: '1rem', textAlign: 'center' }}>
        <Typography display="block" variant='caption'>Simple Chatroom Demo</Typography>
        <Disclaimer display="block" variant='caption'>It is a online chatroom demo without registration. Though it would store any informtion, you should not expose all your sensitive data here.</Disclaimer>
    </Container>
);

export default Footer;