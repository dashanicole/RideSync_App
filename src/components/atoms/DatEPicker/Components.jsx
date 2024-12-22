import * as React from 'react';
import dayjs from 'dayjs'; // Import dayjs
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
 
export default function CustomDatePicker({
    label = 'Select Date & Time',
    value,
    onChange,
    minDate = null,
    maxDate = null,
    sx = {},
    size = 'small',
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label={label}
                value={value ? dayjs(value) : null} // Ensure the value is a dayjs object
                onChange={(newValue) => onChange(newValue ? dayjs(newValue) : null)} // Convert the new value to dayjs
                minDate={minDate ? dayjs(minDate) : null} // Ensure minDate is a dayjs object
                maxDate={maxDate ? dayjs(maxDate) : null} // Ensure maxDate is a dayjs object
                textField={{
                    // Directly pass the TextField props via the textField component slot
                    fullWidth: true,
                    variant: 'outlined',
                    size: size,
                    sx: sx, // Allow custom styling via sx prop
                }}
            />
        </LocalizationProvider>
    );
}
