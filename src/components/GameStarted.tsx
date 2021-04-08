import { useContext, useEffect } from "react";
import { GameOption } from "./GameOption";
import { GameContext } from "../context/gameContext";

interface IGameStartedProps {
  option: string;
}

const GameStarted = (props: IGameStartedProps) => {
  const {
    gameState: {
      gameType,
      gameStatus,
      gameResult,
      selectedOption,
      botSelectedOption,
      scoreExpansion,
      scoreNormal,
    },
    dispatch,
  } = useContext(GameContext);

  const randomChoice = () => {
    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * Math.floor(max));
    };
    const options = ["rock", "paper", "scissors", "lizard", "spock"];
    if (gameType === "normal") {
      const n = getRandomInt(3);
      return options[n];
    } else {
      const n = getRandomInt(5);
      return options[n];
    }
  };

  const checkResult = (option: string) => {
    interface IRulesProps {
      rock: Object;
      paper: Object;
      scissors: Object;
      lizard: Object;
      spock: Object;
    }

    type IResultPops = "YOU WON" | "YOU LOSE" | "DRAW";

    const rules = {
      rock: {
        win: ["scissors"],
      },
      paper: {
        win: ["rock", "spock"],
      },
      scissors: {
        win: ["paper", "lizard"],
      },
      lizard: {
        win: ["spock", "papel"],
      },
      spock: {
        win: ["scissors", "rock"],
      },
    };

    const pickedRules = rules[selectedOption as keyof IRulesProps];
    let result: string = "";

    const updateLocalStorage = (gameMode: string, result: number) => {
      const n_points = localStorage.getItem(`${gameMode}_points`) as string;
      const new_points = parseInt(n_points) + result;
      localStorage.setItem(`${gameMode}_points`, `${new_points}`);
    };

    if (pickedRules.win.includes(option)) {
      result = "YOU WON";
      if (gameType === "normal") {
        dispatch({
          type: "UPDATE_NORMAL_SCORE",
          payload: { score: 1 },
        });
        updateLocalStorage("normal", 1);
      } else {
        dispatch({
          type: "UPDATE_EXPANSION_SCORE",
          payload: { score: 1 },
        });
        updateLocalStorage("expansion", 1);
      }
    } else if (selectedOption === option) {
      result = "DRAW";
    } else {
      result = "YOU LOSE";
      if (gameType === "normal") {
        if (scoreNormal > 0) {
          dispatch({
            type: "UPDATE_NORMAL_SCORE",
            payload: { score: -1 },
          });
          updateLocalStorage("normal", -1);
        }
      } else {
        if (scoreExpansion > 0) {
          dispatch({
            type: "UPDATE_EXPANSION_SCORE",
            payload: { score: -1 },
          });
          updateLocalStorage("expansion", -1);
        }
      }
    }
    dispatch({
      type: "GAME_RESULT",
      payload: result as IResultPops,
    });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const botOption = randomChoice();
      dispatch({
        type: "GAME_BOT_OPTION",
        payload: {
          botSelectedOption: botOption,
        },
      });
      await checkResult(botOption);
      dispatch({
        type: "GAME_STATUS",
        payload: {
          gameStatus: "finished",
        },
      });
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayAgain = () => {
    dispatch({
      type: "GAME_STATUS",
      payload: { gameStatus: "standBy" },
    });
    dispatch({
      type: "GAME_BOT_OPTION",
      payload: { botSelectedOption: "none" },
    });
  };

  return (
    <section className="game_started">
      <div className="options">
        <GameOption option={selectedOption} />
        <span>YOU PICKED</span>
      </div>
      <div className="options">
        {botSelectedOption === "none" && <div className="blue-circle"></div>}
        {botSelectedOption !== "none" && (
          <GameOption option={botSelectedOption} />
        )}
        <span>THE HOUSE PICKED</span>
      </div>
      {gameStatus === "finished" && (
        <div className="game_result">
          <h3>{gameResult}</h3>
          <button onClick={handlePlayAgain}>PLAY AGAIN</button>
        </div>
      )}
    </section>
  );
};

export default GameStarted;
