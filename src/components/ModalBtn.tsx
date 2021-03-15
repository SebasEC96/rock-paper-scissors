import { useContext } from "react";
import { GameContext } from "../context/gameContext";

interface IModalBtnProps {}

export const ModalBtn = (props: IModalBtnProps) => {
  const { dispatch } = useContext(GameContext);
  const handleRules = () => {
    dispatch({
      type: "GAME_MODAL",
    });
  };
  const handleMenu = () => {
    dispatch({
      type: "CHANGE_GAME_TYPE",
      payload: {gameType: ""}
    });
    dispatch({
      type: "GAME_STATUS",
      payload: {gameStatus: "menu"}
    });
  };
  return (
    <div className="modal_btn">
      <button onClick={handleMenu}>MENU</button>
      <button onClick={handleRules}>RULES</button>
    </div>
  );
};
