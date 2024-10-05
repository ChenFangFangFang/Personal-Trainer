import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({ activity: '' })
    const handleClickOpen = () => {
        setOpen(true);
        if (props.training) {
            setTraining({
                activity: props.training.activity,
            });
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteTraining = () => {
        props.deleteTraining(training, props.training._links.self.href)
        handleClose()

    }
    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="small"
                sx={{ marginBottom: 1, marginTop: 0.5 }} // This adds space below the button
            >
                Delete
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Delete a training</DialogTitle>
                <DialogContent>
                    You are going to delete a training: {training.activity}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteTraining}>Delete</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}
DeleteTraining.propTypes = {
    training: PropTypes.object.isRequired,
    deleteTraining: PropTypes.func.isRequired,
};