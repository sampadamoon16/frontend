import {
    Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, styled,
    TableCell, tableCellClasses, TablePagination,
    Button, Fab
} from '@mui/material'
import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch';

import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ViewRetailer from './ViewRetailer';


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


function Retailer() {

    //-----------------------------------------------------------get API -----------------------------------------------------

    const [data, setData] = useState([])
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/admin/viewshop")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);

    // -------------------------------------------------------------------- Search ------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');

    //----------------------------------------------------  status update (Active Deactive) ----------------------------------------------------    
    async function activestatus(reg_no, e) {
        let response = await axios.patch(`http://localhost:5000/api/retailer/status/status=active&=${reg_no}`)
        console.log(response);
    }
    async function deactivestatus(reg_no, e) {
        let response = await axios.patch(`http://localhost:5000/api/retailer/status/status=deactive&uid=${reg_no}`)
        console.log(response);
    }


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

    
    //----------------------------------------------------  status update (Active Deactive) ----------------------------------------------------    
    async function activestatus(reg_no , e) {
        let response = await axios.patch(`http://localhost:5000/api/retailer/regstatus?status=active&reg_no=${reg_no }`)
        console.log(response.reg_no );
    }
    async function deactivestatus(reg_no , e) {
        let response = await axios.patch(`http://localhost:5000/api/retailer/regstatus?status=deactive&reg_no=${reg_no }`)
        console.log(response);
    }

    return (
        <>
            <div className='mt-5 ms-5' style={{ overflowX: 'auto' }}>
                <div className='mb-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <form class="form-inline my-2 my-lg-0 d-flex">
                                <input
                                    class="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                            </form>
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sr. No.</StyledTableCell>
                                <StyledTableCell>Reg. No.</StyledTableCell>
                                <StyledTableCell>Shop Name</StyledTableCell>
                                <StyledTableCell>Mobile </StyledTableCell>
                                <StyledTableCell>Website </StyledTableCell>
                                <StyledTableCell>Email </StyledTableCell>
                                <StyledTableCell>Status </StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .filter((item) => {
                                    return (
                                        searchTerm.trim() === '' ||
                                        item.reg_no?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.shop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.email?.toLowerCase().includes(searchTerm.toLowerCase())

                                    );
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <StyledTableRow >
                                        <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                        <StyledTableCell align="left">{item.reg_no}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">{item.shop_name} </StyledTableCell>
                                        <StyledTableCell align="left">{item.mobile}</StyledTableCell>
                                        <StyledTableCell align="left">{item.website}</StyledTableCell>
                                        {/* <StyledTableCell align="left"><img src={item.photo} alt="" style={{ height: "50px", width: "50px" }} /> </StyledTableCell> */}
                                        <StyledTableCell align="left">{item.email}</StyledTableCell>
                                        {/* <StyledTableCell align="left">{item.status}</StyledTableCell> */}
                                        <StyledTableCell >
                                            {
                                                (item.status === "deactive") ?
                                                    <Switch
                                                        onChange={(e) => activestatus(item.reg_no , e)}
                                                    /> :
                                                    <Switch {...label} defaultChecked
                                                        onChange={(e) => deactivestatus(item.reg_no , e)}
                                                    />
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <ViewRetailer reg_no={item.reg_no} />
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
            </div>
        </>
    )
}

export default Retailer