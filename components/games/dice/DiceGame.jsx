import {useEffect, useReducer, useCallback} from 'react';
import axios from 'axios';
import Dice from './Dice.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function DiceGame ({plays, luck, playGame, playing}) {
  const initialState = { //Initial Game State
    diceArr: [],
    rolling: false
  }
  function reducer (state, action) { //Controls the Game State
    switch (action.type) {
      case 'fake':
        let newDice = fakeDice(plays, luck);
        return {...state, diceArr: newDice};
      case 'roll':
        return {...state, rolling: true};
      case 'rolled':
        return {...state, rolling: false, diceArr: action.payload};
      case 'out':
        return {...state, rolling: false, diceArr: []};
      default:
        return {...state, rolling: false, diceArr: []};
    }
  }
  const [diceState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => { //When plays variable decreases, roll the dice
    if (playing) { //Prevents roll on initial load
      dispatch({type: 'fake'});
    }
  }, [plays]);

  useEffect(() => {
    if (diceState.rolling) {
      axios.get('https://localhost:3000/games/rolldice')
      .then((res) => {
        dispatch({type: 'rolled', payload: res.data});
      })
      .catch((err)=> {
        console.error(err);
        dispatch({type: 'out'});
      });
    }
  }, [diceState.rolling]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {plays > 0
      ? <Button
          sx={{
            width: 200
          }}
          onClick={playGame}
          variant="contained">
            Roll The dice
        </Button>
      : 'Buy More!'}
      <Dice diceArr={diceState.diceArr} />
    </Box>
  );
}

function fakeDice (plays, luck) { //Generates Dice Roll
  if (plays < 1) {
    return [];
  }
  let roll = Math.floor(Math.random() * 6 + 1);
  return luck ? [0, 0, 0].map((num) => roll) : [0, 0, 0].map((num) => Math.floor(Math.random() * 6 + 1));
}