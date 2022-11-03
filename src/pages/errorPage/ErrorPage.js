import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import Layout from '../../layout/Layout'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <Layout>
            <Typography variant="h2" component="h6" color="error" mb={5}>
                Upss, it seems you've got lost!
            </Typography>
            <Button variant="outlined" size="large" color="error" onClick={() => navigate('/')}>
                Return
            </Button>
        </Layout>
    )
}

export default ErrorPage
