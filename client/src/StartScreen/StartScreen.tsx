import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function StartScreen() {    
    return( 
    <Container maxWidth={"lg"}> 
        <Grid xs={12}>
            Crypto address book
        </Grid>
    </Container>)
}

export default StartScreen;