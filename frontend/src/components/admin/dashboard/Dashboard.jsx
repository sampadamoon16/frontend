import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import Chart from 'chart.js/auto';
import {Table} from 'react-bootstrap';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function Dashboard() {

  //   --------------------------------------Chat ----------------------------------------------------
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(71, 225, 167, 0.5)',
        pointHoverBorderColor: 'rgb(71, 225, 167)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  useEffect(() => {
    setInterval(function () {
      var oldDataSet = data.datasets[0];
      var newData = [];

      for (var x = 0; x < data.labels.length; x++) {
        newData.push(Math.floor(Math.random() * 100));
      }

      var newDataSet = {
        ...oldDataSet,
      };

      newDataSet.data = newData;

      var newState = {
        ...data,
        datasets: [newDataSet],
      };

      setData(newState);
    }, 5000);
  }, []);

  return (
    <>
      <Box style={{ backgroundColor: '' }} sx={{height: '75%'}} >
        <Grid container spacing={2} >
          <Grid xs={12} md={12}  >
            {/* <Item  className='mt-3'> */}
            <div class="container mt-4">
              <div class="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                <div class="col">
                  <div class="border bg-primary">
                    <li class="list-group-item pt-3 ms-3">Total Users</li>
                    <hr />
                    <li class="list-group-item pb-3 ms-3">500</li>
                  </div>
                </div>
                <div class="col">
                  <div class="border bg-warning">
                    <li class="list-group-item pt-3 ms-3">Total Shops</li>
                    <hr />
                    <li class="list-group-item pb-3 ms-3">250</li>
                  </div>
                </div>
                <div class="col">
                  <div class=" border bg-success">
                    <li class="list-group-item pt-3 ms-3">Toatal Revenue</li>
                    <hr />
                    <li class="list-group-item pb-3 ms-3">800</li>
                  </div>
                </div>
                <div class="col">
                  <div class="border bg-danger">
                    <li class="list-group-item pt-3 ms-3">Total Employees</li>
                    <hr />
                    <li class="list-group-item pb-3 ms-3">5000</li>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          {/* -------------------------------------------------------  Chart  -------------------------------------------------------------------------------- */}
          <Grid xs={6} md={4} >
            <Item className='mt-5 ms-3'>
              <CDBContainer>
                <h3 className="mt-5">Dynamicly Refreshed Line chart</h3>
                <Line data={data} options={{ responsive: true }} />
              </CDBContainer>
            </Item>
          </Grid>


          {/* ------------------------------------------------------  Table   --------------------------------------------------------------------------------- */}
          <Grid xs={6} md={8}>
            <Item className='mt-5' >
              <div >
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th >Name</th>
                      <th >Position</th>
                      <th >Office</th>
                      {/* <th scope="col">Age</th> */}
                      {/* <th scope="col">Start date</th> */}
                      <th >Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Airi Satou</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      {/* <td>33</td> */}
                      {/* <td>2008/11/28</td> */}
                      <td>$162,700</td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Angelica</td>
                      <td>CEO</td>
                      <td>London</td>
                      {/* <td>47</td> */}
                      {/* <td>2009/10/09</td> */}
                      <td>$1,200,00</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Ashton Cox</td>
                      <td>HR</td>
                      <td>San Francisco</td>
                      {/* <td>66</td> */}
                      {/* <td>2009/01/12</td> */}
                      <td>$86,000</td>
                    </tr>
                    <tr>
                      <th>4</th>
                      <td>Jacky</td>
                      <td>Manager</td>
                      <td>Europe</td>
                      {/* <td>66</td> */}
                      {/* <td>2009/01/12</td> */}
                      <td>$80,000</td>
                    </tr>
                    <tr>
                      <th>5</th>
                      <td>Raaj</td>
                      <td>Accountant</td>
                      <td>India</td>
                      {/* <td>66</td> */}
                      {/* <td>2009/01/12</td> */}
                      <td>$90,000</td>
                    </tr>
                    <tr>
                      <th>6</th>
                      <td>Joy</td>
                      <td>HR</td>
                      <td>USA</td>
                      {/* <td>66</td> */}
                      {/* <td>2009/01/12</td> */}
                      <td>$86,000</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Dashboard