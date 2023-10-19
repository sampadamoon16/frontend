import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios'; 

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
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>ID:  &nbsp; {userData.uid}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Name: &nbsp;   {userData.name}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>DOB:  &nbsp;{userData.dob}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Email: &nbsp;  {userData.email}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Password: &nbsp;  {userData.password}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Mobile: &nbsp; {userData.mobile}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Aadhar: &nbsp;  {userData.aadhar}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>DOJ:  &nbsp; {userData.doj}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Qualification: &nbsp; {userData.qualification}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Address: &nbsp; {userData.address}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>State: &nbsp; {userData.state}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>City:  &nbsp; {userData.city}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Pin: &nbsp;  {userData.pin}</Typography>
              <Typography variant="h6" component="h6" style={{ color: "#7986cb" }}>Status: &nbsp; {userData.status}</Typography>
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
