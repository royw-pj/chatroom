import React from 'react';

import { Container, Typography } from '@mui/material';

const About = () => {
    return (
        <Container>
            <Typography variant='h5' sx={{ mb: 2 }}>
                Simple Online Chatroom Demo
            </Typography>

            <p>A simple online chatroom demo without registration. </p>
            <p>Do not leave any sensitive information or contact here. </p>
            <p>All data will not be stored in server. </p>
        </Container>
    );
};

export default About;