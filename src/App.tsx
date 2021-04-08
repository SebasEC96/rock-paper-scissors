import { GameProvider } from "./context/gameContext";
import { GameScreen } from "./pages/GameScreen";

interface Props {}

export const App = (props: Props) => {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
};

export default App;
