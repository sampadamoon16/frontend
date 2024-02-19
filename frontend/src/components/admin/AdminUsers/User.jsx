import React from 'react'
import {
    Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, styled,
    TableCell, tableCellClasses, TablePagination,
    Button, Fab
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './addNewUser'
import { Link } from 'react-router-dom'
import UpdateUser from './UpdateUser';
import ViewUser from './ViewUser';
import RoleAssignData from '../RoleAssign/RoleAssignData';
import ViewRole from './ViewRole';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function User() {

    //--------------------------------------------------------- get data in table -----------------------------------------------
    const [data, setData] = useState([])

    // ----------------------------------------------------------   view User ------------------------------------------------------------------
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const handleView = (uid) => {
        setSelectedUserId(uid);
        setViewModalOpen(true);
    };

    // ------------------------------------------------------------ Pagination  ----------------------------------------------------------------
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // -------------------------------------------------------------- Update User -------------------------------------------------------------
    // ---------------------------------------------------------------  Modal -----------------------------------------------------------------
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    // ------------------------------------- this function to open the modal and set the selected role   --------------------------------------
    const handleEdit = (role_id) => {
        setSelectedRole(role_id);
        setShowModal(true);
    }
    //--------------------------------------------------- This function to close the Modal  ------------------------------------------------
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRole(null);
    }
    //-----------------------------------------------------------   Get data   ----------------------------------------------------------------
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/admin/userlist")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);

    console.log()
    //----------------------------------------------------  status update (Active Deactive) ----------------------------------------------------    
    async function activestatus(uid, e) {
        let response = await axios.patch(`http://localhost:5000/api/admin/updatestatus?status=active&uid=${uid}`)
        console.log(response.uid);
    }
    async function deactivestatus(uid, e) {
        let response = await axios.patch(`http://localhost:5000/api/admin/updatestatus?status=deactive&uid=${uid}`)
        console.log(response);
    }

    // ---------------------------------------------------------------  Assign Role  ----------------------------------------------------------
    const [openRoleModal, setOpenRoleModal] = useState(false);

    const handleOpenRoleModal = () => {
        setOpenRoleModal(true);
    };
    const handleCloseRoleModal = () => {
        setOpenRoleModal(false);
    };
    //------------------------------------------------------------------  view Role ---------------------------------------------------------
    const [selectedViewUserId, setSelectedViewUserId] = useState(null);
    const [viewRoleModalOpen, setViewRoleModalOpen] = useState(false);

    const handleViewRole = (uid) => {
        setSelectedViewUserId(uid);
        setViewRoleModalOpen(true);
    };
    // -------------------------------------------------------------------- Search ------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');


    return (
        <>
            <div className='mt-4 ms-4' style={{ overflowX: 'auto' }}>
                <div className='mb-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Link to='/newuser' className='btn btn-success'>
                                Add New User
                            </Link>
                        </div>
                        <div>
                            <form class="form-inline my-2 my-lg-0 d-flex">
                                <input
                                    class="form-control me-2"
                                    type="search"
                                    placeholder="Search Here"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                {/* <StyledTableCell align="left">Date of Birth</StyledTableCell> */}
                                <StyledTableCell align="left">Email</StyledTableCell>
                                <StyledTableCell align="left">Mobile </StyledTableCell>
                                <StyledTableCell align="left">Photo </StyledTableCell>
                                <StyledTableCell align="left">DOJ </StyledTableCell>
                                {/* <StyledTableCell align="left">Qualification </StyledTableCell> */}
                                {/* <StyledTableCell align="left">Address </StyledTableCell> */}
                                <StyledTableCell align="left">State </StyledTableCell>
                                <StyledTableCell align="left">City </StyledTableCell>
                                <StyledTableCell align="left">Status </StyledTableCell>
                                <StyledTableCell align="left">Action </StyledTableCell>
                                <StyledTableCell align="left">Role </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .filter((item) => {
                                    return (
                                        searchTerm.trim() === '' ||
                                        item.uid?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.city?.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <StyledTableRow key={item.uid}>
                                        <StyledTableCell align="left">{item.uid}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">{item.name} </StyledTableCell>
                                        {/* <StyledTableCell align="left">{item.dob}</StyledTableCell> */}
                                        <StyledTableCell align="left">{item.email}</StyledTableCell>
                                        <StyledTableCell align="left">{item.mobile}</StyledTableCell>
                                        <StyledTableCell align="left"><img src={item.photo} alt="" style={{ height: "50px", width: "50px" }} /> </StyledTableCell>
                                        <StyledTableCell align="left">{item.doj}</StyledTableCell>
                                        {/* <StyledTableCell align="left">{item.qualification}</StyledTableCell> */}
                                        {/* <StyledTableCell align="left">{item.address}</StyledTableCell> */}
                                        <StyledTableCell align="left">{item.state}</StyledTableCell>
                                        <StyledTableCell align="left">{item.city}</StyledTableCell>
                                        {/* <StyledTableCell align="left">{item.pin}</StyledTableCell> */}
                                        <StyledTableCell align="left">
                                            {
                                                (item.status === "deactive") ?
                                                    <Switch
                                                        onChange={(e) => activestatus(item.uid, e)}
                                                    /> :
                                                    <Switch {...label} defaultChecked
                                                        onChange={(e) => deactivestatus(item.uid, e)}
                                                    />
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <Button color="secondary" aria-label="edit" size='small'
                                                onClick={() => handleEdit(item)}>
                                                <EditIcon />
                                            </Button>
                                            <Button color="primary" aria-label="view" size='small'
                                                onClick={() => handleView(item.uid)}
                                            >
                                                <VisibilityIcon />
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            
                                            <RoleAssignData uuid={item.uid} />

                                            <Button
                                                color="secondary"
                                                aria-label="view"
                                                size='small'
                                                onClick={() => handleViewRole(item.uid)}
                                            >
                                                <VisibilityIcon />
                                            </Button>

                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {selectedRole && (
                    <UpdateUser
                        show={showModal}
                        handleClose={handleCloseModal}
                        user={selectedRole}
                    />
                )}

                {selectedUserId && (
                    <ViewUser
                        uid={selectedUserId}
                        open={viewModalOpen}
                        handleClose={() => {
                            setViewModalOpen(false);
                            setSelectedUserId(null);
                        }}
                    />
                )}

                {/* <RoleAssignData 

    
                    open={openRoleModal}
                    handleClose={handleCloseRoleModal}
                /> */}

                {/* <RoleAssignData uid={item.uid} /> */}

                {selectedViewUserId && (
                    <ViewRole
                        uid={selectedViewUserId}
                        open={viewRoleModalOpen}
                        handleClose={() => setViewRoleModalOpen(false)}
                    />
                )}
            </div>
        </>
    )
}

export default User
