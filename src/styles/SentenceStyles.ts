import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
  root: {
    backgroundColor: 'red'
  },
  button: {
    display: 'inline',
    fontSize: '10px',
    color: 'rgba(200,200,200,0.5)',
    minWidth: '0',
    width: '5px',
    height: '100%',
    padding: '10px 0 0 0',
    border: '0',
    '&:hover':{
      backgroundColor: '#39A9CB'
    }
  },
  box: {
    color: 'black'
  },
  text: {
    padding: '10px 10px 10px 10px',
    fontFamily: 'Josefin Sans'
  },
  phraseBox: {
    maxWidth: 'fit-content',
    border: '3px solid #39A9CB',
    overflow: 'visible'
  }
})