import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Layout = ({ children }) => {
    return (
        <Box>
            <Typography variant="h3" component="h1" my={5}>
                Dashboard
            </Typography>
            {children}
        </Box>
    )
}

export default Layout
