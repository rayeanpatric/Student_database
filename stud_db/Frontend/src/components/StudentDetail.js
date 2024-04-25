import React from 'react';
import { Drawer, Typography, List, ListItem, ListItemText } from '@mui/material';

const StudentDetail = ({ student, onClose }) => {
  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <div style={{ width: '300px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Student Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="S No" secondary={student.s_no} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Register No" secondary={student.reg_no} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Name" secondary={student.name} />
          </ListItem>
          {/* Add more details here as needed */}
        </List>
      </div>
    </Drawer>
  );
};

export default StudentDetail;
