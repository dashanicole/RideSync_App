import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CustomSelect({
    label,
    options = [],
    value ='',
    onChange,
    placeholder = 'Select an option',
    size = 'small',
    sx = {} // Allow sx to be customized
}) {
    const defaultSx = { m: 1, minWidth: 120 };
    const mergedSx = { ...defaultSx, ...sx }; // Merge default and custom styles

    return (
        <FormControl sx={mergedSx} size={size}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={`${label}-select`}
                value={value}
                label={label}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}




// usage

{/* <CustomSelect
    label="Age"
    value={age}
    onChange={handleChange}
    options={[
        { value: 10, label: 'Ten' },
        { value: 20, label: 'Twenty' },
        { value: 30, label: 'Thirty' },
    ]}
    sx={{ minWidth: 200, backgroundColor: 'lightgray' }} // Custom sx styles
/> */}