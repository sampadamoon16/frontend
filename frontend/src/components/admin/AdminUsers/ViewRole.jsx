import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
} from '@mui/material';
import axios from 'axios';

function ViewRole({ uid, open, handleClose }) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/roleassign/checkrole/${uid}`);
                console.log(uid)
                console.log(response.data)
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (uid) {
            fetchUserData();
        }
    }, [uid]);

    const handleDeleteRole = async (uid, role_id) => {
        try {
            // Send a request to delete the role with roleId for the user with uid
            await axios.delete(`http://localhost:5000/api/admin/roleassign/revokerole/${uid}/${role_id}`);
            // After successful deletion, update the user data
            setUserData(prevData => prevData.filter(role => role.uid !== role_id));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ color: "#1a237e" }}>View Assign Role</DialogTitle>
                <DialogContent>
                    {userData ? (
                        <div>
                            {userData.map((role, index) => (
                                <div key={index}>
                                    <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>
                                        Role Assign: {role.role_name}
                                    </Typography>
                                    <Button variant="secondary" aria-label='delete' onClick={() => handleDeleteRole(uid, role.role_id)}>
                                        <DeleteIcon />
                                    </Button>
                                </div>

                            ))}
                        </div>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}


                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewRole