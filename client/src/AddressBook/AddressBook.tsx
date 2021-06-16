import React from 'react';
import Web3 from 'web3';

//Material-ui
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';

import ContactListComponent from '../ContactListComponent/ContactListComponent';

//CSS
import './AddressBook.css';

const drawerWidth = '100%';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    maxWidth: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function AddressBook() {
  const classes = useStyles();

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  //Need connect metamask first with window.ethereum check
  web3.eth.requestAccounts().then(console.log).catch(console.error);

  return (
    <Container className={classes.root}>
      <Grid
        container
        spacing={3}
      >

        <Grid item xs={4}>
          <div>
            <AppBar position="static" elevation={0}>
              <Toolbar>
                Sylo
              </Toolbar>
            </AppBar>

            <form>
              <TextField
                label="Contact"
                placeholder="Contact name"
                helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </form>
            <Divider />

            <List component="nav" aria-label="">
              <ContactListComponent firstname={'test'} lastname={'sad'} icon={''} address={'0xasdasdasdadasd'} />
            </List>

          </div>
        </Grid>

        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>

      </Grid >
    </Container>
  );
}

export default AddressBook;
