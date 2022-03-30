import React from 'react';
import { Container, Box, Grid, Divider, Typography, Button } from '@mui/material';
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

const countryListHelper = require('country-list');


const Paper = styled(MuiPaper)`
    padding: 0.7rem;
`;

const FormControl = styled(MuiFormControl)`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Registration = (props) => {
    const [country, setCountry] = React.useState('');
    const countries = countryListHelper.getData();
    const navigate = useNavigate();
    const onLoginClick = () => {
        navigate('/chatroom');
    };
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
                            <FormControl fullWidth>
                                <TextField label='Username' variant='outlined' />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select value={country} label='Country'>
                                    {countries.map((elem) => <MenuItem key={elem.code} value={elem.code}>{elem.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField label='Age' variant='outlined' />
                            </FormControl>

                            <FormControl>
                                <RadioGroup row defaultValue='M'>
                                    <FormControlLabel value='M' control={<Radio />} label='Male' />
                                    <FormControlLabel value='F' control={<Radio />} label='Female' />
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <Button variant="outlined" onClick={onLoginClick} startIcon={<LoginIcon />}>Login</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
            <Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
            <RulesAndUpdate />
        </Container>
    );
};

export default Registration;