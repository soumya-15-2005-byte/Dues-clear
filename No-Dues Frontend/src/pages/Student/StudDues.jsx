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
} from "@mui/material";
import checkDepartmentToken from "../../service/checkDepartmentToken";
import { useNavigate } from "react-router-dom";
import { backendUri } from "../../env";
import Header from '../../components/Nav';
import { toast } from "react-toastify"
import removeNullParams from "../../service/removeNullParams";
import checkStudentToken from "../../service/checkStudentToken";
import StudRequestsForm from "../../components/StudentRequestForm";
import StudentNav from "../../components/StudentNav";

const columns = [
  {
    id:"department_name",
    label:"Department",
    minWidth:100
  },
  {
    id: "reason",
    label: "reason",
    minWidth: 100,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "due_date",
    label: "Due Date",
    minWidth: 100,
  },
];


const Filter = ({ setParam, setClicked }) => {
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
              <option value="paid">paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">cancelled</option>
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


function StudentDetailModal({ id }) {
  const token = checkStudentToken()
  const [row,setRow] = useState(null);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${backendUri}/student/due/${id}`, {
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
        setRow(resp);
      } catch (error) {
        toast.error('Failed to fetch student. Please refresh the page.');
      }
    }
    fetchRequests()
  }, [])
  return (
    <>
      {row ? (
        <div className="p-4 space-y-2">
          <Typography variant="body1" className="mb-1"><strong>ID:</strong> {row.id}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Amount:</strong> {row.amount}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Department:</strong> {row.department}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Due Date:</strong> {row.due_date}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Reason:</strong> {row.reason}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Created At:</strong> {row.created_at}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Payment URL:</strong> {row.payment_url}</Typography>
          <Typography variant="body1" className="mb-1"><strong>Status:</strong> {row.status}</Typography>
        </div>
      ) : <>Loading...</>}
    </>

  );
}

function StickyHeadTable({ rows, columns, navigator, setClicked }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const token = checkStudentToken();

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
                  <TableCell>Create request</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow hover tabIndex={-1} key={rowIndex}>
                        <TableCell>
                          {page * rowsPerPage + rowIndex + 1}
                        </TableCell>
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <GenericModal buttonName={row[column.id]} >
                                <StudentDetailModal id={row.id} />
                              </GenericModal>
                            </TableCell>
                          )
                        }
                        )}
                        <TableCell style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Button
                            style={{
                              backgroundColor: row['status'] !== 'paid' ? '#008080' : '#4062BB',
                              color: 'white'
                            }}
                          >
                          {row['status'] !== 'paid' ?
                            (<GenericModal buttonName="Create request" >
                              <StudRequestsForm dueId={row['id']} />
                            </GenericModal>) : row['request_sent'] ? 'Request sent' : row['status'] === 'paid' ? 'Paid' : 'Cancelled'
                          }
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10]}
            component="div"
            count={rows.length}
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

export default function StudDues() {
  const [clicked, setClicked] = useState(0);
  const [param, setParam] = useState([]);
  const [rows, setRows] = useState([]);
  const navigator = useNavigate();
  const token = checkStudentToken();

  useEffect(() => {
    console.log(token)
    if (token === null) {
      navigator('/');
      return;
    }
    const fetchStudents = async () => {
      const queryParams = new URLSearchParams(removeNullParams(param));
      try {
        const response = await fetch(`${backendUri}/student/dues?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        if (response.status !== 200) {
          toast.error('Failed to fetch dues. Please refresh the page.');
          return;
        }
        const data = await response.json();
        setRows(data.data);
      } catch (error) {
        toast.error('Failed to fetch student. Please refresh the page.');
      }
    }
    fetchStudents()
  }, [clicked, param])

  return (
    <>
      <StudentNav label={"My Dues"} />
      <div style={{ height: '90vh', width: '100%', padding: '4px' }}>
        <Filter param={param} setParam={setParam} setClicked={setClicked} />
        {rows ? <StickyHeadTable rows={rows} columns={columns} navigator={navigator} setClicked={setClicked} /> : <div>Loading... </div>}
      </div>
    </>
  )
}