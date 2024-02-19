import React from 'react'
import { Form, Row, Button, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { State, City } from 'country-state-city'

const initialState = {
    uid: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    photo: "",
    aadhar: "",
    doj: "",
    qualification: "",
    dob: "",
    address: "",
    state: "",
    city: "",
    pin: "",
    status: ""
}


function AddNewUser() {

    const [data, setData] = useState(initialState);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("uid", data.uid);
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("mobile", data.mobile);
        formdata.append("photo", data.photo);
        formdata.append("aadhar", data.aadhar);
        formdata.append("doj", data.doj);
        formdata.append("qualification", data.qualification);
        formdata.append("dob", data.dob);
        formdata.append("address", data.address);
        formdata.append("state", data.state);
        formdata.append("city", data.city);
        formdata.append("pin", data.pin);
        formdata.append("status", data.status);

        try {
            await axios.post('http://localhost:5000/api/admin/registeruser', formdata);
            console.log('User registered successfully');
        } catch (error) {
            setMessage('Invalid credentials');
            console.error('Error registering user: ', error);
        }
    };


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // }
    // ---------------------------------------------------   State city country   ---------------------------------------------------------------

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const getAllStates = async () => {
            try {
                const states = await State.getStatesOfCountry('IN'); // 'IN' is the country code for India
                setStates(states);
            } catch (err) {
                console.log(err);
            }
        };

        getAllStates();
    }, []);

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setData({ ...data, state: selectedState });

        if (selectedState) {
            const countryCode = 'IN';
            try {
                const stateCities = City.getCitiesOfState(countryCode, selectedState);
                setCities(stateCities);
            } catch (err) {
                console.log(err);
            }
        } else {

            setCities([]);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center' >
                <div className='bg-white  rounded w-100' style={{ marginLeft: '100px' }} >
                    <h2 className='d-flex justify-content-center mb-4'>Add New User Details</h2>
                    <div style={{ border: "1px solid black", boxShadow: "1px 1px 10px 0px " }} className='rounded-2' >
                        <Form onSubmit={handleSubmit} className='m-3'>

                            <Row className="mb-3 ">
                                <Form.Group as={Col} controlId="formGridID" className='me-5'>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="id" name="uid" placeholder="Enter Your ID"
                                        onChange={e => setData({ ...data, uid: e.target.value })} />
                                </Form.Group>
                                {/* </Row>
                        <Row className='mb-2'> */}
                                <Form.Group as={Col} controlId="formGridName" className='me-5'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" name="name" placeholder="Enter Your Name"
                                        onChange={e => setData({ ...data, name: e.target.value })} />
                                </Form.Group>
                                {/* </Row>
                        <Row className='mb-2'> */}
                                <Form.Group as={Col} controlId="formGridDOb" className='me-5'>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Enter your Birth Date Here"
                                        onChange={e => setData({ ...data, dob: e.target.value })} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAadhar">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="mail" name="email" placeholder="Enter Your Email"
                                        onChange={e => setData({ ...data, email: e.target.value })} />
                                </Form.Group>
                            </Row>
                            <Row className='mb-2'>
                                <Form.Group as={Col} controlId="formGridNumber">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Enter Mobile Password"
                                        onChange={e => setData({ ...data, password: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-2'>
                                <Form.Group as={Col} controlId="formGridPhoto">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="mobile" name="mobile" placeholder="Enter Your Number"
                                        onChange={e => setData({ ...data, mobile: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        please provide valid mobile number
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* </Row> 
                        <Row className='mb-2'> */}
                                {/* </Row>
                        <Row className="mb-2"> */}
                                <Form.Group as={Col} controlId="formGridAadhar">
                                    <Form.Label>Aadhar</Form.Label>
                                    <Form.Control type="Aadhar" name="aadhar" placeholder="Enter aadhar ID"
                                        onChange={e => setData({ ...data, aadhar: e.target.value })} />
                                </Form.Group>
                            </Row>

                            <Row className='mb-2'>
                                <Form.Group as={Col} controlId="formGridDoj">
                                    <Form.Label>Date of Joining</Form.Label>
                                    <Form.Control type="date" name="doj" placeholder="Joining Date"
                                        onChange={e => setData({ ...data, doj: e.target.value })} />
                                </Form.Group>
                                {/* </Row>
                        <Row className="mb-2"> */}
                                <Form.Group as={Col} controlId="formGridQualification">
                                    <Form.Label>Qualification</Form.Label>
                                    <Form.Control type="qualification" name="qualification" placeholder="Education Details"
                                        onChange={e => setData({ ...data, qualification: e.target.value })} />
                                </Form.Group>
                                {/* </Row>
                        <Row className='mb-2'> */}
                            </Row>
                            <Row className="mb-2">
                                <Form.Group controlId="formGridAddress">
                                    <Form.Label> Address </Form.Label>
                                    <Form.Control placeholder="Apartment, studio, or floor" name="address"
                                        onChange={e => setData({ ...data, address: e.target.value })} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    {/* <Form.Control name="state"
                                        onChange={e => setData({ ...data, state: e.target.value })} /> */}
                                    <select
                                        className="form-select"
                                        id="inputState"
                                        value={data.state}
                                        onChange={handleStateChange}
                                    >
                                        <option value="">Select state</option>
                                        {states.map((item, index) => (
                                            <option key={index} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                                {/* </Row>
                        <Row className="mb-2"> */}
                                <Form.Group as={Col} controlId="formGridcity">
                                    <Form.Label>City</Form.Label>
                                    {/* <Form.Control placeholder="Enter Your City Name" name="city"
                                        onChange={e => setData({ ...data, city: e.target.value })}
                                         /> */}

                                    <select
                                        className="form-select"
                                        id="inputCity"
                                        value={data.city}
                                        onChange={(e) => setData({ ...data, city: e.target.value })}
                                    >
                                        <option value="">Select city</option>
                                        {cities.map((item, index) => (
                                            <option key={index} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPin">
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control name="pin"
                                        onChange={e => setData({ ...data, pin: e.target.value })} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formFileMultiple" >
                                    <Form.Label>Upload Images</Form.Label>
                                    <Form.Control type="file" name="photo" multiple
                                        onChange={e => setData({ ...data, photo: e.target.files[0] })} />
                                </Form.Group>
                                {/* </Row>
                        <Row className="mb-2"> */}
                                {/* <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Status</Form.Label>
                                <Form.Select defaultValue="Choose..." name="status"
                                    onChange={e => setData({ ...data, status: e.target.value })}>
                                    <option>Active</option>
                                    <option>Deactive</option>
                                </Form.Select>
                            </Form.Group> */}
                            </Row>
                            <div className='d-flex justify-content-between mt-3'>
                                <Button className='btn btn-info' variant="primary" type="submit" onClick={handleSubmit} >
                                    Submit
                                </Button>

                                <Link to="/user-admin" className='btn btn-secondary' variant="primary" type="submit">
                                    Close
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AddNewUser