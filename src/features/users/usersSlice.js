/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUsers = createAsyncThunk('users/getUSers', async (initialState) => {
    return fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data').then(
        (res) => res.json()
    )
})

export const addNewUser = createAsyncThunk('users/addNewUser', async (initialState) => {
    return fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
        method: 'POST',
        body: JSON.stringify(initialState),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return json
        })
})

export const editUser = createAsyncThunk('users/editUser', async (initialState) => {
    return fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${
            initialState.id
        }`,
        {
            method: 'PUT',
            body: JSON.stringify(initialState),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    )
        .then((response) => response.json())
        .then((json) => {
            return json
        })
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (initialState) => {
    console.log('initStee', initialState)
    return fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${initialState}`,
        {
            method: 'DELETE',
        }
    ).then(() => initialState)
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: null,
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status = 'success'
            state.users = action.payload
        },
        [getUsers.rejected]: (state, action) => {
            state.status = 'failed'
        },
        [addNewUser.fulfilled]: (state, action) => {
            state.status = 'success'
            state.users.push(action.payload)
        },
        [editUser.fulfilled]: (state, action) => {
            state.status = 'success'
            const { id, name, email } = action.payload

            const existingUser = state.users.find((u) => u.id === id)
            if (existingUser) {
                existingUser.name = name
                existingUser.email = email
            }
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.status = 'success'
            const filteredUsers = state.users.filter((u) => u.id !== action.payload)
            state.users = filteredUsers
        },
    },
})

export default userSlice.reducer
