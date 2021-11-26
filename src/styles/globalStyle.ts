import { makeStyles } from '@material-ui/styles'

export const useStyleApp = makeStyles({
  containerWithSentence: {
    backgroundBlendMode: 'lighten'
  },
  containerWithoutSentence: {
    height: '99vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sentenceInput: {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: '10px',
    paddingRight: '10px',
    border: '3px solid #39A9CB'
  },
  textField: {
    "& .MuiInputBase-input":{
    textAlign: "center"}
  },
  author: {
    color: '#39A9CB'
  },
  branchBtn: {
    backgroundColor: '#39A9CB',
    '&:hover': {
      backgroundColor: '#2940D3'
    },
    color: 'white',
    maxWidth: 'fit-content',
    marginTop: '10px'
  },
  centerBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  svgLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: -999
  }
})

//Lines
export const lineStyle = {
  stroke: '#39A9CB',
  strokeWidth:'2'
}