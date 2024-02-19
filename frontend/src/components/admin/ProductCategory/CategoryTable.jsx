import React, { useState, useEffect } from 'react'

import {   Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, styled,
    TableCell, tableCellClasses, TablePagination, Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import UpdateProduct from './UpdateProduct';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: '8px',

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '9px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
        height: '10px',
    },
}));

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

    //---------------------------------------------------   Search   --------------------------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ overflowX: 'auto' }}>
            <div>
                <form class="form-inline my-2  d-flex">
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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table  aria-label="customized table">
                        <TableHead >
                            <TableRow >
                                <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Sr. No.</StyledTableCell>
                                <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Category ID</StyledTableCell>
                                <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Category Name</StyledTableCell>
                                <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .filter((item) => {
                                    return (
                                        searchTerm.trim() === '' ||
                                        item.Pcategory_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.city?.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                                        <StyledTableCell>{item.Pcategory_id}</StyledTableCell>
                                        <StyledTableCell>{item.category_name}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button color="secondary" aria-label="edit" size="small" onClick={() => handleEdit(item)}>
                                                <EditIcon />
                                            </Button>
                                            {/* <Fab color="primary" aria-label="view" size="small" className='ms-3'>
                                    <VisibilityIcon />
                                </Fab> */}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
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
