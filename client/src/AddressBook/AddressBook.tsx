import { useEffect, useState } from 'react';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

//Icons
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//Components
import ContactListComponent from '../ContactListComponent/ContactListComponent';
import ContactAddButton from '../ContactListAddComponent/ContactListAddComponent';
import ContactAddModal from '../ContactAddModal/ContactAddModal';
import ContactProfile from '../ContactProfileComponent/ContactProfileComponent';
import StartScreen from '../StartScreen/StartScreen'

import Contact from '../Contact/Contact';
import AlertInterface from '../Alert/Alert';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
    color: theme.palette.text.primary,
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
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
    paddingTop: "20px",
    marginBottom: "0px",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: "auto",
    color: theme.palette.text.secondary,
  },
  addressbook: {
    backgroundColor: "white",
    height: "100%"
  },
  container: {
    height: "100%"
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
    height: "100%"
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
  localStorage.setItem('addressbook', JSON.stringify([]))
}

const web3 = new Web3(Web3.givenProvider);
const ethereum = web3.eth;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FACTOR = 1000000000000000000;

function AddressBook() {
  const classes = useStyles();

  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);

  const [alertMsg, setAlertMsg] = useState<string>(''); //Change type
  const [hasAlert, setAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<Color>("error")

  const [profile, setProfile] = useState<any>(<StartScreen status={'Welcome!'} />); //Change type
  const [addressBook, setAddressBook] = useState<Contact[]>([]); //Change type
  const [searchValue, setSearchValue] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalValues, setModalValues] = useState<Contact>({ id: -1, firstname: '', lastname: '', address: '', ens: '' })
  const [userId, setUserId] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);

  const [AVAILABLE_AMOUNT, setAvailableAmount] = useState<number>(0);
  const [MYADDRESS, setMyAddress] = useState<string>('');

  const handleAlert = (o: AlertInterface) => {
    console.log(o);
    setAlertMsg(`${o.message}`);
    setAlertType(o.type);
    setAlert(true);
  }

  const handleCloseAlert = () => {
    setAlert(false);
  }

  const handleContacts = async (contacts: Contact[]) => {
    setAddressBook(contacts);
  }

  const handleContactClick = async (e: Contact) => {
    handleProfile(e)
    setModalValues(e)
    setUserId(e.id)
  }

  const handleProfile = (e: Contact) => {
    setProfile(
      <ContactProfile
        handleSend={handleSend}
        availableAmount={AVAILABLE_AMOUNT}
        handleAlert={handleAlert}
        id={e.id}
        firstname={e.firstname}
        lastname={e.lastname}
        address={e.address}
        ens={e.ens}
        handleEdit={handleEditModal}
        handleClose={handleCloseProfile}
      />)
  }

  const handleOpenModal = () => { setOpenModal(true) }

  const handleCloseModal = () => { setOpenModal(false) }

  const handleSubmitModal = (e: any) => {
    let currContacts = JSON.parse(localStorage.getItem('addressbook') || '[]')
    console.log(edit, e)
    let user = e;
    if (!edit) {
      user.id = userId;
      setUserId(user.id + 1);
      currContacts.push(user);

    } else {
      user.id = userId;
      currContacts[userId] = user;
    }
    handleContacts(currContacts)
    localStorage.setItem('addressbook', JSON.stringify(currContacts))
    handleProfile(user)
    setModalValues(user)
    handleCloseModal();
  }

  const handleAddModal = () => {
    setEdit(false);
    setModalTitle('Add Contact')
    handleOpenModal();
  }

  const handleEditModal = () => {
    setEdit(true)
    setModalTitle('Edit Contact')
    handleOpenModal()
  }

  const handleCloseProfile = () => {
    setProfile(<StartScreen status={'Select a contact'} />)
  }

  const handleDeleteContact = () => {
    let contacts: Contact[] = [];

    addressBook.map(contact => {
      if (contact.id !== userId)
        contacts.push(contact)
    })

    handleContacts(contacts);
    setProfile(<StartScreen status={'Select a contact'} />)
    localStorage.setItem('addressbook', JSON.stringify(contacts))
    handleAlert({ code: 20, message: `Deleted contact ${userId}`, type: "success" })
    handleCloseModal();
  }

  const handleSend = (opts: { address: string, amount: number }) => {
    alert(opts.amount + " " + opts.address)

    try {
      ethereum.sendTransaction({
        from: MYADDRESS,
        to: opts.address,
        value: opts.amount * FACTOR
      }).then((receipt) => {
        handleAlert({ code: 100, message: receipt.transactionHash, type: "success" })
        console.log(receipt)
      })
    } catch (error) {
      handleAlert({ code: 102, message: error.message, type: "error" })
    }
  }

  //Init useEffect
  useEffect(() => {
    if (!isConnected && !isInitialized) {
      const fetchAccounts: any = async () => {
        const accounts = await ethereum.requestAccounts();
        return accounts;
      }

      const initializePage = async (account: string[]) => {
        setInitialized(true);
        setConnected(true);
        await setMyAddress(account[0])
        setAlertMsg('Connected to MetaMask!')
        setAlertType("success")
        setAlert(true)
        console.log(account[0])
        //Fix
        const balance = await ethereum.getBalance(account[0]);
        await setAvailableAmount(Number(balance) / FACTOR);
        console.log(balance);
        handleContacts(JSON.parse(localStorage.getItem('addressbook') || '[]'));
      }

      fetchAccounts()
        .then(initializePage)
        .catch(handleAlert);
    }

  }, [isConnected, isInitialized])

  //Searchbar useEffect 
  useEffect(() => {

    let results: Contact[] = []
    addressBook.map(contact => {
      if (contact.firstname.includes(searchValue))
        results.push(contact);
    })

    console.log(results);
    handleContacts(results)

    setAlertMsg('Not Implemented!')
    setAlertType("error")
    setAlert(true)
  }, [searchValue])

  return (
    <Container
      disableGutters={true}
      maxWidth={"xl"}
      className={classes.root}
      style={{ margin: "-4px" }}
    >

      <ContactAddModal
        open={openModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitModal}
        handleDelete={handleDeleteContact}
        title={modalTitle}
        onError={handleAlert}
        values={modalValues}
        isEdit={edit}
      />

      <Grid
        container
        spacing={1}
      >

        <Grid item xs={2} >
          <Toolbar className={classes.toolbar}>
            Address book
          </Toolbar>
          <Divider />
          <List>
            <ListItem button key={'contacts'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Address Book'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {['Accounts', 'Contracts', 'ENS'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={10}>
          <Grid
            className={classes.container}
            container
            spacing={1}
          >
            <AppBar position="static" elevation={0} className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
              </Toolbar>
              <Divider />
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
                {addressBook.map(contact => {
                  return (<ContactListComponent
                    id={contact.id}
                    firstname={contact.firstname}
                    lastname={contact.lastname}
                    address={contact.address}
                    ens={contact.ens}
                    value={contact}
                    onClick={handleContactClick}
                  />)
                })}
              </List>
            </Grid>

            <Grid item xs={8}>
              <Grid container className={classes.container}>
                <div className={classes.content}>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={hasAlert}
                    autoHideDuration={5000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      severity={alertType}
                      onClose={handleCloseAlert}
                    >
                      {alertMsg}
                    </Alert>
                  </Snackbar>
                  {profile}
                </div>
              </Grid>
            </Grid>

          </Grid>

        </Grid>

      </Grid >
    </Container>
  );
}

export default AddressBook;
