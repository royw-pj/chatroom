import React from 'react';
import MuiPaper from '@mui/material/Paper';

import styled from '@emotion/styled'
import { Typography } from '@mui/material';

const Paper = styled(MuiPaper)`
    margin: 0.5rem;
    padding: 1rem;
`;

const SimplePaper = ({ topic, content }) => (
    <Paper elevation={6}>
        <Typography variant='h6'>{topic}</Typography>
        <Typography variant='h7' color="text.secondary">{content}</Typography>
    </Paper>
);

export default SimplePaper;