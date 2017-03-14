import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey700, grey900 } from 'material-ui/styles/colors'

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: blueGrey700,
  },
  drawer: {
    width: 230,
    color: grey900,
  },
  raisedButton: {
    primaryColor: blueGrey700,
  },
})


export default themeDefault
