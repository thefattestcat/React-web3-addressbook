import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

//Material-ui
import { Theme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

//Icons
import SearchIcon from '@material-ui/icons/Search';

//Components
import ContactListComponent, { ContactListProps } from '../ContactListComponent/ContactListComponent';
import ContactAddButton from '../ContactListAddComponent/ContactListAddComponent';
import ContactProfile from '../ContactProfileComponent/ContactProfileComponent';


//CSS
import './AddressBook.css';
import { loadavg } from 'os';

const drawerWidth = '100%';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    fontFamily: "RawlineSemiBold !important",
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

async function detectMetamask() {
  const provider = await detectEthereumProvider();
  if (provider) {
    //console.log(provider)
  } else {
    console.error("Metamask not installed");
  }
}

detectMetamask();

localStorage.setItem('addressbook', JSON.stringify([
  { firstname: 'asdasd', lastname: 'ddasdsad', address: '0xAsdasdasd' },
  { firstname: 'ffghfghfgh', lastname: 'cvbcvbcvb', address: '0xcvbcvbcbvcvb' },
  { firstname: 'tytyrtyrty', lastname: 'ghjghjgjhgj', address: '0xkldfjglkdfgjlkdfjg' },
]))

const web3 = new Web3(Web3.givenProvider);
const ethereum = web3.eth;

function AddressBook() {
  const classes = useStyles();

  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [errormsg, setErrorMsg] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [profile, setProfile] = useState<any>('');
  const [addressBook, setAddressBook] = useState<any>([]);

  const handleContact = async (e: any) => {
    // User clicks contact 
    console.log(e)
    if (e) {
      setProfile(<ContactProfile firstname={e.firstname} lastname={e.lastname} address={e.address} />)
    }
  }

  useEffect(() => {
    if (!isConnected && !isInitialized) {
      const fetchAccounts: any = async () => {
        const accounts = await ethereum.requestAccounts();
        return accounts;
      }

      const handleError = (error: { code: number, message: string }) => {
        console.log(error);
        setContent(`${error.code} - ${error.message}`); //Change to errorMsg
        setInitialized(true);
      }

      const handleContacts = async () => {
        const contacts = await JSON.parse(localStorage.getItem('addressbook') || '[]')

        let addressbookList: any[] = [];

        for (let i = 0; i < contacts.length; i++)
          addressbookList.push(
            <ContactListComponent
              firstname={contacts[i].firstname}
              lastname={contacts[i].lastname}
              address={contacts[i].address}
              value={contacts[i]}
              icon={''}
              onClick={handleContact}
            />)

        setAddressBook(addressbookList);
      }

      const initializePage = (account: string[]) => {
        setInitialized(true);
        setConnected(true);
        handleContacts();
      }

      fetchAccounts()
        .then(initializePage)
        .catch(handleError);
    }

  }, [])

  useEffect(() => {
    console.log('isConnected')
    if (addressBook.length > 0) {

    }


  }, [addressBook])

  return (
    <Container disableGutters={true} maxWidth={"xl"} className={classes.root}>
      <Grid
        container
        spacing={3}>

        <Grid item xs={4}>
          <div>
            <AppBar position="static" elevation={0}>
              <Toolbar>
                Address Book
              </Toolbar>
            </AppBar>

            <form>
              <TextField
                label="Contact"
                placeholder="Search, name, address (0x), or ENS"
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
              <ContactAddButton onClick={handleContact} />
              {addressBook}
            </List>

          </div>
        </Grid>

        <Grid item xs={8}>
          <Paper className={classes.paper}>
            {content}
            {profile}
          </Paper>
        </Grid>

      </Grid >
    </Container>
  );
}

export default AddressBook;
