import React, { createContext, Dispatch, useReducer } from "react";
import {
  gameReducer,
  ActionType,
  InitialStateType,
} from "../reducers/gameReducer";

const initialState = {
  gameType: "",
  gameStatus: "menu",
  gameResult: "",
  selectedOption: "none",
  botSelectedOption: "none",
  scoreNormal: 0,
  scoreExpansion: 0,
  modalIsOpen: false,
};

export const GameContext = createContext<{
  gameState: InitialStateType;
  dispatch: Dispatch<ActionType>;
}>({
  gameState: initialState,
  dispatch: () => {},
});

export const GameProvider: React.FC = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
