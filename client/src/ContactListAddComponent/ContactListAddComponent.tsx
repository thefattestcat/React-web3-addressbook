import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    button: { color: 'white', backgroundColor: '#F15A29', borderRadius: '21.5px' }
}));

const ContactListAddComponent: React.FC<{ onClick: any }> = props => {
    const classes = useStyles();
    const handleOnClick = () => {
        props.onClick();
    }
    return (
        <>
            <Divider />
            <ListItem button onClick={handleOnClick}>
                <ListItemIcon>
                    <AddIcon></AddIcon>
                </ListItemIcon>
                <ListItemText primary={'New contact'} />
            </ListItem>
            <Divider />
        </>
    )
}


export default ContactListAddComponent;