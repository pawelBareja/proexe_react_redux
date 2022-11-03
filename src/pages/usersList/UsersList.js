import React from 'react'
import Typography from '@mui/material/Typography'
import UsersTable from '../../components/Table'
import Layout from '../../layout/Layout'

const UsersList = ({ users, status }) => {
    if (status === 'loading') {
        return <Typography>loading...</Typography>
    }

    return (
        <Layout>
            <UsersTable users={users} />
        </Layout>
    )
}

export default UsersList
