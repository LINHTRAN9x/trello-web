import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/fomater'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.100'
  }
}

function BoardBar({ board }) {

  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' )
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<SpaceDashboardIcon />}
          label= { board?.title }
          clickable
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={ capitalizeFirstLetter(board?.type) }
          clickable
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<PrecisionManufacturingIcon />}
          label="Automation"
          clickable
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          onClick= {() => {}}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: 1,
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none',
              color: 'white',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://lh3.googleusercontent.com/a/ACg8ocJAsNmBuewpOnbyBCcqeVMtPFaly5EgsK4TIuWzzLrpj94=s360-c-no"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DeyZNqRdLF9WiyJOo7YQW5HxbSp3F6tNQQ&usqp=CAU"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshW2NpetcJKgpq6jaRpnFR2uxuGAXWEN8KQ&usqp=CAU"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnwkX0e81k-bFLuyrQW6FZVxni7yhtsYgoNA&usqp=CAU"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEz6jL_Hac7lAKFRYFGFqJHTwE_F3AZ4jpDA&usqp=CAU"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&usqp=CAU"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&usqp=CAU"
            />
          </Tooltip>
          <Tooltip title="linhtran">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kwlr6BBRCBC8nJlyYH0O1nqEN-LXTfskLA&usqp=CAU"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
