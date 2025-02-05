import Box from '@mui/material/Box';
import BingoNumber from './BingoNumber.jsx';
import {useState, useCallback, useEffect} from 'react';

export default function BingoBoardCol ({board, col, revealedNums}) {
  function renderCol (num, i) {
    return (
      <BingoNumber key={i} board={board} num={num} revealedNums={revealedNums} />
    )
  }
  const colStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  };

  return (
    <Box className="bingo-board-col" sx={colStyle}>
      {col.map(renderCol)}
    </Box>
  );
}