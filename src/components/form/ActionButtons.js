import React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const ActionButtons = ({ redirectToHomePage }) => {
    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
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
    )
}

export default ActionButtons
