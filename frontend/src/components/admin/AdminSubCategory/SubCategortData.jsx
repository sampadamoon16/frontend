import React from 'react'
import { Grid, styled, Paper, Box, Button, TextField, 
    Select, MenuItem, InputLabel ,
FormControl} from '@mui/material'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap'
import SubCategoryTable from './SubCategoryTable';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



// const initialState = {
//     c_id: "",
//     subCategory_id: "",
//     subCategory_name: "",
//     photo: "",

// }
// console.log(initialState)

export default function SubCategortData() {


    const [data, setData] = useState({
        c_id: "",
        subCategory_id: "",
        subCategory_name: "",
        photo: "",

    });
    // console.log(data)
    // const { c_id, subCategory_id, subCategory_name, photo } = data
    const [Message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("c_id", data.c_id);
        formdata.append("subCategory_id", data.subCategory_id);
        formdata.append("subCategory_name", data.subCategory_name);
        formdata.append("photo", data.photo);
        try {
            console.log(data)
            await axios.post('http://localhost:5000/api/admin/subCategory/addSubcat', formdata)
                .then(result => {
                    console.log(result)
                    // console.log('User registered successfully');
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            setMessage('Invalid credentials');
            console.error('Error registering user: ', error);
        }
    };

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        // setData(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));

    }

// --------------------------------------------------------------   Get product ID ------------------------------------------------------------

    const [roleOptions, setRoleOptions] = useState([]);
    const getApiData = async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/category/viewcategory`);

        await setRoleOptions(res.data);
        console.log("first", res);
    };
    useEffect(() => {
        getApiData();
    }, []);

    return (

        <Box sx={{ flexGrow: 1 }} className='m-5, p-5 mt-5'>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Item style={{ border: '2px solid #311b92', boxShadow: "1px 1px 10px 0px ", height: "515px" }}>
                        <h2 className='mt-4' style={{ color: "#37474f" }}>Add Sub Categories</h2>
                        <div className='mt-4'>

                            <FormControl sx={{
                                 width: '50%', 
                                 margin: '0 auto'
                                }}>
                                <InputLabel >Category Name</InputLabel>
                                <Select
                                     id="standard-basic"
                                     label="category ID"
                                     variant="standard"
                                     name="c_id"
                                     // value={c_id}
                                     onChange={e => setData({ ...data, c_id: e.target.value })}
                                 >
                                     {roleOptions.map((row, index) => {
                                         return <MenuItem key={index} value={row.Pcategory_id}>{row.category_name}</MenuItem>
                                     }
                                     )}
                                </Select>
                            </FormControl>
                        </div><br />
                        <div className='mt-3'>
                            <TextField 
                            
                                id="standard-basic"
                                label="Sub Category Id"
                                variant="standard"
                                name="subCategory_id"
                                // value={subCategory_id} 
                                // onChange={ handleInputChange }
                                onChange={e => setData({ ...data, subCategory_id: e.target.value })}
                            />
                        </div> <br />
                        <div className='mt-3' >
                            <TextField

                                id="standard-basic"
                                label="Sub Category Name"
                                variant="standard"
                                name="subCategory_name"
                                // value={subCategory_name} 
                                // onChange={ handleInputChange }
                                onChange={e => setData({ ...data, subCategory_name: e.target.value })}
                            />
                        </div><br />

                        <div className='p-3'>
                            <TextField

                                id="standard-basic"
                                label="upload Image"
                                variant='standard'
                                type="file"
                                className="form-control-file"
                                name="photo"
                                // onChange={e => setData({ ...data, photo: e.target.value })}
                                onChange={e => setData({ ...data, photo: e.target.files[0] })}

                            />
                        </div>

                        <div className='mt-4'>
                            <Button  color="primary" style={{ color: "#37474f" }} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={8} md={8} >
                    <Item style={{ border: '2px solid #311b92', boxShadow: "1px 1px 10px 0px " }}>
                        <SubCategoryTable />
                    </Item>
                </Grid>
            </Grid>
        </Box>

    )
}
