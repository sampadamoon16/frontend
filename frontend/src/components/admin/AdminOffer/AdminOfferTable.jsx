import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Fab, TablePagination, Button, Switch } from '@mui/material';
import {  Table } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import UpdateOffer from './UpdateOffer';



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

    

    return (
        <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover >
                <thead >
                    <tr >
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Sr. No.</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Offer ID</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Offer Name</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Discount(%)</th>
                        {/* <th className='text-white' style={{backgroundColor:"Black"}}>Flat Discount</th> */}
                        {/* <th className='text-white' style={{backgroundColor:"Black"}}>Upto Discount</th> */}
                        {/* <th className='text-white' style={{backgroundColor:"Black"}}>valid From</th> */}
                        {/* <th className='text-white' style={{backgroundColor:"Black"}}>Valid To</th> */}
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Sub Category ID</th>
                        {/* <th className='text-white' style={{backgroundColor:"Black"}}>Terms and Conditions</th>  */}
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Status</th>
                        <th className='text-white' style={{ backgroundColor: "Black" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.offer_id}</td>
                                <td>{item.offer_name}</td>
                                <td>{item.per_discount}</td>
                                {/* <td>{item.flat_discount}</td> */}
                                {/* <td>{item.upto_discount}</td> */}
                                {/* <td>{item.valid_from}</td> */}
                                {/* <td>{item.valid_to}</td> */}
                                <td>{item.subcategory_id}</td>
                                {/* <td>{item.T_and_C}</td>                */}
                                <td>
                                    <Switch 
                                    checked={item.status === 'deactive'} // Assuming 'active' is the checked state
                                    onChange={(e) => {
                                        const newStatus = e.target.checked ? 'deactive' : 'active';
                                        // You can perform an action here, like updating the status in your data
                                    }}
                                    {...label} defaultChecked/>
                                </td>
                                <td>
                                    <Button color="secondary" aria-label="edit" size="small" onClick={() => handleEdit(item)}>
                                        <EditIcon />
                                    </Button>
                                    <Button color="primary" aria-label="view" size="small" className='ms-3'>
                                        <VisibilityIcon />
                                    </Button>
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
                <UpdateOffer
                    show={showModal}
                    handleClose={handleCloseModal}
                    offer={selectedRole}
                />
            )}
        </div>
    )
}
