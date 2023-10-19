import axios from 'axios';
import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';

export default function UpdateProduct( { show, handleClose, product }) {
    const [formData, setFormData] = useState({
        Pcategory_id: product.Pcategory_id, 
        category_name: product.category_name  
    });

    const handleSaveChanges = (role) => {        
    
        axios.put(`http://localhost:5000/api/admin/category/updatecategory/${formData.Pcategory_id}`, formData)
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
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-5'>
                        <TextField
                        disabled
                            id="standard-basic"
                            label="Product ID"
                            variant="standard"
                            name="Pcategory_id"
                            value={formData.Pcategory_id}
                            onChange={handleInputChange}
                        />
                    </div> <br /> <br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Product Name"
                            variant="standard"
                            name="category_name"
                            value={formData.category_name}
                            onChange={handleInputChange}
                        />
                    </div><br />
                    
                    {/* <input type="text" value={role.role_name} onChange={(e) => handleInputChange(e)} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChanges(product)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}
