import React, {useState} from 'react'

import Grid from '@mui/material/Unstable_Grid2';
import { Paper, styled, TextField, Box, Button } from '@mui/material'

import RoleTable from './RoleTable';
import { Form } from 'react-router-dom';
import axios from 'axios';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const initialState={
    role_id:"",
    role_name:""
}

function AdminRolePage() {
    const [data, setData] = useState(initialState);
    const {  role_id, role_name } = data
    const [Message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/roles/newrole', {
                role_id,
                role_name

            });
            console.log('User registered successfully');
        } catch (error) {
            setMessage('Invalid credentials');
            console.error('Error registering user: ', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
       
           <Box sx={{ flexGrow: 1 }} className='m-5 p-5'>
                <Grid container spacing={4}>
                    <Grid item xs={6}  md={4}>                    
                        <Item style={{border:"2px solid #311b92", boxShadow:"1px 1px 10px 0px ", height: "370px" }}>
                            <h2 className='mt-4' style={{ color: "Black" }}>Add New Role</h2>
                            <div className='mt-4'>
                                <TextField

                                    id="standard-basic"
                                    label="Role ID"
                                    variant="standard"
                                    name="role_id"
                                    value={role_id} 
                                    onChange={handleInputChange}
                                />
                            </div> <br /> <br />
                            <div>
                                <TextField

                                    id="standard-basic"
                                    label="Role Name"
                                    variant="standard"
                                    name="role_name"
                                    value={role_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='mt-5'>
                                <Button  color='primary' style={{ color:"Black"}} onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Item style={{border: '2px solid #311b92', boxShadow:"1px 1px 10px 0px "}}>
                            <RoleTable />
                        </Item>
                    </Grid>
                </Grid>
                </Box>
                
        
    )
}

export default AdminRolePage