import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StickyHeadTable from '../../components/Table';
import Header from '../../components/Nav';
import CreateDueForm from '../../components/CreateDueForm';
import GenericModal from '../../components/GenericModal';
import { getDepartmentDue } from '../../service/fetchDepartmentDue';
import { useRecoilValue } from 'recoil';
import { authState } from '../../context/auth/authState';
import { Button } from '@mui/base';
import { backendUri } from '../../env';
import Filter from '../Filters/Filter';
import checkDepartmentToken from '../../service/checkDepartmentToken';
import { useNavigate } from 'react-router-dom';

const columns = [
	{
		id: 'reason',
		label: 'Department',
		minWidth: 100
	},
	{
		id: 'amount',
		label: 'Amount',
		minWidth: 100
	},
	{
		id: 'due_date',
		label: 'Due Date',
		minWidth: 100
	}
];

const Due = () => {
	const navigator = useNavigate();
	const token = checkDepartmentToken();

	const [ rows, setRows ] = useState(null);
    const [click, setClick] = useState(0);
	const [ param, setParam ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(
		() => {
			if (token === null) {
				navigator('/');
				return;
			}
			const fetchDepartmentDue = async () => {
				try {
                    const rows = await getDepartmentDue(backendUri, token, param);
					console.log('Data fetched:', rows.data);
					setRows(rows.data);
					setLoading(false);
				} catch (error) {
					console.error('Error fetching department due:', error);
				}
			};

			fetchDepartmentDue();
		},
		[ param , click]
	);

	return (
		<div className="flex flex-col h-full">
			<Header label="DUE RECORD" isDep={true} />

			<div className="flex flex-col overflow-auto">
				<div style={{height: '90vh'}} className=" w-full">
                    <Filter param={param} setParam={setParam} setClick={setClick}  className="mb-4" />

					{rows ? (
						<StickyHeadTable rows={rows} columns={columns} isDep={true}  className="w-full" />
					) : (
						<div className="text-center">Loading...</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Due;
