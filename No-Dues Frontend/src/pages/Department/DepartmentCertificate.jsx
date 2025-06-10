import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, ListItem } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { backendUri } from '../../env';
import checkDepartmentToken from '../../service/checkDepartmentToken';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from '../../components/Nav';

export default function DepartmentCertificate() {
	const [code, setCode] = useState('<div>Loading...</div>');
	const [showCode, setShowCode] = useState(true);
	const [saving, setSaving] = useState(false);
	const [menuData, setMenuData] = useState([]);
	const token = checkDepartmentToken();
	const navigator = useNavigate();

	useEffect(() => {
		if (!token) {
			navigator('/');
			return;
		}

		const fetchData = async () => {
			try {
				const response = await fetch(`${backendUri}/department/edit-certificate-tempate`, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + token
					}
				});
				const data = await response.text();
				setCode(data);
			} catch (error) {
				toast.error('Failed to fetch certificate template. Please refresh the page.');
			}

			try {
				const response = await fetch(`${backendUri}/department/get-template-variables`, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + token
					}
				});
				const data = await response.json();
				setMenuData(data.variables);
			} catch (error) {
				toast.error('Failed to fetch template variables. Please refresh the page.');
			}
		};

		fetchData();
	}, [navigator, token]);

	const handleListButtonClick = (name) => {
		setCode((prev) => prev + `{{${name}}}`);
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			const response = await fetch(`${backendUri}/department/edit-certificate-tempate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				body: JSON.stringify({ html_content: code })
			});
			const data = await response.json();

			if (!response.ok) {
				toast.error(`Failed to save certificate template. ${data.message}`);
				return;
			}
			toast.success('Certificate template saved successfully');
		} catch (error) {
			toast.error(`Failed to save certificate template. ${error.message}`);
		} finally {
			setSaving(false);
		}
	};

	const handleCodeChange = (event) => {
		setCode(event.target.value);
	};

	const toggleCodeView = () => {
		setShowCode(!showCode);
	};

	return (
		<>
		<Header label={"CERTIFICATE PAGE"} isDep={true}/>
			<div className="p-2 h-screen overflow-y-auto flex">
				<div className="flex w-5/6">
					<div className='border-2 w-full'>
						<div className="flex-1 items-center p-2">
							<div className='mx-auto'>
								<Button
									className={`${showCode ? 'bg-blue-500 text-white' : 'bg-white'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto`}
									onClick={toggleCodeView}
								>
									Code
								</Button>
								<Button
									className={`${!showCode ? 'bg-blue-500 text-white' : 'bg-white'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto`}
									onClick={toggleCodeView}
								>
									Preview
								</Button>
							</div>
						</div>
						<div className="">
							{showCode ? (
								<div className="flex flex-col">
									<div className="flex-1 overflow-y-auto p-2">
										<TextField
											multiline
											fullWidth
											value={code}
											onChange={handleCodeChange}
											className="p-2 border border-gray-400 rounded mt-2 pretty"
											rows={24}
											style={{ width: '100%' }}
										/>
									</div>
								</div>
							) : (
								<ErrorBoundary FallbackComponent={() => <div>Invalid HTML</div>}>
									<div
										dangerouslySetInnerHTML={{ __html: code }}
										className="p-2 border border-gray-400 rounded mt-2 pretty"
									/>
								</ErrorBoundary>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col w-1/6 p-2">
					<Box className="flex flex-col border border-gray-300 rounded-md pretty">
						{menuData.map((item) => (
							<ListItem
								key={item.id}
								className="flex items-center justify-center border-b border-gray-300 hover:bg-blue-100 pretty"
							>
								<div className="px-4 py-2 text-gray-700 text-sm font-medium overflow-x-hidden">
									<div className="truncate line-clamp-2" onClick={() => handleListButtonClick(item.name)}>
										{item.name}
									</div>
								</div>
							</ListItem>
						))}
					</Box>
					<Button
						onClick={handleSave}
						sx={{
							backgroundColor: '#4CAF50',
							color: 'white',
							fontWeight: 'bold',
							padding: '10px 16px',
							marginTop: '8px',
							borderRadius: '4px',
							'&:hover': {
								backgroundColor: '#388E3C'
							},
							...(saving && {
								opacity: 0.5,
								cursor: 'not-allowed'
							})
						}}
						disabled={saving}
					>
						{saving ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</div>
		</>
	);
}
