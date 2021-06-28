import React from 'react';
import Contact from '../Contact/Contact';
import { Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import './ContactListComponent.css';

interface ContactListProps extends Contact {
    onClick: any,
    value: any
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        fontFamily: "RawlineSemiBold",
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
    },
    listItemText: {
        fontSize: "14px",
        fontStyle: "normal",
    }
}));

const ContactListComponent: React.FC<ContactListProps> = props => {
    const classes = useStyles();
    const handleOnClick = () => {
        props.onClick(props.value);
    }

    const createAvatar = () => {
        if(props.firstname && props.lastname)
        return (props.firstname[0].toLocaleUpperCase() + props.lastname[0].toLocaleUpperCase())
    }

    return (
        <>
            <ListItem button className={classes.root} onClick={handleOnClick}>
                <ListItemIcon>
                    <Avatar >{createAvatar}</Avatar>
                </ListItemIcon>
                <ListItemText
                    primary={props.id + ": "+ props.firstname + ' ' + props.lastname}
                    secondary={props.address}
                />
            </ListItem>
            <Divider />
        </>
    )
}

export default ContactListComponent;