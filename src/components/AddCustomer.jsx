import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, SetCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handelInputChange = (event) => {
        SetCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const handleClose = () => {
        setOpen(false);
        SetCustomer({
            firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
        }); // Reset customer state when dialog is closed
    };

    const addCustomer = () => {
        props.addCustomer(customer);
        handleClose();
    };


    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ marginBottom: 2 }} // This adds space below the button
            >
                Add New Customer
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add a new customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill all information.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.firstname}
                        name="firstname"
                        onChange={e => handelInputChange(e)}
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.lastname}
                        name="lastname"
                        onChange={e => handelInputChange(e)}
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.streetaddress}
                        name="streetaddress"
                        onChange={e => handelInputChange(e)}
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.postcode}
                        name="postcode"
                        onChange={e => handelInputChange(e)}
                        label="Post Code"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.city}
                        name="city"
                        onChange={e => handelInputChange(e)}
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.email}
                        name="email"
                        onChange={e => handelInputChange(e)}
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.phone}
                        name="phone"
                        onChange={e => handelInputChange(e)}
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
AddCustomer.propTypes = {
    addCustomer: PropTypes.func.isRequired,
};