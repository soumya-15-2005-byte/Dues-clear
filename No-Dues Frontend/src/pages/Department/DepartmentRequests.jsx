import { FaSearch } from "react-icons/fa";
import CreateDueForm from "../../components/CreateDueForm";
import GenericModal from "../../components/GenericModal";
import React, { useEffect, useState } from "react";
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Button,
    Typography,
    Divider,
    Link
} from "@mui/material";
import { toast } from "react-toastify"
import Header from "../../components/Nav";
import { backendUri } from "../../env";
import { useNavigate } from "react-router-dom";
import checkDepartmentToken from "../../service/checkDepartmentToken";
import removeNullParams from "../../service/removeNullParams";

const Filter = ({ setParam }) => {
    const [filter, setFilter] = useState({
        role: '',
        academic_program: "",
        start_date: "",
        end_date: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilter((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const handleClick = () => {
        setParam(filter);
        console.log(filter);
    };

    return (
        <div className="w-full border-b border-black">
            <div className="text-xl font-bold m-4">Filters</div>
            <div className="flex item-center">
                <div className="grid grid-cols-3 gap-4 p-4 w-5/6">
                    <div className="flex items-center">
                        <label className="mr-2">Academic Program:</label>
                        <input
                            name="academic_program"
                            type="text"
                            value={filter.academic_program}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Role:</label>
                        <select
                            name="role"
                            value={filter.role}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Select Role</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="Phd">PHD</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Status:</label>
                        <select
                            name="role"
                            value={filter.role}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Select Status</option>
                            <option value="On hold">On hold</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Start Date:</label>
                        <input
                            name="start_date"
                            type="date"
                            value={filter.start_date}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">End Date:</label>
                        <input
                            name="end_date"
                            type="date"
                            value={filter.end_date}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />
                    </div>
                </div>
                <div className="flex items-center col-span-2 justify-center w-1/6">
                    <button
                        onClick={handleClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Search <FaSearch className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

function RequestDetailModal({ row }) {
    return (
        <div sx={{ padding: '2rem' }} className="space-y-2">
            <Typography variant="body1" className="mb-1"><strong>Due ID:</strong> {row.due_id}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Due Amount:</strong> {row.due_amount}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Due Reason:</strong> {row.due_reason}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Student Name:</strong> {row.student_name}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Academic Program:</strong> {row.academic_program}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Role:</strong> {row.role}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Student Roll Number:</strong> {row.student_roll_number}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Response Mode:</strong> {row.response_mode}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Status:</strong> {row.status}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Created At:</strong> {row.created_at}</Typography>
            {row.payment_proof_file && (
                <Typography variant="body1" className="mb-1"><strong>Payment Proof File:</strong> <Link href={row.payment_proof_file} target="_blank" rel="noopener noreferrer">View Proof</Link></Typography>
            )}
        </div>
    );
}

function DueDetailModal({ id }) {
    const [data, setData] = useState(null)
    const token = checkDepartmentToken();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${backendUri}/department/due/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.status !== 200) {
                    toast.error('Failed to fetch students. Please refresh the page.');
                    return;
                }
                const resp = await response.json();
                setData(resp);
                console.log(data);
            } catch (error) {
                toast.error('Failed to fetch student. Please refresh the page.');
            }
        }
        fetchRequests()
    }, [])

    return (
        <>
            {data ? (
                <div sx={{ padding: '2rem' }} className="space-y-2">
                    <Typography variant="body1" className="mb-1"><strong>Due ID:</strong> {data.id}</Typography>
                    <Typography variant="body1" className="mb-1"><strong>Due Amount:</strong> {data.amount}</Typography>
                    <Typography variant="body1" className="mb-1"><strong>Due Reason:</strong> {data.reason}</Typography>
                    <Typography variant="body1" className="mb-1"><strong>Due Date:</strong> {data.due_date}</Typography>
                    <Typography variant="body1" className="mb-1"><strong>Student Name:</strong> {data.student_name}</Typography>
                    <Typography variant="body1" className="mb-1"><strong>Status:</strong> {data.status}</Typography>
                    <Typography variant="body1" className="mb-1"><strong>Created At:</strong> {data.created_at}</Typography>
                    {data.payment_url && (
                        <Typography variant="body1" className="mb-1"><strong>Due Payment url:</strong> <Link href={data.payment_url} target="_blank" rel="noopener noreferrer">View Proof</Link></Typography>
                    )}
                    {data.proof.length > 0 && (
                        <Typography variant="body1" className="mb-1"><strong>Due Proof:</strong> {data.proof.map((item, index) => (
                            <Link key={index} href={item} target="_blank" rel="noopener noreferrer">Proof {index + 1}</Link>
                        ))}</Typography>
                    )}
                </div>
            ) : (<div>Loading...</div>)}
        </>
    );
}


function StickyHeadTable({ rows, columns, setClicked }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestButton = async (action, id) => {
        const token = checkDepartmentToken();
        const actionResp = action ? 'accept' : 'reject';
        const response = await fetch(`${backendUri}/due/process-response`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                response: actionResp,
                due_request_id: id
            })
        });

        if (response.status !== 200) {
            toast.error('Failed to perform the action, please try again later.');
            return;
        } else {
            const data = await response.json();
            toast.success("action completed");
            setClicked(prev => prev + 1)
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div style={{ margin: 'auto', width: '80vw' }}>
            <div className="w-full overflow-hidden mt-10">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>S. No.</TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            className="min-w-[100px]"
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, rowIndex) => (
                                        <TableRow hover tabIndex={-1} key={rowIndex}>
                                            <TableCell>
                                                {rowIndex + 1}
                                            </TableCell>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Button>
                                                        <GenericModal buttonName={row[column.id]}>
                                                            <DueDetailModal id={row.due_id} />
                                                        </GenericModal>
                                                    </Button>
                                                </TableCell>
                                            ))}
                                            <TableCell style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <Button
                                                    style={{ backgroundColor: '#4CAF50', color: 'white' }}
                                                    onClick={() => handleRequestButton(true, row.id)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    style={{ textTransform: 'none' }}
                                                >
                                                    <GenericModal buttonName="Details">
                                                        <RequestDetailModal row={row} />
                                                    </GenericModal>
                                                </Button>
                                                <Button
                                                    style={{ backgroundColor: '#F44336', color: 'white' }}
                                                    onClick={() => handleRequestButton(false, row.id)}
                                                >
                                                    Reject
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 2, 5, 10]}
                        component="div"
                        count={Math.floor(rows.length / rowsPerPage) + (rows.length % rowsPerPage > 0 ? 1 : 0)}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}


const columns = [
    {
        id: "due_reason",
        label: "Due Reason",
        minWidth: 100,
    },
    {
        id: "student_roll_number",
        label: "Roll Number",
        minWidth: 100,
    },
    {
        id: "due_amount",
        label: "Amount",
        minWidth: 100,
    },
    {
        id: "response_mode",
        label: "Response Mode",
        minWidth: 100,
    },
];


const url = '{{localhost}}'

export default function DepartmentRequest() {
    const [clicked, setClicked] = useState(0);
    const [param, setParam] = useState([]);
    const [rows, setRows] = useState([]);
    const navigator = useNavigate();
    const token = checkDepartmentToken();

    
    useEffect(() => {
        if (token === null) {
            navigator('/');
            return;
        }
        const fetchRequests = async () => {
            const queryParams = new URLSearchParams(removeNullParams(param));
            try {
                const response = await fetch(`${backendUri}/department/get-department-requests?${queryParams.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.status !== 200) {
                    toast.error('Failed to fetch students. Please refresh the page.');
                    return;
                }
                const data = await response.json();
                setRows(data.data);
            } catch (error) {
                toast.error('Failed to fetch student. Please refresh the page.');
            }
        }
        fetchRequests()
    }, [clicked, param])

    return (
        <>
            <Header isDep={true} label={"REQUESTS"} />
            <div style={{ height: '90vh', width: '100%', padding: '4px' }}>
                <Filter setParam={setParam} />
                {rows ? <StickyHeadTable rows={rows} columns={columns} setClicked={setClicked}/> : <div>Loading... </div>}
            </div>
        </>
    )
}
