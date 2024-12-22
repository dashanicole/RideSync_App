import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ITEM_HEIGHT = 20;

export default function Components({ anchorEl, setAnchorEl, options }) {

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '15ch',
                            borderRadius: '8px',  // Rounded corners for the paper
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                            backgroundColor: '#ffffff', // Clean background color
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        color: '#333',  // Text color
                        fontWeight: '500',  // Bold text for the first option
                        padding: '8px 16px',  // Padding for a more comfortable click area
                        transition: 'background-color 0.3s',  // Smooth hover transition
                        '&:hover': {
                            backgroundColor: '#f4f4f4',  // Light background on hover
                            color: '#1a73e8',  // Color change on hover (blue)
                        },
                        '&:focus': {
                            backgroundColor: '#e3f2fd',  // Focus state background color
                        },
                    }}
                >
                    {options[0]}
                </MenuItem>
            </Menu>

        </div>
    );
}
