import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/customTheme'
import { getUsers } from './features/users/usersSlice'
import UsersList from './pages/usersList/UsersList'
import AddNewUser from './pages/addNewUser/AddNewUser'
import EditUser from './pages/editUser/EditUser'
import ErrorPage from './pages/errorPage/ErrorPage'

const App = () => {
    const dispatch = useDispatch()
    const { users, status } = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UsersList users={users} status={status} />} />
                    <Route exact path="/addnewuser" element={<AddNewUser />} />
                    <Route exact path="/edituser/:userId" element={<EditUser />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
