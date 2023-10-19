// import React, { useState, useEffect } from 'react'
// import Grid from '@mui/material/Unstable_Grid2';
// import { FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material'
// import { Button, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import RoleAssignTable from './RoleAssignTable';
// import RoleCheck from './RoleCheck';
// import { Dialog, DialogTitle, DialogContent } from '@mui/material';


// export default function RoleAssignData({ open, handleClose, roleassign ,uid1}) {
//     console.log(uid1,'aaaaaaaaaaaaaaaaaaaaaaaaa')


//     const [roleOptions, setRoleOptions] = useState([]);
//     console.log(roleOptions);


//     // const [formData, setFormData] = useState({
//     //     uid: "",
//     //     role_id: "",
//     //     assignedon: ""
//     // });

// // /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // const[data,setData]=useState([])
// // const loadData = async () => {
// //         const response = await axios.get("http://localhost:5000/api/admin/userlist")
// //         setData(response.data)
// //     };
// //     useEffect(() => {
// //         loadData();
// //     }, []);





// // //////////////////////////////////////////////////////////////////////////
//     ///////////  Get role name in input field   ////////////


//     const getApiData = async () => {
//       const res = await axios.get(`http://localhost:5000/api/admin/roles/newroles`);

//       await setRoleOptions(res.data);
//       console.log("first", res);
//     };
//     useEffect(() => {
//       getApiData();
//     }, []);

//   console.log(roleOptions.role_id)
//   console.log(roleOptions)


// //   ------------------------post role assign ----------------------

//    const [uid, setUid] = useState("")
//    const [role_id, setRoleid] = useState("")

//   const handleSaveChanges = async () => {
//     let newData ={
//         "id": uid,
//         "role_id": role_id
//     }  


//         console.log("assign role")
//         const resp = await axios.post(`http://localhost:5000/api/admin/roleassign/grantrole`, newData);
//         console.log("assign role done")
//         console.log("hello",newData);
//         console.log("hiiiii",resp.data.affectedRows)
//         handleClose();    
// };
// console.log("post role")

//     // useEffect(()=>{
//     //     handleSaveChanges();
//     // }, [])


//     // const handleInputChange = (e) => {
//     //     const { name, value } = e.target;
//     //     newData(prevState => ({
//     //         ...prevState,
//     //         [name]: value
//     //     }));
//     // }


//     return (
//         <>  <Button color="secondary" aria-label="edit" size='small'

//     >
//         Assign Role
//     </Button>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Assign Role</DialogTitle>
//                 <DialogContent>
//                     {/* Add your role editing form or content here */}

//                     <FormControl fullWidth disabled>
//                         <InputLabel>User ID</InputLabel>
//                         <Input
//                         label='uid'
//                             id="uid"
//                             name="uid"
//                             value={uid}
//                             onChange={(e) => setUid(e.target.value)}
//                         />
//                     </FormControl><br />

//                     <FormControl fullWidth>
//                         <InputLabel id="role-select-label">Role Name</InputLabel>
//                         <Select
//                             labelId="role-select-label"
//                             id="role-select"
//                             value={role_id}
//                             label="Role"
//                             onChange={(e) => setRoleid(e.target.value)}
//                         >
//                             {roleOptions.map((row, index) => {
//                                 return <MenuItem key={index} value={row.role_id}>{row.role_name}</MenuItem>
//                             }
//                             )}
//                         </Select>
//                     </FormControl>

//                     <div className='mt-3 d-flex justify-content-between rounded-0'>
//                         <Button onClick={handleClose}>Close</Button>
//                         <Button onClick={handleSaveChanges}>Save</Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>

//     )
// };



import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
        console.log("first", res);
    };
    useEffect(() => {
        getApiData();
    }, []);


    //--------------------------------post Role -------------------------------------
    const [localUid, setLocalUid] = useState("");

    const [uid, setUid] = useState("")
    const [role_id, setRoleid] = useState("")


    const handleSaveChanges = async () => {
        let newData = {
            "uid": uuid,
            "role_id": role_id
        }
        console.log("assign role")
        const resp = await axios.post(`http://localhost:5000/api/admin/roleassign/grantrole`, newData);
        console.log("assign role done")
        console.log("hello", newData);
        console.log("hiiiii", resp.data.affectedRows)
        handleClose();
    };
    console.log("post role")

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
                            <InputLabel>User ID</InputLabel>
                            <Input
                                label='uid'
                                id="uid"
                                name="uid"
                                value={uuid}
                                onChange={(e) => setUid(e.target.value)}
                            />
                        </FormControl><br />

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