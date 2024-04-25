import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CustomAppBar from './CustomAppBar.js';
import './evarsity.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import { getAuth, signOut } from 'firebase/auth';

function Evarsity() {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  useEffect(() => {
    const auth = getAuth();
    const handleNavigation = async () => {
      await signOut(auth);
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('beforeunload', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('beforeunload', handleNavigation);
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/second')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilter = (filterOption) => {
    console.log('Filter option:', filterOption);
    // Filter data based on filterOption
    let filtered;
    if (filterOption === 'Hostellers') {
      filtered = data.filter(row => row.stu_type === 'H');
    } else if (filterOption === 'Day Scholars') {
      filtered = data.filter(row => row.stu_type === 'D');
    } else {
      // If 'All' button is clicked, show all data
      filtered = data;
    }
    console.log('Filtered data:', filtered);
    setFilteredData(filtered);
  };
 
  const handleDownload = () => {
    // Create PDF document
    const doc = new jsPDF();
    doc.text('Second Year AIML ', 10, 10);
    doc.autoTable({ html: '.data-table'});
  
    // Save PDF
    doc.save('table_data.pdf');
  };
  
  return (
      <div>
      <CustomAppBar email={data?.email} />
      <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <Button variant="contained" onClick={() => handleFilter('Hostellers')} sx={{ marginRight: '10px' }}>Hostellers</Button>
            <Button variant="contained" onClick={() => handleFilter('Day Scholars')} sx={{ marginRight: '10px' }}>Day Scholars</Button>
            <Button variant="contained" onClick={() => handleFilter('All')} sx={{ marginRight: '10px' }}>All</Button>
            <Button variant="contained" onClick={handleDownload} sx={{ marginRight: '40px' }}>Download</Button>
      </Box> 
      </div>
      <div style={{padding:'30px'}}>
      <div className="data-table-container"> {/* Add data-table-container class */}
      <h2>Second Year AIML</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Register No</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map(row => (
            <tr key={row.id}>
              <td>{row.s_no}</td>
              <td>{row.reg_no}</td>
              <td>{row.name}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}

export default Evarsity;
