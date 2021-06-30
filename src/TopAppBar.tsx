import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import './fonts.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      gridColumnStart: 'menu'
    },
    toolbar: {
      display: 'grid',
      gridTemplateColumns: '[menu] 5% [gutter] 40% [logo] auto [gutter] 35% [button] 8%',
      backgroundColor: '#39A9CB'
    },
    appName: {
      fontFamily: 'Josefin Sans',
      fontSize: '2.5rem',
      gridColumnStart: 'logo'
    },
    restartBtn:{
      fontFamily: 'Josefin Sans',
      color: 'white',
      gridColumnStart: 'button'
    }
  })
)

export default function DenseAppBar(props: DenseAppBarProps) {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar} variant="dense">
          {props.isThereSentence && 
            (<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>)}
          <Typography variant="h6" color="inherit" className={classes.appName}>
            Noam
          </Typography>
          {props.isThereSentence &&
          ( <Button
                className={classes.restartBtn}
                onClick={() => {props.restart()}}
              >
              Start Over
            </Button>)}
        </Toolbar>
      </AppBar>
  );
}

interface DenseAppBarProps {
  isThereSentence: boolean
  restart: Function
}