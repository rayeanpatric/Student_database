import React, { useEffect } from 'react';
import profile from './Profile.png'
import './Profile.css'
import axios from 'axios';
import CustomAppBar from './CustomAppBar.js';

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
            <CustomAppBar email={data?.email} />
            
            
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