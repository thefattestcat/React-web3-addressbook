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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

//Icons
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//Components
import ContactListComponent from '../ContactListComponent/ContactListComponent';
import ContactAddButton from '../ContactListAddComponent/ContactListAddComponent';
import ContactAddModal from '../ContactAddModal/ContactAddModal';
import ContactProfile from '../ContactProfileComponent/ContactProfileComponent';
import ContactSearch from '../ContactSearchField/ContactSearchField';

import Contact from '../Contact/Contact';

//CSS
import './AddressBook.css';
import { Button, ListItem, ListItemIcon, Drawer, Typography } from '@material-ui/core';

const drawerWidth = '240';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    fontFamily: "RawlineSemiBold !important",
    backgroundColor: theme.palette.background.default,
    height: "100vh"
  },
  title: {

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
  },
  sideNav: {
    backgroundColor: "#242424",
    color: "#fcfcfc",
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

if (!localStorage.getItem('addressbook')) {
  localStorage.setItem('addressbook', JSON.stringify([
    { firstname: 'asdasd', lastname: 'ddasdsad', address: '0xAsdasdasd', ens: '' },
    { firstname: 'ffghfghfgh', lastname: 'cvbcvbcvb', address: '0xcvbcvbcbvcvb', ens: '' },
    { firstname: 'tytyrtyrty', lastname: 'ghjghjgjhgj', address: '0xkldfjglkdfgjlkdfjg', ens: '' },
  ]))
}

const web3 = new Web3(Web3.givenProvider);
const ethereum = web3.eth;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddressBook() {
  const classes = useStyles();

  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(''); //Change type
  const [error, setError] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(''); //Change type
  const [addressBook, setAddressBook] = useState<any>([]); //Change type
  const [searchValue, setSearchValue] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalValues, setModalValues] = useState<Contact>({ firstname: '', lastname: '', address: '', ens: '' })
  const [edit, setEdit] = useState<boolean>(false);


  const handleError = (error: { code: number, message: string }) => {
    console.log(error);
    setError(true);
    setErrorMsg(`${error.message}`); //Change to errorMsg
  }

  const handleCloseError = () => {
    setError(false);
  }

  const handleContacts = async (contacts: any) => {
    let addressbookList: any[] = [];

    for (let i = 0; i < contacts.length; i++)
      addressbookList.push(
        <ContactListComponent
          firstname={contacts[i].firstname}
          lastname={contacts[i].lastname}
          address={contacts[i].address}
          ens={contacts[i].ens}
          value={contacts[i]}
          onClick={handleContactClick}
        />)

    setAddressBook(addressbookList);
  }

  const handleContactClick = async (e: Contact) => {
    setProfile(<ContactProfile
      firstname={e.firstname}
      lastname={e.lastname}
      address={e.address}
      ens={e.ens}
      handleEdit={handleEditModal}
      handleClose={handleCloseProfile} />)
  }

  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }

  const handleSubmitModal = (e: any) => {
    let curr = JSON.parse(localStorage.getItem('addressbook') || '[]');
    curr.push(e)
    handleContacts(curr)
    localStorage.setItem('addressbook', JSON.stringify(curr))
    handleCloseModal();
  }

  const handleAddModal = () => {
    setEdit(false);
    setModalTitle('Add Contact')
    handleOpenModal();
  }

  const handleEditModal = (user: Contact) => {
    setEdit(true);
    setModalTitle('Edit Contact')
    setModalValues(user)
    handleOpenModal();
  }

  const handleCloseProfile = () => {

  }

  const handleDeleteContact = () => {

  }


  //Init useEffect
  useEffect(() => {
    if (!isConnected && !isInitialized) {
      const fetchAccounts: any = async () => {
        const accounts = await ethereum.requestAccounts();
        return accounts;
      }

      const initializePage = (account: string[]) => {
        setInitialized(true);
        setConnected(true);
        handleContacts(JSON.parse(localStorage.getItem('addressbook') || '[]'));
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
        handleSubmit={handleSubmitModal}
        handleDelete={handleDeleteContact}
        title={modalTitle}
        onError={handleError}
        values={modalValues}
        isEdit={edit}
      />
      <Grid
        container
        spacing={1}>

        <Grid item xs={2} className={classes.sideNav}>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={1}>
            <AppBar position="static" elevation={0}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Nav
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid item xs={4} className={classes.addressbook}>

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
                <ContactAddButton onClick={handleAddModal} />
                {addressBook}
              </List>
              <Button className={classes.disconnectButton} variant="outlined">Disconnect</Button>
            </Grid>

            <Grid item xs={8}>
              <Card className={classes.content}>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={error}
                  autoHideDuration={3000}
                  onClose={handleCloseError}
                >
                  <Alert
                    severity="error"
                    onClose={handleCloseError}
                  >
                    {errorMsg}
                  </Alert>
                </Snackbar>
                {profile}
              </Card>
            </Grid>

          </Grid>

        </Grid>

      </Grid >
    </Container>
  );
}

export default AddressBook;
