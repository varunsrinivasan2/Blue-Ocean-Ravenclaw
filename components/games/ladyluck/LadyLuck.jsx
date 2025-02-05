import { getLadyLuck } from "../../../lib/ladyLuck.js";
import { useState, useEffect, useCallback, useReducer } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LLBoard from "./LLBoard.jsx";
import LLPlayerNum from "./LLPlayerNum.jsx";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state.js";
import { realConfetti, fireWorksConfetti } from "../../../lib/confetti.js";

export default function LadyLuck({ newGame }) {
  const initialState = {
    board: [],
    playerNums: [],
    winDistribution: {},
    prize: "",
    counter: 0,
    revealed: false,
    nft: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "play":
        let newGame = action.payload;
        return {
          ...state,
          ...newGame,
          revealed: false,
          counter: 0,
          revealedNums: [],
        };
      case "out":
        return initialState;
      case "toggleModal":
        return { ...state, revealed: !state.revealed };
      case "revealed":
        return { ...state, revealed: true };
      case "revealBoard":
        let newCounter = state.counter + 1;
        if (newCounter > 24) {
          return { ...state, revealed: true, counter: newCounter };
        } else {
          return { ...state, counter: newCounter };
        }
      case "revealPlayer":
        let newCount = state.counter + 1;
        let newReveal = false;
        let newRevealedNums = state.revealedNums.concat([action.payload]);
        if (newCount === 25) {
          newReveal = true;
        }
        return {
          ...state,
          revealedNums: newRevealedNums,
          counter: newCount,
          revealed: newReveal,
        };
      default:
        throw new Error();
        return initialState;
    }
  }
  const [game, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
  const toggleModal = () => dispatch({ type: "toggleModal" });
  const reveal = useCallback(() => dispatch({ type: "revealBoard" }), []);
  const { stateRenderWallet } = useAppContext();

  function play() {
    newGame()
      .then((res) => {
        if (res.status === 200 && res.data.cards >= 0) {
          dispatch({ type: "play", payload: res.data.game });
          stateRenderWallet((prev) => !prev);
        } else {
          onLink("/store");
        }
      })
      .catch((err) => {
        dispatch({ type: "out" });
        console.error(err);
      });
  }

  const displayPrize = () => {
    if (game.revealed && game.prize !== "loser") {
      realConfetti(true);
      fireWorksConfetti(game.prize === "grandPrize");
    }
    const { header, message } = prizeMessages[game.prize];
    return (
      <Box sx={prizeStyle}>
        <Typography
          sx={{
            fontSize: 150,
            fontWeight: 600,
            lineHeight: "130px",
            fontFamily: "Roboto",
            color: "ladyLuck.secondary",
          }}
        >
          {header}
        </Typography>
        <Box
          sx={{
            mt: 2,
          }}
        >
          {game.nft ? <img height={360} width={360} src={game.nft} /> : null}
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: 24,
            mb: 2,
            color: "white",
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        marginTop: 20,
      }}
    >
      <Button
        sx={{
          bgcolor: "ladyLuck.main",
          "&:hover": {
            bgcolor: "ladyLuck.main",
          },
        }}
        variant="contained"
        onClick={play}
      >
        New Game
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        {game.playerNums.map((num, i) => (
          <LLPlayerNum
            key={i}
            playerNums={game.playerNums}
            num={num}
            reveal={reveal}
            dispatch={dispatch}
          />
        ))}
      </Box>
      <LLBoard
        board={game.board}
        reveal={reveal}
        revealedNums={game.revealedNums}
      />
      <Modal
        open={game.revealed}
        onClose={toggleModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: 400,
            height: 500,
            bgcolor: "transparent",
          }}
        >
          {game.prize.length ? displayPrize() : null}
          <Button
            sx={{
              marginTop: 1,
              bgcolor: "ladyLuck.main",
            }}
            variant="contained"
            onClick={play}
          >
            Play Again
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const prizeStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "2px",
  color: "color",
};

const prizeMessages = {
  grandPrize: {
    header: "NFT",
    message: "",
  },
  doubleSeconds: {
    header: "500",
    message: "TOKENS",
  },
  doubleThirds: {
    header: "250",
    message: "TOKENS",
  },
  second: {
    header: "125",
    message: "TOKENS",
  },
  third: {
    header: "25",
    message: "TOKENS",
  },
  loser: {
    header: "0",
    message: "TOKENS",
  },
};

// const prizeMessages = {
//   grandPrize: {
//     header: "GRAND PRIZE!!",
//     message: "JACKPOT!!! You won an NFT!",
//   },
//   doubleSeconds: {
//     header: "SECOND PRIZE - AND MORE!",
//     message: "Hoooo-eee, we've got a winner! You've won 500 tokens",
//   },
//   doubleThirds: {
//     header: "DOUBLE THE LUCK, DOUBLE THE FUN!",
//     message: "No kidding - you scored a double win! You've won 250 tokens!",
//   },
//   second: {
//     header: "YOU WON!",
//     message: "Luck is in the air! You've won 125 tokens!",
//   },
//   third: {
//     header: "YOU WON!",
//     message: "Nicely done! You've won 25 tokens back!",
//   },
//   loser: {
//     header: "So close!",
//     message: "Not this time! Play again!",
//   },
// };
