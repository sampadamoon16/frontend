import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Button, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateRole from './UpdateRole';



export default function RoleTable() {
    const [data, setData] = useState([]);


    ////// Pagination  ///////////
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /// updateRole  ///
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // this function to open the modal and set the selected role
    const handleEdit = (role_id) => {
        setSelectedRole(role_id);
        setShowModal(true);
    }

    // this function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRole(null);
    }


    /// Get Data in Table ////
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/admin/roles/newroles")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);


    return (
        <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='text-white' style={{ backgroundColor: "Black", }}>Sr. No.</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Role ID</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Role Name</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.role_id}</td>
                                <td>{item.role_name}</td>
                                <td>
                                    <Button color="secondary" aria-label="edit" size="small" onClick={() => handleEdit(item)}>
                                        <EditIcon />
                                    </Button>
                                    {/* <Fab color="primary" aria-label="view" size="small" className='ms-3'>
                                    <VisibilityIcon />
                                </Fab> */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

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
                <UpdateRole
                    show={showModal}
                    handleClose={handleCloseModal}
                    role={selectedRole}
                />
            )}
        </div>
    )
}
