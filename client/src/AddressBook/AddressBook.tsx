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
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

//Icons
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';


//Components
import ContactListComponent, { ContactListProps } from '../ContactListComponent/ContactListComponent';
import ContactAddButton from '../ContactListAddComponent/ContactListAddComponent';
import ContactAddModal from '../ContactAddModal/ContactAddModal';
import ContactProfile from '../ContactProfileComponent/ContactProfileComponent';
import ContactSearch from '../ContactSearchField/ContactSearchField';


//CSS
import './AddressBook.css';
import { loadavg } from 'os';
import { Button, ListItem, ListItemIcon } from '@material-ui/core';
import { createFalse } from 'typescript';

const drawerWidth = '100%';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    fontFamily: "RawlineSemiBold !important",
    backgroundColor: theme.palette.background.default,
    height: "100vh"
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
    padding: theme.spacing(3),
    paddingTop: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: "auto",
    color: theme.palette.text.secondary,
  },
  addressbook: {
    backgroundColor: "white",
  },
  disconnectButton: {
    borderRadius: "21.5px",
    border: "1px solid #F15A29",
    boxSizing: "border-box",
    color: "#F15A29",
    fontSize: "12px",
    fontStyle: "normal",
    lineHeight: "18px",
    letterSpacing: "0px",
    textAlign: "left",
    position: "fixed",
    bottom: theme.spacing(2),
  }
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
  const [content, setContent] = useState<string>(''); //Change type
  const [profile, setProfile] = useState<any>(''); //Change type
  const [addressBook, setAddressBook] = useState<any>([]); //Change type
  const [searchValue, setSearchValue] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleContactClick = async (e: { firstname: string, lastname: string, address: string }) => {
    setProfile(<ContactProfile firstname={e.firstname} lastname={e.lastname} address={e.address} />)
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleSubmitModal = () => {
    // save to cache
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  //Init useEffect
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
              onClick={handleContactClick}
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

  //Searchbar useEffect 
  useEffect(() => {
    if (searchValue !== '') { //Add Whitespace check
      alert(searchValue)
      // Sort contact list regex
    }
  }, [searchValue])

  return (
    <Container disableGutters={true} maxWidth={"xl"} className={classes.root}>
      <ContactAddModal
        open={openModal}
        handleClose={handleCloseModal}
      />
      <Grid
        container
        spacing={1}>

        <Grid item xs={3} className={classes.addressbook}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              Address Book
            </Toolbar>
          </AppBar>

          <TextField
            label="Contact"
            placeholder="Search, name, address (0x), or ENS"
            helperText="Full width!"
            fullWidth
            margin="normal"
            variant="outlined"
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            inputProps={{
              style: {
                fontSize: "14px",
                maxHeight: "15px",
              }
            }}
          />

          <List component="nav" aria-label="">
            <ContactAddButton onClick={handleOpenModal} />
            {addressBook}
          </List>
          <Button className={classes.disconnectButton} variant="outlined">Disconnect</Button>
        </Grid>

        <Grid item xs={7}>
          <Card className={classes.content}>
            {content}
            {profile}
          </Card>
        </Grid>

        <Grid item xs={2}>
          <List component="nav" aria-label="">
            <ContactAddButton onClick={handleOpenModal} />
            {addressBook}
          </List>
        </Grid>


      </Grid >
    </Container>
  );
}

export default AddressBook;
