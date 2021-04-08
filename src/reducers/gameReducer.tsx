export interface InitialStateType {
  gameType: string;
  gameStatus: string;
  gameResult: string;
  selectedOption: string;
  botSelectedOption: string;
  scoreNormal: number;
  scoreExpansion: number;
  modalIsOpen: boolean;
}

export type ActionType =
  | {
      type: "GAME_STATUS";
      payload: { gameStatus: "menu" | "standBy" | "playing" | "finished" };
    }
  | {
      type: "GAME_RESULT";
      payload: "YOU WON" | "YOU LOSE" | "DRAW";
    }
  | {
      type: "CHANGE_GAME_TYPE";
      payload: { gameType: "" | "normal" | "expansion" };
    }
  | {
      type: "GAME_MODAL";
    }
  | {
      type: "GAME_USER_OPTION";
      payload: { selectedOption: string };
    }
  | {
      type: "GAME_BOT_OPTION";
      payload: { botSelectedOption: string };
    }
  | {
      type: "UPDATE_NORMAL_SCORE";
      payload: { score: number };
    }
  | {
      type: "UPDATE_EXPANSION_SCORE";
      payload: { score: number };
    }
  | {
      type: "UPDATE_LOCALSTORAGE_NORMAL";
      payload: { normalScore: number };
    }
  | {
      type: "UPDATE_LOCALSTORAGE_EXPANSION";
      payload: { expansionScore: number };
    }
  | {
      type: "RESET_NORMAL_SCORE";
    }
  | {
      type: "RESET_EXPANSION_SCORE";
    };

export const gameReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "GAME_STATUS":
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      };
    case "GAME_RESULT":
      return {
        ...state,
        gameResult: action.payload,
      };
    case "CHANGE_GAME_TYPE":
      return {
        ...state,
        gameType: action.payload.gameType,
      };
    case "GAME_MODAL":
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
      };
    case "GAME_USER_OPTION":
      return {
        ...state,
        selectedOption: action.payload.selectedOption,
      };
    case "GAME_BOT_OPTION":
      return {
        ...state,
        botSelectedOption: action.payload.botSelectedOption,
      };
    case "UPDATE_NORMAL_SCORE":
      return {
        ...state,
        scoreNormal: state.scoreNormal + action.payload.score,
      };
    case "UPDATE_EXPANSION_SCORE":
      return {
        ...state,
        scoreExpansion: state.scoreExpansion + action.payload.score,
      };
    case "UPDATE_LOCALSTORAGE_NORMAL":
      return {
        ...state,
        scoreNormal: action.payload.normalScore,
      };
    case "UPDATE_LOCALSTORAGE_EXPANSION":
      return {
        ...state,
        scoreExpansion: action.payload.expansionScore,
      };
    case "RESET_NORMAL_SCORE":
      return {
        ...state,
        scoreNormal: 0,
      };
    case "RESET_EXPANSION_SCORE":
      return {
        ...state,
        scoreExpansion: 0,
      };
    default:
      return state;
  }
};
