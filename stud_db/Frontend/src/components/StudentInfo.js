import React, { useState, useEffect } from 'react';
import CustomAppBar from './CustomAppBar';
import { Dialog, DialogTitle, DialogContent, Typography, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import './StudentInfo.css';

const StudentInfo = () => {
  const [option, setOption] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchStudentDetails = (reg_no) => {
    axios.get(`http://localhost:8081/studentDetails/${reg_no}`)
      .then(response => {
        setSelectedStudentDetails(response.data);
        setOpen(true);
        console.log('Student details:', response.data); // Log student details to inspect
      })
      .catch(error => {
        console.error('Error fetching student details:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let url;
    switch (option) {
      case 'option1':
        url = 'http://localhost:8081/first';
        break;
      case 'option2':
        url = 'http://localhost:8081/second';
        break;
      case 'option3':
        url = 'http://localhost:8081/third';
        break;
      default:
        return;
    }

    axios.get(url)
      .then(response => {
        console.log('Response data:', response.data); // Log response data to inspect
        if (response.data.length === 0) {
          setFilteredData('No data found');
        } else {
          setData(response.data);
          let filteredData;
          if (filterOption === "Hostellers") {
            filteredData = response.data.filter(row => row.stu_type === 'H'); // Filter for hostellers
          } else if (filterOption === "Day Scholars") {
            filteredData = response.data.filter(row => row.stu_type === 'D'); // Filter for day scholars
          } else {
            filteredData = response.data;
          }
          console.log('Filtered data:', filteredData); // Log filtered data to inspect
          setFilteredData(filteredData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [option, filterOption]);

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <CustomAppBar />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" style={{ marginRight: '10px' }}>
          Year
        </Typography>
        <Select
          value={option}
          onChange={(event) => setOption(event.target.value)}
          displayEmpty
          style={{ width: '160px', marginRight: '10px' }}
        >
          <MenuItem value="" disabled>
            Select a Year
          </MenuItem>
          <MenuItem value="option1">First</MenuItem>
          <MenuItem value="option2">Second</MenuItem>
          <MenuItem value="option3">Third</MenuItem>
        </Select>
        <Typography variant="h6" style={{ marginRight: '10px' }}>
          Filter
        </Typography>
        <Select
          value={filterOption}
          onChange={(event) => setFilterOption(event.target.value)}
          displayEmpty
          style={{ width: '160px' }}
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value="Hostellers">Hostellers</MenuItem>
          <MenuItem value="Day Scholars">Day Scholars</MenuItem>
        </Select>
      </Box>

      <div style={{ padding: '30px' }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>S No</th>
                <th>Register No</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredData) ? (
                filteredData.map(row => (
                  <tr key={row.id}>
                    <td>{row.s_no}</td>
                    <td>{row.reg_no}</td>
                    <td className="clickable" onClick={() => fetchStudentDetails(row.reg_no)}>{row.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">{filteredData}</td> {/* Show the 'No data found' message in a single row */}
                </tr>
              )}
            </tbody>
          </table>
        {selectedStudentDetails && selectedStudentDetails.length > 0 && (
          <div>
            <Dialog open={open} onClose={handleClose} className="my-dialog">
              <DialogTitle>Student Details</DialogTitle>
              <DialogContent>
                {selectedStudentDetails.map((detail, index) => (
                  <Typography key={index}>
                    Name: {detail.Name}<br />
                    Register No: {detail.reg_no}<br />
                    Blood: {detail.blood}<br />
                    Date of Birth: {detail.DoB}<br />
                    Mail: {detail.mail}<br />
                    Phone: {detail.mob_no}<br />
                  </Typography>
                ))}
              </DialogContent>
            </Dialog>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
