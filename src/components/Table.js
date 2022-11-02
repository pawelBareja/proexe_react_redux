import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import Modal from './DeleteModal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.grey,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}))

// eslint-disable-next-line no-unused-vars
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    height: '100px',
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const tableHeadLabels = ['Id', 'Name', 'Username', 'Email', 'City', 'Edit', 'Delete']

const UsersTable = ({ users }) => {
    const [openModal, setOpenModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState()

    const initModal = (id) => {
        setUserToDelete(id)
        setOpenModal(true)
    }

    const navigate = useNavigate()

    const redirectToNewUser = () => {
        navigate('/addnewuser')
    }

    const redirectToEditUser = (id) => {
        navigate(`/editUser/${id}`)
    }

    return (
        <>
            <Paper sx={{ padding: '20px', borderRadius: '10px' }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    my={2}
                    pb={3}
                >
                    <Typography variant="h5" component="h2">
                        User list
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ width: '170px' }}
                        onClick={redirectToNewUser}
                    >
                        Add new
                    </Button>
                </Stack>
                <Box pb={2}>
                    <Divider />
                </Box>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 650, border: '1px solid darkgrey' }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <StyledTableRow sx={{ background: 'darkGrey' }}>
                                {tableHeadLabels.map((t) => (
                                    <StyledTableCell kry={t} align="right">
                                        {t}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {users.length
                                ? users.map((u) => (
                                      <StyledTableRow key={u.name}>
                                          <StyledTableCell component="th" scope="row">
                                              {u.id}
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                              {u.name || 'no data'}
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                              {u.username || 'no data'}
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                              {u.email || 'no data'}
                                          </StyledTableCell>
                                          {u.adress ? (
                                              <StyledTableCell align="right">
                                                  {u.address.city}
                                              </StyledTableCell>
                                          ) : (
                                              <StyledTableCell align="right">
                                                  no data
                                              </StyledTableCell>
                                          )}
                                          <StyledTableCell align="right">
                                              <Button
                                                  variant="contained"
                                                  size="large"
                                                  color="warning"
                                                  sx={{ width: '120px' }}
                                                  onClick={() => redirectToEditUser(u.id)}
                                              >
                                                  edit
                                              </Button>
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                              <Button
                                                  variant="contained"
                                                  size="large"
                                                  color="error"
                                                  sx={{ width: '120px' }}
                                                  onClick={() => initModal(u.id)}
                                              >
                                                  delete
                                              </Button>
                                          </StyledTableCell>
                                      </StyledTableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!users.length && (
                    <Stack direction="row" justifyContent="center" alignItems="center" p={2}>
                        <Typography variant="h3" component="h2" color="error">
                            Users list is empty, add a new one
                        </Typography>
                    </Stack>
                )}
            </Paper>
            <Modal openModal={openModal} setOpenModal={setOpenModal} userToDelete={userToDelete} />
        </>
    )
}

export default UsersTable
