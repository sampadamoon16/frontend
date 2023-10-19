import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Fab, TablePagination, Grid , Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import UpdateProduct from './UpdateProduct';



export default function CategoryTable() {

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

    ///   update Role Modal ///
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // this function to open the modal and set the selected product
    const handleEdit = (Pcategory_id) => {
        setSelectedRole(Pcategory_id);
        setShowModal(true);
    }

    // this function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRole(null);
    }

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/admin/category/viewcategory")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ overflowX: 'auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Table striped bordered hover>
                        <thead >
                            <tr >
                                <th className='text-white' style={{ backgroundColor: "Black" }}>Sr. No.</th>
                                <th className='text-white' style={{ backgroundColor: "Black" }}>Product ID</th>
                                <th className='text-white' style={{ backgroundColor: "Black" }}>Product Name</th>
                                <th className='text-white' style={{ backgroundColor: "Black" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.Pcategory_id}</td>
                                        <td>{item.category_name}</td>
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
                </Grid>
                <Grid item xs={12}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>

                {selectedRole && (
                    <UpdateProduct
                        show={showModal}
                        handleClose={handleCloseModal}
                        product={selectedRole}
                    />
                )}
            </Grid>
        </div>
    )
}
