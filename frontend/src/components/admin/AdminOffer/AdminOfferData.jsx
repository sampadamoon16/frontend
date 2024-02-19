import React from 'react'
import { Grid, styled, Paper, Box, Button, TextField } from '@mui/material'
import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminOfferTable from './AdminOfferTable';
import { MenuItem, Select, InputLabel, FormControl, Input } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const initialState = {
    offer_id: "",
    offer_name: "",
    per_discount: "",
    flat_discount: "",
    upto_discount: "",
    valid_from: "",
    valid_to: "",
    subcategory_id: "",
    T_and_C: "",
    status: ""
}

export default function AdminOfferData() {

    const [data, setData] = useState(initialState);
    const { offer_id, offer_name, per_discount, flat_discount, upto_discount, valid_from, valid_to, subcategory_id, T_and_C, status } = data
    const [Message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/offer/createoffer', {
                offer_id,
                offer_name,
                per_discount,
                flat_discount,
                upto_discount,
                valid_from,
                valid_to,
                subcategory_id,
                T_and_C,
                status

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

//---------------------------------------------------------  Get Subcategory ID   ---------------------------------------------------------

const [roleOptions, setRoleOptions] = useState([]);
    const getApiData = async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/subCategory/viewSubcat`);
        await setRoleOptions(res.data);
        console.log("first", res);
    };
    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className='m-5 p-3 '>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={3}>
                    <Grid item xs={5} >
                        <Item style={{ border: "1px solid #311b92", boxShadow: "1px 1px 10px 0px ", height: "500px" , overflowX: 'auto' }}>
                            <h2 className='mt-2' style={{ color: "Black" }}>Add Offers</h2>
                            <div className='mt-3'>
                                <TextField

                                    id="standard-basic"
                                    label="Offer ID"
                                    variant="standard"
                                    name="offer_id"
                                    value={offer_id}
                                    onChange={handleInputChange}

                                />   &nbsp; &nbsp;&nbsp; &nbsp;

                                <TextField

                                    id="standard-basic"
                                    label="Offer Name"
                                    variant="standard"
                                    name="offer_name"
                                    value={offer_name}
                                    onChange={handleInputChange}

                                /> <br /> <br />

                                <TextField

                                    id="standard-basic"
                                    label="Discount in percentage"
                                    variant="standard"
                                    name="per_discount"
                                    value={per_discount}
                                    onChange={handleInputChange}


                                />  &nbsp; &nbsp;&nbsp; &nbsp;

                                <TextField

                                    id="standard-basic"
                                    label="Flat Discount"
                                    variant="standard"
                                    name="flat_discount"
                                    value={flat_discount} onChange={handleInputChange}

                                /> <br /> <br />

                                <TextField

                                    id="standard-basic"
                                    label="Upto discount"
                                    variant="standard"
                                    name="upto_discount"
                                    value={upto_discount} onChange={handleInputChange}


                                />  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;

                                <TextField
                                    focused
                                    sx={{ minWidth: 180 }}
                                    id="standard-basic"
                                    label="Valid From"
                                    variant="standard"
                                    name="valid_from"
                                    type='date'
                                    value={valid_from} onChange={handleInputChange}

                                /> <br /> <br />

                                <TextField
                                    focused
                                    sx={{ minWidth: 180 }}
                                    id="standard-basic"
                                    label="Valid To"
                                    variant="standard"
                                    name="valid_to"
                                    type='date'
                                    value={valid_to} onChange={handleInputChange}


                                />  &nbsp; &nbsp;&nbsp; &nbsp;

                                {/* <TextField

                                    id="standard-basic"
                                    label="Sub Category ID"
                                    variant="standard"
                                    name="subcategory_id"
                                    value={subcategory_id} onChange={handleInputChange}

                                /> <br /> <br /> */}
                                <FormControl variant="standard" sx={{ minWidth: 180 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Sub Category Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        // value={subCategory_id}
                                        name='subcategory_id'
                                        onChange={handleInputChange}
                                        label="Sub Category ID"
                                    >
                                        {roleOptions.map((row, index) => {
                                    return <MenuItem key={index} value={row.subCategory_id}>{row.subCategory_name}</MenuItem>
                                }
                                )}
                                       
                                    </Select>
                                </FormControl> <br /><br />

                                <TextField

                                    id="standard-basic"
                                    label="Terms And Conditions"
                                    variant="standard"
                                    name="T_and_C"
                                    value={T_and_C} onChange={handleInputChange}

                                />  
                                {/* 
                                <TextField

                                    id="standard-basic"
                                    label="Status"
                                    variant="standard"
                                    name="status"                                    
                                    value={status} onChange={ handleInputChange }
                                    
                                /> */}
                            </div> <br />
                            <div className='mt-3'>
                                <Form onSubmit={handleSubmit}>
                                    <Button color="primary" style={{ color: "Black" }} type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={7} >
                        <Item style={{ border: '1px solid #311b92', boxShadow: "1px 1px 10px 0px " }}>
                            <AdminOfferTable />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
