import React, { useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';

const GenericModal = ({ buttonName, children, modalTitle }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <span
                style={{cursor: 'pointer'}}
                onClick={handleOpen}
            >
                {buttonName}
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}
                >
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        {modalTitle}
                    </Typography>
                    <div className="mt-2">
                        {children}
                    </div>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="contained"
                        style={{ marginTop: '1rem' }}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default GenericModal;
