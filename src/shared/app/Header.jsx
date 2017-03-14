import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Menu from 'material-ui/svg-icons/navigation/menu'
import { white } from 'material-ui/styles/colors'
import SearchBox from './SearchBox'

const Header = (props) => {
  const { styles, handleChangeRequestNavDrawer } = props

  const style = {
    appBar: {
      position: 'fixed',
      top: 0,
      overflow: 'hidden',
      maxHeight: 57,
    },
    menuButton: {
      marginLeft: 10,
    },
    iconsRightContainer: {
      marginLeft: 20,
    },
  }

  return (
    <div>
      <AppBar
        style={{ ...styles, ...style.appBar }}
        title={
          <SearchBox />
        }
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
            <Menu color={white} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconMenu
              color={white}
              iconButtonElement={
                <IconButton><MoreVertIcon color={white} /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Sign out" onTouchTap={props.logout} />
            </IconMenu>
          </div>
        }
      />
    </div>
  )
}

Header.propTypes = {
  styles: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
  handleChangeRequestNavDrawer: PropTypes.func.isRequired,
}

export default Header
