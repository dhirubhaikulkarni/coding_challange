import { Tooltip, IconButton, Button, DialogContent, DialogTitle, Dialog, DialogActions, Switch } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

function ConfirmationDialog(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog style={{ marginBottom: props.marginBottom }}
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}>
            <DialogTitle id="confirmation-dialog-title" color="primary">{"CONFIRM"}</DialogTitle>
            <DialogContent dividers>
                <div className='m-2'>
                    {props.text}
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} variant="contained" color="primary">
                    {"NO"}
                </Button>
                <Button onClick={handleOk} variant="contained" color="primary">
                    {"YES"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
