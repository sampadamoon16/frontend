import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';
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

export default function ViewUser({ uid, open, handleClose }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/viewuser/${uid}`);
        console.log(uid)
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);
  console.log(uid,'hello')

  // useEffect(() => {    
  //   if (userData) {
  //     console.log(userData);
  //   }
  // }, [userData]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{color:"#1a237e"}}>View User Data</DialogTitle>
        <DialogContent>
          {userData ? (
            <div >
              
              <li><strong style={{ color: "darkblue" }}>Reg. No.:</strong> {userData.uid}</li>
              <li><strong style={{ color: "darkblue" }}> Name: &nbsp; </strong>  {userData.name}</li>
              <li><strong style={{ color: "darkblue" }}>DOB:  &nbsp;</strong> {userData.dob}</li>
              <li><strong style={{ color: "darkblue" }}>Email: &nbsp; </strong> {userData.email}</li>
              <li><strong style={{ color: "darkblue" }}>Password: &nbsp; </strong> {userData.password}</li>
              <li><strong style={{ color: "darkblue" }}>Mobile: &nbsp;  </strong> {userData.mobile}</li>
              <li><strong style={{ color: "darkblue" }}>Aadhar: &nbsp;  </strong> {userData.aadhar}</li>
              <li><strong style={{ color: "darkblue" }}>DOJ:  &nbsp;   </strong> {userData.doj}</li>
              <li><strong style={{ color: "darkblue" }}>Qualification: &nbsp;  </strong> {userData.qualification}</li>
              <li><strong style={{ color: "darkblue" }}>Address: &nbsp;  </strong> {userData.address}</li>
              <li><strong style={{ color: "darkblue" }}>State: &nbsp;  </strong> {userData.state}</li>
              <li><strong style={{ color: "darkblue" }}>City:  &nbsp;  </strong> {userData.city}</li>
              <li><strong style={{ color: "darkblue" }}>Pin: &nbsp;  </strong> {userData.pin}</li>
              <li><strong style={{ color: "darkblue" }}>Status: &nbsp;</strong> {userData.status}</li>
                            
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
