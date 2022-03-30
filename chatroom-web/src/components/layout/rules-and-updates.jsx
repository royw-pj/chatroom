import React from 'react';
import Grid from '@mui/material/Grid';
import SimeplePaper from '../simple-paper';
import { Typography, Box } from '@mui/material';
import styled from '@emotion/styled'

const VerticalSeperatorBox = styled(Box)`
    border-right-color: rgba(0, 0, 0, 0.12);
    border-right-style: solid;
    border-right-width: 1px;
`;

const RulesAndUpdates = (props) => (
    <Grid container spacing={2}  >
        <Grid item md={6}>
            <VerticalSeperatorBox>
                <Typography sx={{ marginLeft: '0.6rem' }} variant='h5'>Rules:</Typography>
                <SimeplePaper topic='No spam' content='You cannot spam chat users.' />
                <SimeplePaper topic='No Bad Links' content="Do not send links or websites that are trying to steal other's information." />
                <SimeplePaper topic='No phone, email, Facebook, etc.' content='You should not leave any kind of contact information to others.' />
                <SimeplePaper topic='Other rules' content="Even if we didn't mention everything, any act that is considered a bad behavior should be avoided." />
            </VerticalSeperatorBox>
        </Grid>
        <Grid item md={6}>
            <Typography sx={{ marginLeft: '0.6rem' }} variant='h5'>Updates:</Typography>
            <SimeplePaper topic='01/03/2022' content='Bug fix' />
            <SimeplePaper topic='28/02/2022' content='First publication.' />
        </Grid>
    </Grid>
);

export default RulesAndUpdates;