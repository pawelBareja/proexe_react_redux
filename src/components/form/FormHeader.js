import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

const FormHeader = () => {
    return (
        <>
            <Typography variant="h5" component="h2">
                Form
            </Typography>
            <Box py={4}>
                <Divider />
            </Box>
        </>
    )
}

export default FormHeader
