import axios from 'axios';
import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';

export default function UpdateRole({ show, handleClose, role }) {
    const [formData, setFormData] = useState({
        role_id: role.role_id,
        role_name: role.role_name
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-5'>
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
                    <div>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChanges(role)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}