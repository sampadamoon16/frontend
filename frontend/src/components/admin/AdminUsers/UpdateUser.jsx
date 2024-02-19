import axios from 'axios';
import React, { useState } from 'react'
import { TextField, Box } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';

export default function UpdateUser({ show, handleClose, user }, props) {
    const [update, setUpdate] = useState({
        uid: user.uid,
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
        photo: user.photo,
        aadhar: user.aadhar,
        doj: user.doj,
        qualification: user.qualification,
        dob: user.dob,
        address: user.address,
        state: user.state,
        city: user.city,
        pin: user.pin,
        status: user.status
    });


    const handleSaveChanges = (e) => {

        const formdata = new FormData();
        formdata.append("uid", update.uid);
        formdata.append("name", update.name);
        formdata.append("email", update.email);
        formdata.append("password", update.password);
        formdata.append("mobile", update.mobile);
        formdata.append("photo", update.photo);
        formdata.append("aadhar", update.aadhar);
        formdata.append("doj", update.doj);
        formdata.append("qualification", update.qualification);
        formdata.append("dob", update.dob);
        formdata.append("address", update.address);
        formdata.append("state", update.state);
        formdata.append("city", update.city);
        formdata.append("pin", update.pin);
        formdata.append("status", update.status);

        axios.patch(`http://localhost:5000/api/admin/userupdate/${update.uid}`, formdata)
            .then(response => {
                console.log('User updated successfully');
                handleClose();
            })
            .catch(error => {
                console.error('Error updating User:', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            // If the input type is file, set the value to the first selected file
            setUpdate(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            // If it's not a file input, update the value as usual
            setUpdate(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"

            >
                <Modal show={show} onHide={handleClose}
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title >Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ border: "1px solid black", boxShadow: "1px 1px 10px 0px " }} className='ms-3 me-3 rounded-2'>
                        <div className='mt-4'>
                            <TextField
                                disabled
                                id="standard-basic"
                                label="Role ID"
                                variant="standard"
                                name="uid"
                                sx={{ marginRight: 5 }}
                                value={update.uid}
                                onChange={handleInputChange}

                            />
                            {/* </div> <br /> 
                    <div> */}
                            <TextField
                                disabled
                                id="standard-basic"
                                label="User Name"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="name"
                                value={update.name}
                                onChange={handleInputChange}

                            />

                            <TextField
                                required
                                id="standard-basic"
                                label="Date of Birth"
                                variant="standard"
                                name="dob"
                                value={update.dob}
                                type='date'
                                onChange={handleInputChange}
                            // onChange={e => setFormData({ ...formData, dob: e.target.value })}
                            /> &nbsp; &nbsp;
                        </div><br />
                        <div>
                            <TextField
                                id="standard-basic"
                                label="Update Email"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="email"
                                value={update.email}
                                onChange={handleInputChange}


                            />
                            {/* </div><br />
                        <div> */}
                            {/* <TextField
                                id="standard-basic"
                                label="Update Password"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="password"
                                value={update.password}
                                onChange={handleInputChange}

                            /> */}
                            {/* </div><br />
                    <div> */}
                            <TextField
                                required
                                id="standard-basic"
                                label="Update Mobile"
                                variant="standard"
                                name="mobile"
                                value={update.mobile}
                                onChange={handleInputChange}

                            />
                        </div><br />
                        <div>
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Upload Image"
                                variant="standard"
                                type="file"
                                className="form-control-file"
                                name="photo"
                                onChange={e => handleInputChange(e)}
                            />
                        </div><br />
                        <div>
                            <TextField
                                id="standard-basic"
                                label="Aadhar"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="aadhar"
                                value={update.aadhar}
                                onChange={handleInputChange}

                            />
                            {/* </div><br />
                    <div> */}
                            <TextField
                                id="standard-basic"
                                label="Date of Join"
                                // type='date'
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="doj"
                                value={update.doj}
                                type='date'
                                onChange={handleInputChange}
                            // onChange={e => setFormData({ ...formData, doj: e.target.value })}
                            />
                            {/* </div><br />
                        <div> */}
                            <TextField
                                id="standard-basic"
                                label="Qualification"
                                variant="standard"
                                name="qualification"
                                value={update.qualification}
                                onChange={handleInputChange}

                            />
                            {/* </div><br />
                    <div> */}

                        </div><br />

                        <div>
                            <TextField
                                id="standard-basic"
                                label="Address"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="address"
                                value={update.address}
                                onChange={handleInputChange}

                            />
                            {/* </div><br />
                    <div> */}
                            <TextField
                                id="standard-basic"
                                label="State"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="state"
                                value={update.state}
                                onChange={handleInputChange}

                            />
                            {/* </div><br />
                        <div> */}
                            <TextField
                                id="standard-basic"
                                label="City"
                                variant="standard"
                                name="city"
                                value={update.city}
                                onChange={handleInputChange}

                            /> &nbsp; &nbsp; &nbsp;
                        </div><br />
                        <div>
                            <TextField
                                id="standard-basic"
                                label="Pincode"
                                variant="standard"
                                sx={{ marginRight: 5 }}
                                name="pin"
                                value={update.pin}
                                onChange={handleInputChange}

                            />
                        </div>
                        {/* <div>
                            <TextField
                                required
                                id="standard-basic"
                                label="Update Status"
                                variant="standard"
                                name="status"
                                value={update.status}
                                onChange={handleInputChange}

                            />
                        </div><br /> */}
                        {/* <input type="text" value={role.role_name} onChange={(e) => handleInputChange(e)} /> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSaveChanges(user)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Box>
        </div>
    )
}