import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountMenu from './AccountMenu'; // Import your AccountMenu component
import logo from './logo.png'
import profile from './Profile.png'
import './Profile.css'
import axios from 'axios';

const Profile = () => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/user')
          .then(response => {
            setData(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
     // Define the 'data' variable
    return (
        <div>
            <AppBar position="fixed" >
                <Toolbar sx={{ bgcolor:'#e2e2e2'}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img src={logo} alt="Logo" style={{ height: '50px', position: 'relative',margin:'8px' }} /> 
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <AccountMenu email={data?.email ?? ''} />
                    </Box>
                </Toolbar>
            </AppBar>
            <div style={{ marginTop: '130px' }}></div>
            
                <div className="gm-container">
                <div className="header-container">
                    <h2>Profile</h2>
                </div>
                <div className="profile-container">
                  <div className="image-container">
                    <img src={profile} alt="Profile Pic" />
                  </div>
                  <div className="user-data-container">
                    {data.map((item, index) => (
                      <div key={index}>
                        <p>Name: {item.uname}</p>
                        <p>Email: {item.email}</p>
                        <p>Faculty id: {item.fac_id}</p>
                        <p>Designation: {item.des}</p>
                        <p>Degree Code: {item.degree_id}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
        </div>
    );
    }
export default Profile;