import axios from 'axios';
import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';

export default function UpdateSubCategory({ show, handleClose, SubCategory }) {
    const [updatecat, setUpdatecat] = useState({
        c_id: SubCategory.c_id,
        subCategory_id: SubCategory.subCategory_id,
        subCategory_name: SubCategory.subCategory_name,
        photo: SubCategory.photo
    });

    const handleSaveChanges = (role) => {

        const formdata = new FormData();
        formdata.append("c_id", updatecat.c_id);
        formdata.append("subCategory_id", updatecat.subCategory_id);
        formdata.append("subCategory_name", updatecat.subCategory_name);
        formdata.append("photo", updatecat.photo);





        axios.patch(`http://localhost:5000/api/admin/subCategory/updateSubcat/${updatecat.subCategory_id}`, formdata)
            .then(response => {
                console.log('Product updated successfully');
                handleClose();
            })
            .catch(error => {
                console.error('Error updating Product:', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            // If the input type is file, set the value to the first selected file
            setUpdatecat(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            // If it's not a file input, update the value as usual
            setUpdatecat(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Sub Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-5'>
                        <TextField
                            disabled
                            id="standard-basic"
                            label="Category ID"
                            variant="standard"
                            name="c_id"
                            value={updatecat.c_id || ``}
                            onChange={handleInputChange}
                        />
                    </div> <br /> <br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Sub category ID"
                            variant="standard"
                            name="subCategory_id"
                            value={updatecat.subCategory_id}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Category Name"
                            variant="standard"
                            name="subCategory_name"
                            value={updatecat.subCategory_name}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Image"
                            variant="standard"
                            type='file'
                            name="photo"
                            // value={updatecat.photo}
                            onChange={handleInputChange}
                        />
                    </div><br /><br />

                    {/* <input type="text" value={role.role_name} onChange={(e) => handleInputChange(e)} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChanges(SubCategory)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
