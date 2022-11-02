import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { editUser } from '../../features/users/usersSlice'

// import { addNewPost } from './postsSlice'

const Wrapper = styled(Box)(({ theme }) => ({
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    justifyContent: 'flex-start',
    padding: `${theme.spacing(2)} 0 0 ${theme.spacing(30)}`,
}))

// eslint-disable-next-line no-unused-vars
const InputWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const schema = yup
    .object({
        name: yup
            .string()
            .required()
            .min(2)
            .max(120),
        email: yup
            .string()
            .email()
            .required(),
    })
    .required()

const AddNewUser = () => {
    const [existingUserName, setExistingUserName] = useState()
    const [existingUserEmail, setExistingUserEmail] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userId } = useParams()

    const { users } = useSelector((state) => state.users)

    const findUser = (list, id) => {
        const existingUser = list.find((u) => u.id === +id)
        setExistingUserName(existingUser.name)
        setExistingUserEmail(existingUser.email)
    }

    useEffect(() => {
        if (userId && users.length) {
            findUser(users, userId)
        }
    }, [userId, users])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const dataWithId = { ...data, id: userId }
        try {
            dispatch(editUser(dataWithId)).unwrap()
            reset()
        } catch (err) {
            console.error('Failed to edit the user: ', err)
        } finally {
            navigate('/')
        }
    }

    const redirectToHomePage = () => {
        navigate('/')
    }

    return (
        <>
            <Typography variant="h3" component="h1" my={5}>
                Dashboard
            </Typography>
            <Paper sx={{ padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h5" component="h2">
                    Form
                </Typography>
                <Box py={4}>
                    <Divider />
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Wrapper>
                        <Typography variant="body1" component="body" pr={10} pt={2}>
                            Name
                        </Typography>
                        <InputWrapper>
                            {existingUserName && (
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="name"
                                    variant="outlined"
                                    defaultValue={existingUserName}
                                    {...register('name')}
                                />
                            )}
                            <Typography variant="body1" component="body" color="error" pt={2}>
                                {errors.name && errors.name.message}
                            </Typography>
                        </InputWrapper>
                    </Wrapper>

                    <Wrapper>
                        <Typography variant="body1" component="body" pr={10} pt={2}>
                            Email
                        </Typography>
                        <InputWrapper>
                            {existingUserEmail && (
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="email"
                                    variant="outlined"
                                    defaultValue={existingUserEmail}
                                    {...register('email')}
                                />
                            )}
                            <Typography variant="body1" component="body" color="error" pt={2}>
                                {errors.email && errors.email.message}
                            </Typography>
                        </InputWrapper>
                    </Wrapper>

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            color="error"
                            sx={{ width: '120px' }}
                            onClick={redirectToHomePage}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="success"
                            sx={{ width: '120px' }}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </>
    )
}

export default AddNewUser
