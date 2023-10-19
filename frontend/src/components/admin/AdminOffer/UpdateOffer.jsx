import axios from 'axios';
import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';


export default function UpdateOffer({ show, handleClose, offer }) {
    const [formData, setFormData] = useState({
        offer_id: offer.offer_id,
        offer_name: offer.offer_name,
        per_discount: offer.per_discount,
        flat_discount : offer.flat_discount,
        upto_discount: offer.upto_discount,
        valid_from : offer.valid_from,
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
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-5'>
                        <TextField
                        disabled
                            id="standard-basic"
                            label="Offer ID"
                            variant="standard"
                            name="offer_id"
                            value={formData.offer_id}
                            onChange={handleInputChange}
                        />
                    </div> <br /> <br />
                    <div>
                        <TextField
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
                    </div><br /><br />
                    <div>
                        <TextField
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
                    </div><br /><br />
                   
                    <div>
                        <TextField
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
                    </div><br /><br />
                    
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Sub Category ID"
                            variant="standard"
                            name="subcategory_id"
                            value={formData.subcategory_id}
                            onChange={handleInputChange}
                        />
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
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Status"
                            variant="standard"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />                    

                    
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
