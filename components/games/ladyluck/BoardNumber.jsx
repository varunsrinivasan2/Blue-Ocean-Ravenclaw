import Box from '@mui/material/Box';
import {useState, useEffect } from 'react';
import { ScratchOff } from "@sky790312/react-scratch-off";

export default function BoardNumber ({ board, num, reveal, revealedNums }) {
  const [counter, setCounter] = useState(0);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { //Reset to hidden on render
    setCounter((prev) => prev + 1);
  }, [board]);
  useEffect(() => {
      if (revealedNums.includes(num)) {
        setRevealed(true);
      } else {
        setRevealed((prev) => (prev ? false : prev));
      }
  }, [revealedNums]);


  const hideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    width: 38,
    backgroundColor: 'gold',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 2
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 2,
    margin: 1
  };
  const numStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: '50%',
    bgcolor: 'ladyLuck.secondary',
    color: 'black'
  };
  const revealStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: '50%',
    bgcolor: 'ladyLuck.main',
    color: 'white',
    position: 'relative'
  }

  return (
    <Box className='ll-board-number' sx={containerStyle}>
      <Box className='scratch-off' sx={{position: 'absolute', zIndex: 2}}>
      <ScratchOff
          key={counter}
          width={50}
          height={50}
          handleReveal={reveal}
          coverImgSrc={
            "https://i.ibb.co/ChbMg6H/Horseshoe.png"
          }
          revealPercentage={80}
        >

        </ScratchOff>
      </Box>

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50
          }}>
            <Box sx={revealed ? revealStyle : numStyle}>
              {num}
            </Box>
          </Box>
    </Box>
  )
}