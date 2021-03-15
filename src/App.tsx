import { GameScreen } from "./pages";
import { GameProvider } from "./context/gameContext";

interface Props {}

export const App = (props: Props) => {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
};

export default App;
