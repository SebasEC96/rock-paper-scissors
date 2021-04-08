import { useContext, useEffect } from "react";
import { GameContext } from "../../context/gameContext";
import GameStarted from "./GameStarted";
import Header from "../../components/Header";
import GameSection from "./GameSection";
import { GameRules } from "../../components/GameRules";
import { ModalBtn } from "../../components/ModalBtn";
import { GameMenu } from "./GameMenu";

export const GameScreen = () => {
  const {
    gameState: { gameStatus, gameType, selectedOption },
  } = useContext(GameContext);

  const normal_points = localStorage.getItem("normal_points");
  const expansion_points = localStorage.getItem("expansion_points");
  useEffect(() => {
    if (!normal_points) {
      localStorage.setItem("normal_points", "0");
    }
    if (!expansion_points) {
      localStorage.setItem("expansion_points", "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      {gameStatus !== "menu" && <Header />}
      {gameType === "" && <GameMenu />}
      {gameType !== "" && gameStatus === "standBy" && (
        <GameSection gameType={gameType} />
      )}
      {gameStatus !== "standBy" && gameStatus !== "menu" && (
        <GameStarted option={selectedOption} />
      )}
      {gameStatus !== "menu" && <ModalBtn />}
      <GameRules gameType={gameType} />
    </div>
  );
};
