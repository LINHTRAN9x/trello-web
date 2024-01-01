import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';

function ListColumns({ columns }) {
  return (
    <Box sx={{
      width: '100%',
      bgcolor: 'inherit',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      {columns?.map(column => <Column key={column._id} column={column}/> )}

      {/* Box add new Column */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3d'
      }}>
        <Button
          startIcon={<AddBoxIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >Add new column</Button>
      </Box>
    </Box>
  )
}

export default ListColumns