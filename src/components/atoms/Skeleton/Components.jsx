import React from 'react'
import Skeleton from '@mui/material/Skeleton';


const Components = ({ variant, width, height, animation, raduis }) => {
    return (
        <Skeleton variant={variant} width={width} height={height} animation={animation}
            sx={{ borderRadius: raduis }}
        />

    )
}

export default Components