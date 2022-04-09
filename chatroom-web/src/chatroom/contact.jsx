import React from 'react';
import styled from '@emotion/styled'
import MuiMaleIcon from '@mui/icons-material/Male';
import MuiFemaleIcon from '@mui/icons-material/Female';
import MuiChatIcon from '@mui/icons-material/Chat';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import chatroomStore from '../common/store';
import { observer } from "mobx-react-lite"

const FemaleIcon = styled(MuiFemaleIcon)`
    color: #fe6060
`;

const MaleIcon = styled(MuiMaleIcon)`
    color: #4bb7ff;
`;

const ChatIcon = styled(MuiChatIcon)`
    color: #ffbee8;
    font-size: 1.3rem;
`;

const Contact = observer(({ username, country, age, gender, onClick, ...props }) => (
    <ListItem disablePadding onClick={onClick}>
        <ListItemButton>
            <ListItemIcon>
                {gender === 'M' ? <MaleIcon /> : <FemaleIcon />}
            </ListItemIcon>
            <ListItemText primary={username} secondary={age + ', ' + country} />
            {chatroomStore.unreadMessageSet.has(username) && <ChatIcon/>}
        </ListItemButton>
    </ListItem>
));
export default Contact;;