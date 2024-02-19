import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, styled,
    TableCell, tableCellClasses, TablePagination, Button
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import UpdateSubCategory from './UpdateSubCategory';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: '8px',

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '8px',
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


export default function SubCategoryTable() {

    const [data, setData] = useState([]);

    //---------------------------------------------    pagination  ----------------------------------------------------------
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

    // -------------------------------------------------------------------- Search ------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ overflowX: 'auto' }}>
            <div>
                <form class="form-inline my-2  d-flex ">
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
            <TableContainer component={Paper}>
                <Table aria-label="customized table" className='mt-3' >
                    <TableHead >
                        <TableRow >
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Sr. No.</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Product Name</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Sub Category ID</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Sub Category Name</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Image</StyledTableCell>
                            {/* <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Added On</StyledTableCell> */}
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((item) => {
                                return (
                                    searchTerm.trim() === '' ||
                                    item.c_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.subCategory_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.subCategory_name?.toLowerCase().includes(searchTerm.toLowerCase())
                                );
                            })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                                <StyledTableRow>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{item.c_id}</StyledTableCell>
                                    <StyledTableCell>{item.subCategory_id}</StyledTableCell>
                                    <StyledTableCell>{item.subCategory_name}</StyledTableCell>
                                    <StyledTableCell><img src={item.photo} alt="" style={{ height: "50px", width: "50px" }} /> </StyledTableCell>
                                    {/* <StyledTableCell>{item.addOn}</StyledTableCell> */}
                                    <StyledTableCell>
                                        <Button color="secondary" aria-label="edit" size="small" onClick={() => handleEdit(item)} >
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
