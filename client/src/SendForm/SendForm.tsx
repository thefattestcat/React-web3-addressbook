import { useState } from 'react';
import { TextField, Button, Grid } from "@material-ui/core";

interface SendFormProps {
    available: number,
    address: string,
    handleSubmit: any,
    handleError: any,
}


const SendForm: React.FC<SendFormProps> = props => {
    const [amount, setAmount] = useState<string>(String(props.available));

    const submit = () => {
        if (Number(amount) > props.available) {
            props.handleError({ code: 102, message: `Insufficient funds, please enter a valid amount`, type: "error" })
        }
        else {
            props.handleSubmit({ address: props.address, amount: Number(amount) });
        }
    }

    return (
        <>
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} >
                    <TextField
                        id="standard-full-width"
                        label="Available ETH"
                        style={{ margin: 8 }}
                        placeholder=""
                        variant={'outlined'}
                        value={props.available}
                        margin="dense"
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            style: { color: "black" }
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Address"
                        style={{ margin: 8 }}
                        variant={'outlined'}
                        value={props.address}
                        margin="dense"
                        fullWidth
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            style: { width: "100%" }
                        }}
                    />

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-full-width"
                        label="Amount ETH"
                        style={{ margin: 8 }}
                        placeholder="Enter amount"
                        helperText={`${0.0} Fee`}
                        fullWidth
                        defaultValue={0}
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        onClick={submit}
                        variant="contained"
                        color="primary"
                    >
                        Send
                    </Button>
                </Grid>

            </Grid>


        </>
    )
}

export default SendForm;