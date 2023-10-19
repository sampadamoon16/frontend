import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Fab, TablePagination, Button } from '@mui/material';
import { Table } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import UpdateSubCategory from './UpdateSubCategory';


export default function SubCategoryTable() {

    const [data, setData] = useState([]);

    ///////    pagination   ////////
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

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/admin/subCategory/viewSubcat")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover >
                <thead >
                    <tr >
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Sr. No.</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Product ID</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Sub Category ID</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Sub Category Name</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Image</th>
                        {/* <th className='text-white' style={{ backgroundColor: "Black" }}>Added On</th> */}
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.c_id}</td>
                            <td>{item.subCategory_id}</td>
                            <td>{item.subCategory_name}</td>
                            <td><img src={item.photo} alt="" style={{ height: "50px", width: "50px" }} /> </td>
                            {/* <td>{item.addOn}</td> */}
                            <td>
                                <Button color="secondary" aria-label="edit" size="small" onClick={() => handleEdit(item)} >
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
                <UpdateSubCategory
                    show={showModal}
                    handleClose={handleCloseModal}
                    SubCategory={selectedRole}
                />
            )}
        </div>
    )
}
