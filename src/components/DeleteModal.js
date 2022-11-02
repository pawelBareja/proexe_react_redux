import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../features/users/usersSlice'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function BasicModal({ openModal, setOpenModal, userToDelete }) {
    const dispatch = useDispatch()

    const removeUser = async () => {
        try {
            dispatch(deleteUser(userToDelete))
            setOpenModal(false)
        } catch (err) {
            console.error('Failed to delete user: ', err)
        }
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete
                    </Typography>
                    <Box pb={2}>
                        <Divider />
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to remove this user?
                    </Typography>
                    <Box pb={2}>
                        <Divider />
                    </Box>
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
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="success"
                            sx={{ width: '120px' }}
                            onClick={removeUser}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
