import React from 'react';
import { Button, Avatar, Grid, InputAdornment, TextField, Tabs, Tab, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import Contact from '../Contact/Contact';
import SendForm from '../SendForm/SendForm'

interface ContactProfileProps extends Contact {
    handleEdit: any,
    handleClose: any,
    handleAlert: any,
    handleSend: any,
    availableAmount: number,
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
    label: string,
    handleAlert: any,
}

function AddressField(props: AddressFieldProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(props.address)
        props.handleAlert()
    }

    return (
        <TextField
            disabled
            id="filled-disabled"
            value={props.address}
            label={props.label}
            variant="filled"
            margin="dense"
            style={{ margin: 8 }}
            size="small"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <FileCopyIcon onClick={handleCopy} fontSize="small"></FileCopyIcon>
                    </InputAdornment>
                ),
                style: {
                    padding: "0 0 0 0",
                    overflowX: "hidden"
                }
            }}
            InputLabelProps={{
                shrink: true,
                style: {
                    padding: "0 0 0 0",
                }
            }}
        />)
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ContactProfileComponent: React.FC<ContactProfileProps> = props => {
    const [tabIndex, setTab] = React.useState(0);
    const handleTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue)
    }

    const handleAlert = () => {
        props.handleAlert({ code: 2, message: "Copied!", type: "success" })
    }

    return (
        <div>
            <Button onClick={props.handleEdit}>
                <EditIcon />
            </Button>
            <Button onClick={props.handleClose} style={{ float: "right" }}>
                <CloseIcon />
            </Button>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item>
                    <Avatar style={{ height: "100px", width: "100px" }} >
                        {props.firstname[0].toLocaleUpperCase() + props.lastname[0].toLocaleUpperCase()}
                    </Avatar>
                </Grid>

                <Grid item>
                    <h1>{props.firstname} {props.lastname}</h1>
                </Grid>

                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <AddressField handleAlert={handleAlert} address={props.address} label={'Address'} />
                    <AddressField handleAlert={handleAlert} address={props.ens} label={'ENS'} />
                </Grid>

                <Tabs
                    value={tabIndex}
                    onChange={handleTab}
                    variant="fullWidth"
                >
                    <Tab label="Transaction History" {...a11yProps(0)} />
                    <Tab label="Send" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabIndex} index={0} >
                    <TableContainer style={{ width: "100%" }}>
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
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <SendForm
                        address={props.address}
                        available={props.availableAmount}
                        handleSubmit={props.handleSend}
                        handleError={props.handleAlert}
                    />
                </TabPanel>
            </Grid>
        </div>);
}

export default ContactProfileComponent;