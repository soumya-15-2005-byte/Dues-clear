import React, { useEffect, useState } from 'react';
import { backendUri } from '../../env';
import checkStudentToken from '../../service/checkStudentToken';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import { Box, Button, Typography } from '@mui/material';

export default function StudentCertificate() {
	const [ certificateHtml, setCertificateHtml ] = useState(null);
	const [ notFound, setNotFound ] = useState(false);
	const token = checkStudentToken();
	const urlParams = new URLSearchParams(window.location.search);
	const departmentId = urlParams.get('department_id');

	useEffect(() => {
		const generatePDF = async () => {
			try {
				const response = await fetch(`${backendUri}/student/generate-no-due-certificate`, {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						department_id: departmentId
					})
				});

				if (response.status === 200) {
					const html = await response.text();
					setCertificateHtml(html);
				} else {
					setNotFound(true);
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to generate certificate');
				setNotFound(true);
			}
		};

		if (!departmentId) {
			setNotFound(true);
		} else {
			generatePDF();
		}
	}, []);

	const handleDownloadPDF = () => {
		const element = document.getElementById('pdf-container');
		html2pdf(element);
	};

	if (notFound) {
		return (
			<Box mt={4} textAlign="center">
				<Typography variant="h4">Not Found</Typography>
			</Box>
		);
	}

	return (
		<Box mt={4} p={2} className="bg-white shadow-lg rounded-lg">
			{certificateHtml && (
				<div
					id="pdf-container"
					style={{ width: '100vw' }}
					dangerouslySetInnerHTML={{ __html: certificateHtml }}
				/>
			)}
			<Box mt={2} display="flex" justifyContent="center">
				<Button variant="contained" onClick={handleDownloadPDF}>
					Download PDF
				</Button>
			</Box>
		</Box>
	);
}
