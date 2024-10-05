import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })
    const handleClickOpen = () => {

        setOpen(true);
        if (props.customer) {
            setCustomer({
                firstname: props.customer.firstname || '',
                lastname: props.customer.lastname || '',
                streetaddress: props.customer.streetaddress || '',
                postcode: props.customer.postcode || '',
                city: props.customer.city || '',
                email: props.customer.email || '',
                phone: props.customer.phone || ''
            });
        }
    };
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }


    const handleClose = () => {
        setOpen(false);
    };


    const updateCustomer = () => {
        props.updateCustomer(customer, props.customer._links.self.href)
        handleClose()
        handleClose();

    }


    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="small"
                sx={{ marginBottom: 1, marginTop: 0.5 }} // This adds space below the button
            >
                Edit
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Edit a customer</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={customer.firstname}
                        name="firstname"
                        onChange={e => handleInputChange(e)}
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        required
                        margin="dense"
                        value={customer.lastname}
                        name="lastname"
                        onChange={e => handleInputChange(e)}
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        required
                        margin="dense"
                        value={customer.streetaddress}
                        name="streetaddress"
                        onChange={e => handleInputChange(e)}
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        required
                        margin="dense"
                        value={customer.postcode}
                        name="postcode"
                        onChange={e => handleInputChange(e)}
                        label="Post Code"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        required
                        margin="dense"
                        value={customer.city}
                        name="city"
                        onChange={e => handleInputChange(e)}
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        required
                        margin="dense"
                        value={customer.email}
                        name="email"
                        onChange={e => handleInputChange(e)}
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        required
                        margin="dense"
                        value={customer.phone}
                        name="phone"
                        onChange={e => handleInputChange(e)}
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCustomer}>Save</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
EditCustomer.propTypes = {
    customer: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        streetaddress: PropTypes.string,
        postcode: PropTypes.string,
        city: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        _links: PropTypes.shape({
            self: PropTypes.shape({
                href: PropTypes.string
            })
        })
    }),
    updateCustomer: PropTypes.func.isRequired
};
