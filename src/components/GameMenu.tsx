import { useContext, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import Logo from "../assets/images/logo.svg";

export const GameMenu = () => {
  type gameType = "normal" | "expansion";
  const { dispatch } = useContext(GameContext);
  const handleMode = (mode: string) => {
    dispatch({
      type: "CHANGE_GAME_TYPE",
      payload: { gameType: mode as gameType },
    });
    dispatch({
      type: "GAME_STATUS",
      payload: { gameStatus: "standBy" },
    });
  };
  useEffect(() => {
    const normal_points = localStorage.getItem("normal_points") as string;
    if (normal_points !== null) {
      dispatch({
        type: "UPDATE_LOCALSTORAGE_NORMAL",
        payload: {
          normalScore: parseInt(normal_points),
        },
      });
    }
    const expansion_points = localStorage.getItem("expansion_points") as string;
    if (expansion_points !== null) {
      dispatch({
        type: "UPDATE_LOCALSTORAGE_EXPANSION",
        payload: {
          expansionScore: parseInt(expansion_points),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="game_menu">
      <img src={Logo} alt="Logo" />
      <div className="game_menu_options">
        <button onClick={() => handleMode("normal")}>NORMAL MODE</button>
        <button onClick={() => handleMode("expansion")}>EXPANSION MODE</button>
      </div>
    </div>
  );
};
