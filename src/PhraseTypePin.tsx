import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

 
interface pinProps {
  X: number
}
export default function PhraseTypePin(props: pinProps) {
  const styles = {
    phraseTypeBox: {
      border: '2px solid #39A9CB',
      backgroundColor: 'white',
      color: '#39A9CB',
      borderRadius: '50%',
      position: 'relative',
      top: '-20px',
      left: `${props.X}px`,
      fontSize: '13px',
      padding: '2px 2px',
      zIndex: 10  
    }as React.CSSProperties
  }
  const [phraseType, setPhraseType] = useState('XP')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type:string) => {
    setPhraseType(type)
    setAnchorEl(null);
  };
  return (
    <>
      <span 
        style={styles.phraseTypeBox}
        onClick={handleClick}
      >{phraseType}</span>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('NP')}>NP</MenuItem>
        <MenuItem onClick={() => handleClose('VP')}>VP</MenuItem>
        <MenuItem onClick={() => handleClose('PP')}>PP</MenuItem>
        <MenuItem onClick={() => handleClose('AdjP')}>AdjP</MenuItem>
      </Menu>
    </>
  )
}
