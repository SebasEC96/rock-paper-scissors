import { useContext, useEffect } from "react";
import { GameOption } from "../../components/GameOption";
import { GameContext } from "../../context/gameContext";

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

    const updateLocalStorage = (gameMode: string, result: string) => {
      if (gameMode === "normal") {
        const n_points = localStorage.getItem("normal_points") as string;
        if (result === "Won") {
          const new_points = parseInt(n_points) + 1;
          localStorage.setItem("normal_points", `${new_points}`);
        } else if (result === "Lose" && parseInt(n_points) > 0) {
          const new_points = parseInt(n_points) - 1;
          localStorage.setItem("normal_points", `${new_points}`);
        }
      } else if (gameMode === "expansion") {
        const n_points = localStorage.getItem("expansion_points") as string;
        console.log(n_points);
        if (result === "Won") {
          const new_points = parseInt(n_points) + 1;
          console.log({ new_points });
          localStorage.setItem("expansion_points", `${new_points}`);
        } else if (result === "Lose" && parseInt(n_points) > 0) {
          const new_points = parseInt(n_points) - 1;
          localStorage.setItem("expansion_points", `${new_points}`);
        }
      }
    };

    if (pickedRules.win.includes(option)) {
      result = "YOU WON";
      if (gameType === "normal") {
        dispatch({
          type: "UPDATE_NORMAL_SCORE",
          payload: { gameResult: "Won" },
        });
        updateLocalStorage("normal", "Won");
      } else {
        dispatch({
          type: "UPDATE_EXPANSION_SCORE",
          payload: { gameResult: "Won" },
        });
        updateLocalStorage("expansion", "Won");
      }
    } else if (selectedOption === option) {
      result = "DRAW";
    } else {
      result = "YOU LOSE";
      if (gameType === "normal") {
        dispatch({
          type: "UPDATE_NORMAL_SCORE",
          payload: { gameResult: "Lose" },
        });
        updateLocalStorage("normal", "Lose");
      } else {
        dispatch({
          type: "UPDATE_EXPANSION_SCORE",
          payload: { gameResult: "Lose" },
        });
        updateLocalStorage("expansion", "Lose");
      }
    }
    dispatch({
      type: "GAME_RESULT",
      payload: result as IResultPops,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const botOption = randomChoice();
      dispatch({
        type: "GAME_BOT_OPTION",
        payload: {
          botSelectedOption: botOption,
        },
      });
      checkResult(botOption);
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
