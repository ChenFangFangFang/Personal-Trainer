import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@emotion/react';
export default function AddTraining(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState([])
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: '',
    });
    useEffect(() => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => {
                const customerList = data._embedded.customers;
                setCustomer(customerList); // 保存客户列表
            })
            .catch(error => console.log('Error fetching customers:', error));
    }, []);

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTraining({ ...training, [name]: value });
    };
    const handleCustomerChange = (event) => {
        setTraining({ ...training, customer: event.target.value });
    };
    const addTraining = () => {
        props.addTraining(training); // 调用父组件传递的addTraining函数
        handleClose();
        setTraining({ date: '', duration: '', activity: '', customer: '' });
    };
    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ marginBottom: 2, backgroundColor: theme.palette.training.main }} // This adds space below the button
            >
                Add a training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ paddingBottom: 1 }}>Add a new customer</DialogTitle>
                <DialogContent style={{ paddingBottom: 2 }}>
                    <DialogContentText style={{ marginBottom: 2 }}>
                        Choose a customer and add a training.
                    </DialogContentText>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="customer-label">Customer</InputLabel>
                        <Select
                            labelId="customer-label"
                            id="customer-select"
                            value={training.customer}
                            onChange={handleCustomerChange}
                            label="Customer"
                            required
                        >
                            {customer.map((customer) => (
                                <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                                    {customer.firstname} {customer.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={training.date}
                        name="date"
                        onChange={e => handleInputChange(e)}
                        label="Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}

                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={training.duration}
                        name="duration"
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        type="number"
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={training.activity}
                        name="activity"
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}
AddTraining.propTypes = {
    addTraining: PropTypes.func.isRequired,
};