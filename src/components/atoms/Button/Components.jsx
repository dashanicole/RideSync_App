import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BasicButtons = ({ name, variant, size, onClick, bgColor, fontColor, height, width, borderRadius }) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        sx={{
          backgroundColor: bgColor,
          color: fontColor,
          width: width,
          height: height,
          borderRadius: borderRadius || '4px',
          ':hover': {
            backgroundColor: bgColor,
          },
        }}

      > {name}</Button>
    </Stack>
  );
}

export default BasicButtons;