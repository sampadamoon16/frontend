import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, styled,
    TableCell, tableCellClasses, TablePagination, Button, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpdateOffer from './UpdateOffer';


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

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function AdminOfferTable() {

    const [data, setData] = useState([]);


//-------------------------------------------------------------- Pagination ----------------------------------------------------------------
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

//--------------------------------------------------- updateRole ----------------------------------------------
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
        const response = await axios.get("http://localhost:5000/api/admin/offer/viewoffer")
        setData(response.data)
    };
    useEffect(() => {
        loadData();
    }, []);

// -------------------------------------------------------------------- Search ------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');


//----------------------------------------------------  status update (Active Deactive) ----------------------------------------------------    
async function activestatus(offer_id, e) {
    let response = await axios.patch(`http://localhost:5000/api/admin/offer/updatestatus?status=active&offer_id=${offer_id}`)
    console.log(response.offer_id);
}
async function deactivestatus(offer_id, e) {
    let response = await axios.patch(`http://localhost:5000/api/admin/offer/updatestatus?status=deactive&offer_id=${offer_id}`)
    console.log(response);
}    

    return (
        <div style={{ overflowX: 'auto' }}>
            <div>
                <form className="form-inline my-2  d-flex mt-3">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search Here"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                </form>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="customized table" className='mt-3' >
                    <TableHead >
                        <TableRow >
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Sr. No.</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Offer ID</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Offer Name</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Discount(%)</StyledTableCell>
                            {/* <StyledTableCell className='text-white' style={{backgroundColor:"Black"}}>Flat Discount</StyledTableCell> */}
                            {/* <StyledTableCell className='text-white' style={{backgroundColor:"Black"}}>Upto Discount</StyledTableCell> */}
                            {/* <StyledTableCell className='text-white' style={{backgroundColor:"Black"}}>valid From</StyledTableCell> */}
                            {/* <StyledTableCell className='text-white' style={{backgroundColor:"Black"}}>Valid To</StyledTableCell> */}
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Sub Category Name</StyledTableCell>
                            {/* <StyledTableCell className='text-white' style={{backgroundColor:"Black"}}>Terms and Conditions</StyledTableCell>  */}
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Status</StyledTableCell>
                            <StyledTableCell className='text-white' style={{ backgroundColor: "Black" }}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((item) => {
                                return (
                                    searchTerm.trim() === '' ||
                                    item.offer_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.offer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.subcategory_id?.toLowerCase().includes(searchTerm.toLowerCase())
                                );
                            })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                                <StyledTableRow>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{item.offer_id}</StyledTableCell>
                                    <StyledTableCell>{item.offer_name}</StyledTableCell>
                                    <StyledTableCell>{item.per_discount}</StyledTableCell>
                                    {/* <StyledTableCell>{item.flat_discount}</StyledTableCell> */}
                                    {/* <StyledTableCell>{item.upto_discount}</StyledTableCell> */}
                                    {/* <StyledTableCell>{item.valid_from}</StyledTableCell> */}
                                    {/* <StyledTableCell>{item.valid_to}</StyledTableCell> */}
                                    <StyledTableCell>{item.subcategory_id}</StyledTableCell>
                                    {/* <StyledTableCell>{item.T_and_C}</StyledTableCell> */}
                                    <StyledTableCell>
                                        {
                                            (item.status === 'deactive') ?
                                            <Switch
                                               onChange={(e) => activestatus(item.offer_id, e)}
                                            />:
                                            <Switch {...label} defaultChecked
                                                onChange={(e) => deactivestatus(item.offer_id, e)}
                                            />
                                        }
                                        {/* <Switch
                                            checked={item.status === 'deactive'} // Assuming 'active' is the checked state
                                            onChange={(e) => {
                                                const newStatus = e.target.checked ? 'deactive' : 'active';
                                                // You can perform an action here, like updating the status in your data
                                            }}
                                            {...label} defaultChecked /> */}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button color="secondary" aria-label="edit" size="small" onClick={() => handleEdit(item)}>
                                            <EditIcon />
                                        </Button>
                                        {/* <Button color="primary" aria-label="view" size="small" className='ms-3'>
                                        <VisibilityIcon />
                                    </Button> */}
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
                <UpdateOffer
                    show={showModal}
                    handleClose={handleCloseModal}
                    offer={selectedRole}
                />
            )}
        </div>
    )
}
