import React from 'react';
import { Container, Box, Grid, Divider, Typography, Button, FormHelperText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiFormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MuiPaper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginIcon from '@mui/icons-material/Login';
import RulesAndUpdate from '../components/layout/rules-and-updates';
import Logo from '../components/logo';
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom';
import chatroomStore from '../common/store';
import websocketClient from '../common/websocket-client';
import { observer } from 'mobx-react-lite';

const countryListHelper = require('country-list');


const Paper = styled(MuiPaper)`
    padding: 0.7rem;
`;

const FormControl = styled(MuiFormControl)`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Registration = observer((props) => {
    const countries = countryListHelper.getData();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (chatroomStore.isLoggedOn) {
            navigate('/chatroom');
        }
    }, [chatroomStore.isLoggedOn]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            username: e.target.username.value,
            country: e.target.country.value,
            age: e.target.age.value,
            gender: e.target.gender.value,
        };
        try {
            await websocketClient.connect();
            websocketClient.login(userInfo);
        } catch (ex) {
            console.log(ex);
        }

    };
    const registrationErrors = chatroomStore.registrationErrors;

    return (
        <Container>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
                <Grid item xs={12} md={6}>
                    <Logo />
                    <Typography variant='h5'>Simple Chatroom Demo Without Registration</Typography>
                    <Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
                    <Paper elevation={3}>
                        <Typography variant='h6'>Join chat: </Typography>
                        <Box>
                            <form onSubmit={onSubmit}>
                                <FormControl fullWidth>
                                    <TextField label='Username' variant='outlined' name='username' error={Boolean(registrationErrors.username)} helperText={registrationErrors.username} />
                                </FormControl>
                                <FormControl fullWidth error={Boolean(registrationErrors.country)}>
                                    <InputLabel>Country</InputLabel>
                                    <Select label='Country' name='country' defaultValue=''>
                                        {countries.map((elem) => <MenuItem key={elem.name} value={elem.name}>{elem.name}</MenuItem>)}
                                    </Select>
                                    {Boolean(registrationErrors.country) && <FormHelperText>{registrationErrors.country}</FormHelperText>}
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField label='Age' variant='outlined' name='age' type='number' error={Boolean(registrationErrors.age)} helperText={registrationErrors.age} />
                                </FormControl>

                                <FormControl>
                                    <RadioGroup row defaultValue='M' name='gender'>
                                        <FormControlLabel value='M' control={<Radio />} label='Male' />
                                        <FormControlLabel value='F' control={<Radio />} label='Female' />
                                    </RadioGroup>
                                </FormControl>
                                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <Button variant="outlined" type="submit" startIcon={<LoginIcon />}>Login</Button>
                                </Box>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
            <RulesAndUpdate />
        </Container>
    );
});

export default Registration;