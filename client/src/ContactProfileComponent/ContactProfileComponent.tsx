import React from 'react';
import { Button, Avatar, Grid, InputAdornment, TextField, Paper, Tabs, Tab, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import Contact from '../Contact/Contact';

interface ContactProfileProps extends Contact { 
    handleEdit: any, 
    handleClose: any 
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: "inherit" }}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

interface AddressFieldProps {
    address: string,
    label: string
}

function AddressField(props: AddressFieldProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(props.address)
    }

    return (
        <TextField
            disabled
            id="filled-disabled"
            value={props.address}
            label={props.label}
            variant="filled"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <FileCopyIcon onClick={handleCopy}></FileCopyIcon>
                    </InputAdornment>
                ),

            }}
        />)
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ContactProfileComponent: React.FC<ContactProfileProps> = props => {
    const [tabIndex, setTab] = React.useState(0);
    const handleTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue)
    }

    return (
        <div>
            <Button onClick={props.handleEdit}>
                <EditIcon />
            </Button>
            <Button onClick={props.handleClose} style={{float: "right"}}>
                <CloseIcon />
            </Button>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item>
                    <Avatar style={{ height: "120px", width: "120px" }} >
                        {props.firstname[0].toLocaleUpperCase() + props.lastname[0].toLocaleUpperCase()}
                    </Avatar>
                </Grid>

                <Grid item>
                    <h1>{props.firstname} {props.lastname}</h1>
                </Grid>

                <Grid item>
                    <AddressField address={props.address} label={'Address'} />
                    <AddressField address={props.ens} label={'ENS'} />
                </Grid>

                <Tabs
                    value={tabIndex}
                    onChange={handleTab}
                    variant="fullWidth"
                >

                    <Tab label="Transaction History" {...a11yProps(0)} />
                    <Tab label="Send" {...a11yProps(1)} />
                    <Tab label="Request" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={tabIndex} index={0} >
                    <TableContainer component={Paper} style={{ width: "100%" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Transaction hash</TableCell>
                                    <TableCell align="right">Sent/Recieve</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    Item Three
                </TabPanel>
            </Grid>
        </div>);
}

export default ContactProfileComponent;