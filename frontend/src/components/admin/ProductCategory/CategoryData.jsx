import React from 'react'
import { Grid, styled, Paper, Box, Button, TextField } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';
import CategoryTable from './CategoryTable';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const initialState = {
    Pcategory_id: "",
    category_name: ""
}


export default function CategoryData() {
    
    const [data, setData] = useState(initialState);
    const { Pcategory_id, category_name } = data
    const [Message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/category/addcategory', {
                Pcategory_id,
                category_name

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
        <Box sx={{ flexGrow: 1 }} className='m-5, p-5 mt-5'>

                <Grid container spacing={3}>
                    <Grid item xs={6} md={4}>
                        <Item style={{  border: '3px solid #311b92', boxShadow: "1px 1px 10px 0px ", height: "400px" }}>
                            <h2 className='mt-4' style={{ color: "Black" }}>Add New Product</h2>
                            <div className='mt-5'>
                                <TextField

                                    id="standard-basic"
                                    label="Product ID"
                                    variant="standard"
                                    name="Pcategory_id"
                                    value={Pcategory_id}
                                    onChange={handleInputChange}
                                />

                            </div><br /> <br />
                            <div>
                            <TextField

                                    id="standard-basic"
                                    label="Category Name"
                                    variant="standard"
                                    name="category_name"
                                    value={category_name}
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div className='mt-5'>
                                <Button color="primary" style={{ color: "Black" }} onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={8}  md={8}>
                        <Item style={{ border: '3px solid #311b92', boxShadow: "1px 1px 10px 0px " }}>
                            <CategoryTable />
                        </Item>
                    </Grid>
                </Grid>
            
        </Box>
    )
}
