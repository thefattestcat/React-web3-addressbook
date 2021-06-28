import { useState } from 'react';
import { Dialog, Card, Divider, InputAdornment, TextField, Button, Grid, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Contact from '../Contact/Contact';


interface ContactDialogProps {
  open: boolean,
  handleClose: any,
  handleSubmit: any,
  handleDelete: any,
  title: string,
  onError: any,
  values: Contact,
  isEdit: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      padding: "5px",
    },
    button: {
      borderRadius: "21.5px",
      border: "1px solid #F15A29",
      boxSizing: "border-box",
      color: "#F15A29",
      fontSize: "12px",
      fontStyle: "normal",
      lineHeight: "18px",
      letterSpacing: "0px",
      textAlign: "left",
    }
  }),
);

const ContactAddDialog: React.FC<ContactDialogProps> = props => {
  const classes = useStyles();
  const [firstname, setFirst] = useState<string>(props.values.firstname);
  const [lastname, setLast] = useState<string>(props.values.lastname);
  const [address, setAddress] = useState<string>(props.values.address);
  const [ens, setEns] = useState<string>(props.values.ens);


  const validate = (obj: any) => {
    console.log(obj)
    for (var key in obj) {
      if (obj[key] == null || obj[key] == "")//Check whitespace
        return false;
    }
    return true;
  }

  const submit = () => {
    const info = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      ens: ens
    }

    if (validate(info))
      props.handleSubmit(info)
    else
      props.onError({ code: 999, message: 'Invalid contact info' })
  }

  const handleDelete = () => {
    props.handleDelete();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label={"first name"}
            value={props.isEdit == true ? props.values.firstname : firstname}
            onChange={e => setFirst(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="outlined-basic"
            label={"last name"}
            value={props.isEdit == true ? props.values.lastname : lastname}
            onChange={e => setLast(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="outlined-basic"
            label={'address'}
            value={props.isEdit == true ? props.values.address : address}
            onChange={e => setAddress(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="outlined-basic"
            label={"ENS"}
            value={props.isEdit == true ? props.values.ens : ens}
            onChange={e => setEns(e.target.value)}
            className={classes.textField}
          />
        </form>

      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={submit}
        >
          Submit
        </Button>
        {props.isEdit == true ? <Button
          className={classes.button}
          onClick={handleDelete}
        >
          Delete
        </Button> : null}
      </DialogActions>
    </Dialog>
  )
}

export default ContactAddDialog;