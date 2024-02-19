import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import moment from 'moment'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ViewRetailer({ reg_no }) {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const [userData, setUserData] = useState(null);

    const handleOpen = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/retailer/viewshop/${reg_no}`);
            setUserData(response.data[0]);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching retailer data:', error);
        }
    };
    console.log(userData)

    return (
        <div>
            <Button color="secondary" aria-label="view" size='small' onClick={() => handleOpen(reg_no)} >
                <VisibilityIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Retailer Details
                    </Typography>
                    {userData && (
                        <div>
                            <ul>
                                <li><strong style={{ color: "darkblue" }}>Reg. No.:</strong> {userData.reg_no}</li>
                                <li><strong style={{ color: "darkblue" }}>GST NO.:</strong> {userData.gst_no}</li>
                                <li><strong style={{ color: "darkblue" }}>TIN No.:</strong> {userData.tin_no}</li>
                                <li><strong style={{ color: "darkblue" }}>Mobile:</strong> {userData.shop_pan}</li>
                                <li><strong style={{ color: "darkblue" }}>Shop Name:</strong> {userData.shop_name}</li>
                                <li><strong style={{ color: "darkblue" }}>Contact No.:</strong> {userData.contact_no}</li>
                                <li><strong style={{ color: "darkblue" }}>Mobile:</strong> {userData.mobile}</li>
                                <li><strong style={{ color: "darkblue" }}>Website:</strong> {userData.website}</li>
                                <li><strong style={{ color: "darkblue" }}>Email:</strong> {userData.email}</li>
                                <li><strong style={{ color: "darkblue" }}>Address:</strong> {userData.address}</li>
                                <li><strong style={{ color: "darkblue" }}>State:</strong> {userData.state}</li>
                                <li><strong style={{ color: "darkblue" }}>City:</strong> {userData.city}</li>
                                <li><strong style={{ color: "darkblue" }}>Pin:</strong> {userData.pin}</li>
                                <li><strong style={{ color: "darkblue" }}>PAN Document:</strong> <img src={userData.doc_pan} alt="" style={{height:'50px', width:'50px'}} /> </li>
                                <li><strong style={{ color: "darkblue" }}>Shop Document:</strong> <img src={userData.doc_shop} alt="" style={{height:'50px', width:'50px'}} /> </li>
                                <li><strong style={{ color: "darkblue" }}>Terms and Conditions:</strong> {userData.t_and_c}</li>
                                <li><strong style={{ color: "darkblue" }}>Status:</strong> {userData.status}</li>
                                <li><strong style={{ color: "darkblue" }}>Registered On:</strong> {userData.regOn}</li>
                                {/* <li><strong style={{ color: "darkblue" }}>Password:</strong> {userData.password}</li> */}
                            </ul>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default ViewRetailer