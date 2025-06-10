import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import logo from '/logo1.jpg';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import StickyHeadTable from '../../components/Table';
import { backendUri } from '../../env';
import checkStudentToken from '../../service/checkStudentToken';
import StudentNav from '../../components/StudentNav';

const columns = [
	{
		id: 'department_name',
		label: 'Department',
		minWidth: 100
	},
	{
		id: 'total_pending_dues',
		label: 'No. of Due',
		minWidth: 100
	},
	{
		id: 'allow_certificate_generation',
		label: 'Initiate No-Dues Certificate',
		minWidth: 100
	}
];

const StudDash = () => {
	const [ rows, setRows ] = useState([]);
	const [ stud, setStud ] = useState({});
	const [ studname, setStudname ] = useState('');

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	useEffect(() => {
		const token = checkStudentToken();
		const fetchRecords = async () => {
			const res = await fetch(`${backendUri}/student/all-department-data-min`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}
			});
			if (res.ok) {
				const data = await res.json();
				setRows(data);
				// console.log(data);
			} else {
				console.log('Unable to fetch');
			}
		};
		const fetchStudDetails = async () => {
			const res = await fetch(`${backendUri}/student/login`, {
				headers: {
					'content-type': 'application/json',
					Authorization: token
				}
			});

			const data = await res.json();
			setStudname(data.full_name);
			setStud(data.data);
			// console.log(data);
		};

		fetchRecords();
		fetchStudDetails();
	}, []);

	return (
		<div className="h-screen w-screen border border-white">
			<StudentNav label={'Profile'} />
			<div className="flex justify-center mt-4">
				<div className="flex flex-col md:flex-row shadow-lg rounded-lg mx-4 my-8">
					<div className="flex flex-1 flex-col p-4">
						<h3 className="text-xl font-medium">{studname}</h3>
						<div className="grid grid-cols-2 gap-2 mt-4">
							{Object.entries(stud).map(([ key, value ]) => (
								<div key={key} className="flex px-4 py-2">
									<span className="mr-2 font-medium">
										{key === 'roll_number' ? (
											'Roll Number'
										) : key === 'joining_year' ? (
											'Joining Year'
										) : (
											capitalizeFirstLetter(key)
										)}
										:
									</span>
									<span>{key === 'roll_number' ? value.toUpperCase() : value}</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center justify-center p-4">
						<Avatar alt="Remy Sharp" src={logo} sx={{ width: 143, height: 143 }} />
					</div>
				</div>
			</div>

			<div className="flex justify-center my-4">
				<Button
					variant="contained"
					size="large"
					color="success"
					disableElevation={true}
					sx={{
						width: '21%',
						padding: '10px'
					}}
				>
					Quick Analysis
				</Button>
			</div>

			{rows.length > 0 ? <StickyHeadTable rows={rows} columns={columns} isDep={false} isDash={true} /> : ''}
		</div>
	);
};

export default StudDash;
