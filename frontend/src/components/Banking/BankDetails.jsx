import React, { useState, useEffect } from 'react'
import {
    Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, styled,
    TableCell, tableCellClasses, TablePagination,
    Button, Fab
} from '@mui/material'
import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch';

import axios from 'axios';
// import ViewRetailer from './ViewRetailer';


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

function BankDetails() {
    const [data, setData] = useState([])
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/retailer/banking/getdetails")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);

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

      // -------------------------------------------------------------------- Search ------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');

    //----------------------------------------------------  status update (Active Deactive) ----------------------------------------------------    
    async function activestatus(reg_no , e) {
        let response = await axios.patch(`http://localhost:5000/api/retailer/banking/update-bank-status?status=active&reg_no=${reg_no }`)
        console.log(response.reg_no );
    }
    async function deactivestatus(reg_no , e) {
        let response = await axios.patch(`http://localhost:5000/api/retailer/banking/update-bank-status?status=deactive&reg_no=${reg_no }`)
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
                                <StyledTableCell>Account Number</StyledTableCell>
                                <StyledTableCell>Accounter's Name </StyledTableCell>
                                <StyledTableCell>IFSC Code </StyledTableCell>
                                <StyledTableCell>Bank Name </StyledTableCell>
                                <StyledTableCell>Branch Name </StyledTableCell>
                                <StyledTableCell>UPI ID</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .filter((item) => {
                                    return (
                                        searchTerm.trim() === '' ||
                                        item.reg_no?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.acc_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.upi?.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <StyledTableRow >
                                        <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                        <StyledTableCell align="left">{item.reg_no}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">{item.acc_no} </StyledTableCell>
                                        <StyledTableCell align="left">{item.acc_name}</StyledTableCell>
                                        <StyledTableCell align="left">{item.ifsc}</StyledTableCell>
                                        <StyledTableCell align="left">{item.bank_name}</StyledTableCell>
                                        <StyledTableCell align="left">{item.branch_name}</StyledTableCell>
                                        <StyledTableCell align="left">{item.upi}</StyledTableCell>                                         
                                        <StyledTableCell >
                                            {
                                                (item.status === "deactive") ?
                                                    <Switch
                                                        onChange={(e) => activestatus(item.reg_no, e)}
                                                    /> :
                                                    <Switch {...label} defaultChecked
                                                        onChange={(e) => deactivestatus(item.reg_no, e)}
                                                    />
                                            }
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

export default BankDetails