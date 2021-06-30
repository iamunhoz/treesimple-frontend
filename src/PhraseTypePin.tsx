import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

 
interface pinProps {
  X: number
  Y: number
}
export default function PhraseTypePin(props: pinProps) {
  const styles = {
    phraseTypeBox: {
      position: 'absolute',
      left: `${props.X}px`,
      top: `${props.Y-15}px`,
      border: '2px solid #39A9CB',
      backgroundColor: 'white',
      color: '#39A9CB',
      borderRadius: '50%',
      fontSize: '13px',
      padding: '2px 2px',
      zIndex: 10,
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
    <div>
      <span 
        style={styles.phraseTypeBox}
        onClick={handleClick}
      >{phraseType}
      </span>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose(phraseType)}
      >
        <MenuItem onClick={() => handleClose(' S ')}>Sentence</MenuItem>
        <MenuItem onClick={() => handleClose('NP')}>Noun Phrase</MenuItem>
        <MenuItem onClick={() => handleClose('VP')}>Verb Phrase</MenuItem>
        <MenuItem onClick={() => handleClose('PP')}>Preposition Phrase</MenuItem>
        <MenuItem onClick={() => handleClose('AdjP')}>Adjective Phrase</MenuItem>
        <MenuItem onClick={() => handleClose('AdvP')}>Adverb Phrase</MenuItem>
      </Menu>
    </div>
  )
}
