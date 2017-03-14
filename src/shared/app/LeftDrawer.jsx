import React, { PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import { spacing, typography } from 'material-ui/styles'
import { white, blueGrey700, teal500 } from 'material-ui/styles/colors'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

const LeftDrawer = (props) => {
  const { navDrawerOpen } = props

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blueGrey700,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14,
    },
    avatar: {
      div: {
        padding: '10px 0 20px 0',
        height: 45,
      },
      icon: {
        margin: 5,
        left: 5,
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444',
      },
    },
  }

  return (
    <Drawer
      docked
      open={navDrawerOpen}
    >
      <div style={styles.logo}>
        Admin Template
      </div>
      <div style={styles.avatar.div}>
        <ListItem
          disabled
          leftAvatar={
            <Avatar
              size={50}
              style={styles.avatar.icon}
              backgroundColor={teal500}
            >
              {props.username[0]}
            </Avatar>
          }
        >
          <span style={styles.avatar.span}>{props.username}</span>
        </ListItem>
      </div>
      <div>
        {props.menus.map((menu, index) =>
          <MenuItem
            // eslint-disable-next-line react/no-array-index-key
            key={`menu-${index}`}
            style={styles.menuItem}
            primaryText={menu.text}
            leftIcon={menu.icon}
            containerElement={<Link to={menu.link} />}
          />)}
      </div>
    </Drawer>
  )
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.element,
    link: PropTypes.string,
  })).isRequired,
  username: PropTypes.string,
}

LeftDrawer.defaultProps = {
  navDrawerOpen: false,
  username: 'unknown',
}

export default LeftDrawer
