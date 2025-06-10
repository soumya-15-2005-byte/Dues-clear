import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import { authState } from '../context/auth/authState';
import { backendUri } from '../env';
import checkDepartmentToken from '../service/checkDepartmentToken';
import removeNullParams from '../service/removeNullParams';

const paddingStyles = {
    mb4: { marginBottom: 4 },
    wFull: { width: '100%' },
};

const CreateDueForm = ({ setClick }) => {

    const token = checkDepartmentToken()

    const [formData, setFormData] = useState({
        student_rollnumber: '',
        amount: '',
        reason: '',
        due_date: '',
        due_proofs: ['']
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleProofChange = (index, value) => {
        const newProofs = [...formData.due_proofs];
        newProofs[index] = value;
        setFormData(prevData => ({
            ...prevData,
            due_proofs: newProofs
        }));
    };

    const handleAddProof = () => {
        setFormData(prevData => ({
            ...prevData,
            due_proofs: [...prevData.due_proofs, '']
        }));
    };

    const handleRemoveProof = (index) => {
        const newProofs = [...formData.due_proofs];
        newProofs.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            due_proofs: newProofs
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Appending 'T00:00:00' to represent the beginning of the day
        const formattedDueDate = formData.due_date + 'T00:00:00';
        try {
            const response = await fetch(`${backendUri}/due/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, due_date: formattedDueDate })
            });
            const resp = await response.json();
            // console.log(resp)
            if (response.status === 201) {
                toast.success(resp.message)
                setClick(prev => prev + 1)
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
                name="student_rollnumber"
                label="Student Roll No."
                value={formData.student_rollnumber}
                onChange={handleChange}
                sx={{ ...paddingStyles.mb4, ...paddingStyles.wFull }}
            />
            <TextField
                name="reason"
                label="Reason"
                value={formData.reason}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ ...paddingStyles.mb4, ...paddingStyles.wFull }}
            />
            <TextField
                name="amount"
                label="Amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                sx={{ ...paddingStyles.mb4, ...paddingStyles.wFull }}
            />
            <TextField
                name="due_date"
                label="Due Date"
                type="date"
                value={formData.due_date}
                onChange={handleChange}
                sx={{ ...paddingStyles.mb4, ...paddingStyles.wFull }}
            />
            {formData.due_proofs.map((proof, index) => (
                <div key={index} className="flex items-center mb-4">
                    <TextField
                        label={`Proof URL ${index + 1}`}
                        value={proof}
                        onChange={(e) => handleProofChange(index, e.target.value)}
                        sx={{ ...paddingStyles.wFull, marginRight: 4 }}
                    />
                    {index === formData.due_proofs.length - 1 && (
                        <IconButton onClick={handleAddProof} aria-label="add proof">
                            <Add />
                        </IconButton>
                    )}
                    {index !== 0 && (
                        <IconButton onClick={() => handleRemoveProof(index)} aria-label="remove proof">
                            <Remove />
                        </IconButton>
                    )}
                </div>
            ))}

            {!formData.paymentLink && (
                <TextField
                    name="paymentLinkURL"
                    label="Payment Link URL"
                    value={formData.paymentLinkURL}
                    onChange={handleChange}
                    sx={{ ...paddingStyles.mb4, ...paddingStyles.wFull }}
                />
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ ...paddingStyles.wFull }}>
                Submit
            </Button>
        </form>
        </>
    );
};

export default CreateDueForm;
