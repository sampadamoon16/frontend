import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { TextField } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';
import { MenuItem, Select, InputLabel, FormControl, Input } from '@mui/material';



export default function UpdateOffer({ show, handleClose, offer }) {
    const [formData, setFormData] = useState({
        offer_id: offer.offer_id,
        offer_name: offer.offer_name,
        per_discount: offer.per_discount,
        flat_discount: offer.flat_discount,
        upto_discount: offer.upto_discount,
        valid_from: offer.valid_from,
        valid_to: offer.valid_to,
        subcategory_id: offer.subcategory_id,
        T_and_C: offer.T_and_C,
        status: offer.status

    });

    const handleSaveChanges = (offer) => {

        axios.put(`http://localhost:5000/api/admin/offer/updateoffer/${formData.offer_id}`, formData)
            .then(response => {
                console.log('Role updated successfully');
                handleClose();
            })
            .catch(error => {
                console.error('Error updating role:', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
// --------------------------------------------------------- Get sub Category in input fields --------------------------------------------------
    const [roleOptions, setRoleOptions] = useState([]);
    const getApiData = async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/subCategory/viewSubcat`);

        await setRoleOptions(res.data);
        console.log("first", res);
    };
    useEffect(() => {
        getApiData();
    }, []);
    return (
        <div>
            <Modal show={show} onHide={handleClose}  >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{border:"1px solid black", boxShadow: "1px 1px 10px 0px "}} className='ms-3 me-3 rounded-2'>
                    <div className='mt-5 '>
                        <TextField
                            disabled
                            id="standard-basic"
                            label="Offer ID"
                            variant="standard"
                            name="offer_id"
                            value={formData.offer_id}
                            onChange={handleInputChange}
                        />
                    {/* </div> 
                    <div> */}
                        <TextField
                        className='ms-5'
                            id="standard-basic"
                            label="Offer Name"
                            variant="standard"
                            name="offer_name"
                            value={formData.offer_name}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Discount in percentage"
                            variant="standard"
                            name="per_discount"
                            value={formData.per_discount}
                            onChange={handleInputChange}
                        />
                    {/* </div><br /><br />
                    <div> */}
                        <TextField
                        className='ms-5'
                            id="standard-basic"
                            label="Flat Discount"
                            variant="standard"
                            name="flat_discount"
                            value={formData.flat_discount}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Discount Upto"
                            variant="standard"
                            name="upto_discount"
                            value={formData.upto_discount}
                            onChange={handleInputChange}
                        />
                    {/* </div><br /><br />

                    <div> */}
                        <TextField
                        className='ms-5'
                            id="standard-basic"
                            label="Valid From"
                            variant="standard"
                            name="valid_from"
                            value={formData.valid_from}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Valid To"
                            variant="standard"
                            name="valid_to"
                            value={formData.valid_to}
                            onChange={handleInputChange}
                        />
                    {/* </div><br /><br />

                    <div> */}
                        {/* <TextField
                            id="standard-basic"
                            label="Sub Category ID"
                            variant="standard"
                            name="subcategory_id"
                            value={formData.subcategory_id}
                            onChange={handleInputChange}
                        /> */}

                        <FormControl variant="standard" sx={{  minWidth: 180 }} className='ms-5'>
                            <InputLabel id="demo-simple-select-standard-label">Sub Category ID</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                // value={subCategory_id}
                                name='subcategory_id'
                                onChange={handleInputChange}
                                label="Sub Category ID"
                            >
                                {roleOptions.map((row, index) => {
                                    return <MenuItem key={index} value={row.subCategory_id}>{row.subCategory_id} &nbsp;{row.subCategory_name}</MenuItem>
                                }
                                )}

                            </Select>
                        </FormControl>
                    </div><br /><br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Terms and Conditions"
                            variant="standard"
                            name="T_and_C"
                            value={formData.T_and_C}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />
                    {/* <div>
                        <TextField
                            id="standard-basic"
                            label="Status"
                            variant="standard"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        />
                    </div><br /><br /> */}


                    {/* <input type="text" value={role.role_name} onChange={(e) => handleInputChange(e)} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChanges(offer)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
