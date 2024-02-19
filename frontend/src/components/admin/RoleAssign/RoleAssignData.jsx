import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { MenuItem, Select, InputLabel, FormControl, Input } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from 'axios';

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

export default function RoleAssignData({ uuid }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //     ///////////  Get role name in input field   ////////////


    const [roleOptions, setRoleOptions] = useState([]);
    const getApiData = async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/roles/newroles`);
        await setRoleOptions(res.data);
    };
    useEffect(() => {
        getApiData();
    }, []);


    //---------------------------------------------------------  post Role  -------------------------------------
    // const [localUid, setLocalUid] = useState("");

    const [uid, setUid] = useState("")
    const [role_id, setRoleid] = useState("")


    const handleSaveChanges = async () => {
        let newData = {
            "uid": uuid,
            "role_id": role_id
        }
        const resp = await axios.post(`http://localhost:5000/api/admin/roleassign/grantrole`, newData);
        handleClose();
    };


    return (
        <div>
            <Button color="secondary" aria-label="edit" size='small'
                onClick={handleOpen}>
                Assign Role
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <FormControl fullWidth disabled>
                            <InputLabel > User ID</InputLabel>
                            <Input

                                label='UID'
                                id="uid"
                                name="uid"
                                value={uuid}
                                onChange={(e) => setUid(e.target.value)}
                            />
                        </FormControl><br /> <br />

                        <FormControl fullWidth>
                            <InputLabel id="role-select-label">Role Name</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={role_id}
                                label="Role"
                                onChange={(e) => setRoleid(e.target.value)}
                            >
                                {roleOptions.map((row, index) => {
                                    return <MenuItem key={index} value={row.role_id}>{row.role_name}</MenuItem>
                                }
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <div className='mt-3 d-flex justify-content-between rounded-0'>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleSaveChanges}>Save</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}