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

const ContactListAddComponent: React.FC<any> = (props) => {
    const classes = useStyles();
    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <AddIcon></AddIcon>
                </ListItemIcon>
                <ListItemText primary={'New contact'}/>
            </ListItem>
            <Divider />
        </div>
    )
}


export default ContactListAddComponent;