import React from 'react';
import Contact from '../Contact/Contact';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import './ContactListComponent.css';

interface ContactListProps extends Contact { icon: string };

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    button: { color: 'white', backgroundColor: '#F15A29', borderRadius: '21.5px' }
}));

const ContactListComponent: React.FC<ContactListProps> = (props) => {
    const classes = useStyles();
    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <Avatar>{props.firstname[0].toLocaleUpperCase() + props.lastname[0].toLocaleUpperCase()}</Avatar>
                </ListItemIcon>
                <ListItemText primary={props.firstname + ' ' + props.lastname} secondary={props.address} />
                <Button className={classes.button} variant="outlined">Send</Button>
            </ListItem>
            <Divider />
        </div>
    )
}


export default ContactListComponent;