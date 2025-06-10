
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUri } from '../env';
import checkStudentToken from '../service/checkStudentToken';

const paddingStyles = {
    mb4: { marginBottom: 4 },
    wFull: { width: '100%' },
};

function StudRequestsForm({ dueId }) {
    const token = checkStudentToken();
    const [formData, setFormData] = useState({
        due_id: dueId,
        payment_proof_file: '',
        mode: 'external payment',
    });

    const handleChange = (e) => {
        setFormData({
            due_id: dueId,
            payment_proof_file: e.target.value,
            mode: 'external payment',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUri}/due/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
            const resp = await response.json();
            if (response.status === 201) {
                toast.success(resp.message)
            } else {
                toast.error(resp.message)
                console.error('Failed to create due');
            }
        } catch (error) {
            toast.error("Something broke, please try again")
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-md">
                <TextField
                    name="paymentLinkURL"
                    label="Payment Proof URL"
                    value={formData.payment_proof_file}
                    onChange={handleChange}
                    sx={{ ...paddingStyles.mb4, ...paddingStyles.wFull }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ ...paddingStyles.wFull }}>
                    Submit
                </Button>
            </form>
        </>
    );
}

export default StudRequestsForm;






