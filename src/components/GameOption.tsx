import rock from "../assets/images/icon-rock.svg";
import paper from "../assets/images/icon-paper.svg";
import scissors from "../assets/images/icon-scissors.svg";
import lizard from "../assets/images/icon-lizard.svg";
import spock from "../assets/images/icon-spock.svg";
import { useContext } from "react";
import { GameContext } from "../context/gameContext";

interface IGameOptionProps {
  option: string;
  className?: string;
}

export const GameOption = (props: IGameOptionProps) => {
  const renderOption = (option: string) => {
    switch (option) {
      case "rock":
        return rock;
      case "paper":
        return paper;
      case "scissors":
        return scissors;
      case "lizard":
        return lizard;
      case "spock":
        return spock;
      default:
        break;
    }
  };
  const {
    gameState: { gameStatus },
    dispatch,
  } = useContext(GameContext);
  const handleChoice = (op: string) => {
    if (gameStatus !== "finished") {
      dispatch({
        type: "GAME_STATUS",
        payload: {
          gameStatus: "playing",
        },
      });
      dispatch({
        type: "GAME_USER_OPTION",
        payload: {
          selectedOption: op,
        },
      });
    }
  };
  return (
    <div
      className={"circle " + props.option + " " + props.className}
      onClick={() => handleChoice(props.option)}
    >
      <div className="inner_circle">
        <img src={renderOption(props.option)} alt={props.option + " select"} />
      </div>
    </div>
  );
};
