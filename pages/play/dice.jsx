import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useCallback, useReducer } from 'react';
import GameCard from '../../components/games/GameCard.jsx';

export default function Bingo() {
  const initialState = {
    plays: 5,
    game: 'highroller',
    playing: false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'play':
        return { ...state, plays: state.plays - 1, playing: true };
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({ type: 'play' }), []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: 800,
        mt: 1,
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          height: 700,
          width: 360,
          marginTop: 1,
          bgcolor: 'background.secondary',
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 0,
          }}
        >
          <CardMedia
            component="img"
            image="https://i.ibb.co/2KmHtpS/High-Roller.png"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              width: 360,
              height: 700,
            }}
          />
          <GameCard
            game={gameState.game}
            plays={gameState.plays}
            playGame={playGame}
            playing={gameState.playing}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
