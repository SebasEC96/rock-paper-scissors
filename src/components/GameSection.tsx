import { GameOption } from "./GameOption";

interface IGameSectionProps {
  gameType: string;
}

const GameSection = (props: IGameSectionProps) => {
  return (
    <>
      {props.gameType === "normal" && (
        <section className="game_section_normal">
          <GameOption option="paper" className="first_element" />
          <GameOption option="scissors" className="second_element" />
          <GameOption option="rock" className="third_element" />
        </section>
      )}
      {props.gameType === "expansion" && (
        <section className="game_section_expansion">
          <GameOption option="paper" className="first_element" />
          <GameOption option="scissors" className="second_element" />
          <GameOption option="rock" className="third_element" />
          <div className="lower_section">
            <GameOption option="spock" className="fourth_element" />
            <GameOption option="lizard" className="fifth_element" />
          </div>
        </section>
      )}
    </>
  );
};

export default GameSection;
