import { useContext } from "react";
import normalLogoImg from "../assets/images/logo.svg";
import expansionLogoImg from "../assets/images/logo-bonus.svg";
import { GameContext } from "../context/gameContext";

export interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
  const {
    gameState: { gameType, scoreExpansion, scoreNormal },
  } = useContext(GameContext);
  return (
    <header className="header-score">
      <img
        src={gameType === "normal" ? normalLogoImg : expansionLogoImg}
        alt="logo"
        className="logo"
      />

      <div className="score">
        <span>SCORE</span>
        <p>{gameType === "normal" ? scoreNormal : scoreExpansion}</p>
      </div>
    </header>
  );
};

export default Header;
