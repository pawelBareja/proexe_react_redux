import React from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { addNewUser } from '../../features/users/usersSlice'
import FormHeader from '../../components/form/FormHeader'
import ActionButtons from '../../components/form/ActionButtons'
import Layout from '../../layout/Layout'

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
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        try {
            dispatch(addNewUser(data))
            reset()
            navigate('/')
        } catch (err) {
            console.error('Failed to save the user: ', err)
        }
    }

    const redirectToHomePage = () => {
        navigate('/')
    }

    return (
        <Layout>
            <Paper sx={{ padding: '20px', borderRadius: '10px' }}>
                <FormHeader />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Wrapper>
                        <Typography variant="h6" component="h6" pr={10} pt={2}>
                            Name
                        </Typography>
                        <InputWrapper>
                            <TextField
                                error={errors.name && errors.name.message}
                                sx={{ width: '100%' }}
                                id="name"
                                variant="outlined"
                                {...register('name')}
                            />
                            <Typography variant="h6" component="h6" color="error" pt={2}>
                                {errors.name && errors.name.message}
                            </Typography>
                        </InputWrapper>
                    </Wrapper>

                    <Wrapper>
                        <Typography variant="h6" component="h6" pr={10} pt={2}>
                            Email
                        </Typography>
                        <InputWrapper>
                            <TextField
                                error={errors.email && errors.email.message}
                                sx={{ width: '100%' }}
                                id="email"
                                variant="outlined"
                                {...register('email')}
                            />
                            <Typography variant="h6" component="h6" color="error" pt={2}>
                                {errors.email && errors.email.message}
                            </Typography>
                        </InputWrapper>
                    </Wrapper>
                    <ActionButtons redirectToHomePage={redirectToHomePage} />
                </form>
            </Paper>
        </Layout>
    )
}

export default AddNewUser
