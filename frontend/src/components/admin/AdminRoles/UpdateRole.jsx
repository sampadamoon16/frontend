import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function UpdateRole({ show, handleClose, role }) {

    const [formData, setFormData] = useState({
        role_id: role.role_id,
        role_name: role.role_name,        

    });


    const handleSaveChanges = (role) => {        
    
        axios.patch(`http://localhost:5000/api/admin/roles/updaterole/${formData.role_id}`, formData)
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
            <Modal show={show} onHide={handleClose} className='rounded-5'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{border:"1px solid black", boxShadow: "1px 1px 10px 0px "}}  className='ms-3 me-3 rounded-3'>
                    <div className='mt-4 ms-5'  >
                        <TextField
                        disabled
                            id="standard-basic"
                            label="Role ID"
                            variant="standard"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleInputChange}
                        />
                    </div> <br /> <br />
                    <div className='ms-5'>
                        <TextField
                            id="standard-basic"
                            label="Role Name"
                            variant="standard"
                            name="role_name"
                            value={formData.role_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    {/* <input type="text" value={role.role_name} onChange={(e) => handleInputChange(e)} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='rounded-3'>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} className='rounded-3'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}