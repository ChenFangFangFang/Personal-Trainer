import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material';
export default function DeleteCustomer(props) {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [customer, setCustomer] = React.useState({ firstname: '' })
    const handleClickOpen = () => {
        setOpen(true)
        if (props.customer) {
            setCustomer({
                firstname: props.customer.firstname,
            });
        }
    };
    const handleClose = () => {
        setOpen(false)
    };
    const deleteCustomer = () => {
        props.deleteCustomer(customer, props.customer._links.self.href)
        handleClose()

    }
    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="small"
                sx={{ marginBottom: 1, marginTop: 0.5, color: theme.palette.training.main, borderColor: theme.palette.training.main, }} // This adds space below the button
            >
                Delete
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Delete Affirmation</DialogTitle>
                <DialogContent>
                    You are going to delete Customer: {customer.firstname}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteCustomer}>Delete</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}
DeleteCustomer.propTypes = {
    customer: PropTypes.object.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
};