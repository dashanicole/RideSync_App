import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DemoStat({demographStat,handleDemoStat}) {
  

  return (
    <Box >
      <FormControl fullWidth size='small'>
        <InputLabel id="demo-simple-select-label">Demographic Status*</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
           value={demographStat}
          label="Demographic Status"
          onChange={handleDemoStat}
        >
          <MenuItem value={"Student"}>Student</MenuItem>
          <MenuItem value={"Senior"}>Senior</MenuItem>
          <MenuItem value={"PWD"}>PWD</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}