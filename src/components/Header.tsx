import { useContext } from "react";
import normalLogoImg from "../assets/images/logo.svg";
import expansionLogoImg from "../assets/images/logo-bonus.svg";
import resetBtn from "../assets/images/icon-reset.svg";
import { GameContext } from "../context/gameContext";

export interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
  const {
    gameState: { gameType, scoreExpansion, scoreNormal },
    dispatch,
  } = useContext(GameContext);
  const handleResetScore = () => {
    if (gameType === "normal") {
      dispatch({
        type: "RESET_NORMAL_SCORE",
      });
      localStorage.setItem("normal_points", "0");
    } else {
      dispatch({
        type: "RESET_EXPANSION_SCORE",
      });
      localStorage.setItem("expansion_points", "0");
    }
  };

  return (
    <header className="header-score">
      <img
        src={gameType === "normal" ? normalLogoImg : expansionLogoImg}
        alt="logo"
        className="logo"
      />
      <button onClick={handleResetScore} className="btn_reset" title="Reset score">
        <img src={resetBtn} alt="Reset Button" />
      </button>

      <div className="score">
        <span>SCORE</span>
        <p>{gameType === "normal" ? scoreNormal : scoreExpansion}</p>
      </div>
    </header>
  );
};

export default Header;
