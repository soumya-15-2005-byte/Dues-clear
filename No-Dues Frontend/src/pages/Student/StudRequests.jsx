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
import checkStudentToken from "../../service/checkStudentToken";
import StudentNav from "../../components/StudentNav";

const Filter = ({ setParam }) => {
    const [filter, setFilter] = useState({
        status: '',
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
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold m-4">Filters</div>
                <div className="flex items-center">
                    <div className="flex items-center px-8">
                        <label className="mr-2">Status:</label>
                        <select
                            name="status"
                            value={filter.status}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Select Status</option>
                            <option value="ResponseStatus.ON_HOLD">On hold</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex items-center col-span-2 justify-center px-8 w-1/6 h-inherit">
                        <button
                            onClick={handleClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Search
                        </button>
                    </div>
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

function StickyHeadTable({ rows, columns }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRequestButton = async (action, id) => {
        const token = checkDepartmentToken();
        const actionResp = action ? 'accept' : 'reject';
        const response = await fetch(`${backendUri}/due/process-response`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer' + token,
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
        }
        else {
            const data = await response.json();
            toast.success(data.message);
        }


    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleMenuOpen = (event, row) => {
        setSelectedRow(row);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, rowIndex) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={rowIndex}>
                                                <TableCell>
                                                    {rowIndex + 1}
                                                </TableCell>
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <GenericModal buttonName={row[column.id]}>
                                                                <RequestDetailModal row={row}/>
                                                            </GenericModal>
                                                        </TableCell>
                                                    )
                                                }
                                                )}
                                            </TableRow>
                                        );
                                    })}
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
        id: "due_amount",
        label: "Amount",
        minWidth: 100,
    },
    {
        id: "response_mode",
        label: "Response Mode",
        minWidth: 100,
    },
    {
        id:"status",
        label:"Status",
        minWidth:100
    }
];

export default function StudentRequests() {
    const [clicked, setClicked] = useState(0);
    const [param, setParam] = useState([]);
    const [rows, setRows] = useState([]);
    const navigator = useNavigate();
    const token = checkStudentToken();

    useEffect(() => {
        if (token === null) {
            navigator('/');
            return;
        }
        const fetchRequests = async () => {
            const queryParams = new URLSearchParams(removeNullParams(param));
            try {
                const response = await fetch(`${backendUri}/student/requests?${queryParams.toString()}`, {
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
            <StudentNav label={"REQUESTS"} />
            <div style={{ height: '90vh', width: '100%', padding: '4px' }}>
                <Filter param={param} setParam={setParam} />
                {rows ? <StickyHeadTable rows={rows} columns={columns} /> : <div>Loading... </div>}
            </div>
        </>
    )
}