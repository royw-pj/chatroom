import React from 'react';
import { Container, Box, Grid, Divider, Typography, Button, Paper } from '@mui/material';

import styled from '@emotion/styled'
import MuiMaleIcon from '@mui/icons-material/Male';
import MuiFemaleIcon from '@mui/icons-material/Female';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const FemaleIcon = styled(MuiFemaleIcon)`
    color: #fe6060
`;

const MaleIcon = styled(MuiMaleIcon)`
    color: #4bb7ff;
`;


const Contact = ({ username, country, age, gender, ...props }) => (
    <ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon>
                {gender === 'M' ? <MaleIcon /> : <FemaleIcon />}
            </ListItemIcon>
            <ListItemText primary={username} secondary={age + ', ' + country} />
        </ListItemButton>
    </ListItem>
);
export default Contact;;