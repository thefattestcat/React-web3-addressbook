import { useState } from 'react';
import { Modal, Card, Divider, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface ContactModalProps {
    open: boolean,
    handleClose: any
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
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const ContactAddModal: React.FC<ContactModalProps> = props => {
    const classes = useStyles();
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Card className={classes.paper}>
                <TextField id="outlined-basic" label="Contact name" variant="outlined" />
                <TextField id="outlined-basic" label="Address" variant="outlined" />
                <TextField id="outlined-basic" label="ENS" variant="outlined" />
            </Card>
        </Modal>
    )
}

export default ContactAddModal;