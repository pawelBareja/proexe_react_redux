import React from 'react'
import Typography from '@mui/material/Typography'
import UsersTable from '../../components/Table'

const UsersList = ({ users, status }) => {
    if (status === 'loading') {
        return <Typography>loading...</Typography>
    }

    return (
        <>
            <Typography variant="h3" component="h1" my={5}>
                Dashboard
            </Typography>
            <UsersTable users={users} />
        </>
    )
}

export default UsersList
