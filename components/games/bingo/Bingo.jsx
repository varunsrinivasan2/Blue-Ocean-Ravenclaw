import {
  generateBingoGame
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';
import { ScratchOff } from "@sky790312/react-scratch-off";
import axios from 'axios';

//TODO: Make bingo numbers light up when you reveal their sequence number
//TODO: Bingo! pop up when you hit a bingo
//TODO: Prizes
export default function Bingo({plays, luck, playGame, playing}) {
  const [boards, setBoards] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [outcome, setOutcome] = useState({});
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (playing) {
      const game = generateBingoGame();

    }
  }, [plays]);
  function playBingo ()  {
     axios.get(`https://localhost:3001/play/bingo/roll?user_id=${1}`)
      .then((res) => {
        const newBoards = game.boards;
        let newSequences = game.sequence;
        let outcomes = game.outcomes;
        setBoards(res.data.game.boards);
        setSequences(res.data.game.sequence);
        setOutcome(res.data.game.outcomes);
        setRevealed(false);
      })
      .catch((err) => {
        console.error(err);
        setBoards([]);
        setSequences([]);
        setOutcome([]);
        setRevealed(false);
      });
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 14
    }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 420,
          flexDirection: 'row',
          margin: 1
        }}>
          <Sequence sequences={sequences} setRevealed={setRevealed} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          width: 320,
          height: 320
        }}>
          {boards.map((board, i) => <BingoBoard key={i} board={board} />)}
        </Box>
        <Button
          sx={{
            marginTop: 1
          }}
          variant='contained'
          onClick={playGame}>
            New Board
        </Button>
    </Box>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 400,
  flexDirection: 'row'
};