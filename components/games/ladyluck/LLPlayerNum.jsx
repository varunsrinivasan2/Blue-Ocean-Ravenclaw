import Box from "@mui/material/Box";
import { useState, useEffect, useCallback } from "react";
import { ScratchOff } from "@sky790312/react-scratch-off";

export default function LLPlayerNum({ playerNums, num, reveal, dispatch }) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter((prev) => prev + 1);
  }, [playerNums]);
  const revealNum = useCallback(() => {
    dispatch({ type: "revealPlayer", payload: num });
  }, [num])

  const hideStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    backgroundColor: "red",
    borderRadius: 2,
    position: "absolute",
    zIndex: 2,
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 2,
    margin: 1,
  };

  return (
    <Box className="ll-player-number" sx={containerStyle}>
      <ScratchOff
        key={counter}
        width={50}
        height={50}
        handleReveal={revealNum}
        coverImgSrc={"https://i.ibb.co/GPPL3hH/Four-Leaf-Clover.png"}
        revealPercentage={90}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              borderRadius: "50%",
              bgcolor: "ladyLuck.main",
              color: "white",
            }}
          >
            {num}
          </Box>
        </Box>
      </ScratchOff>
    </Box>
  );
}
