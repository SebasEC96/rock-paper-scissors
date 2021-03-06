import normalRules from "../assets/images/image-rules.svg";
import expansionRules from "../assets/images/image-rules-bonus.svg";
import btnClose from "../assets/images/close-btn.svg";
import Modal from "react-modal";
import { useContext } from "react";
import { GameContext } from "../context/gameContext";

interface IGameRulesProps {
  gameType: string;
}

export const GameRules = (props: IGameRulesProps) => {
  const {
    gameState: { modalIsOpen },
    dispatch,
  } = useContext(GameContext);
  const closeModal = () => {
    dispatch({
      type: "GAME_MODAL",
    });
  };

  return (
    <Modal
      className="rules_modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById("root") as HTMLElement}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.10)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          border: "0",
          background: "#fff",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
      contentLabel="Rules Modal"
    >
      {props.gameType === "normal" && (
        <img src={normalRules} alt="Normal Rules" width="250px" />
      )}
      {props.gameType === "expansion" && (
        <img src={expansionRules} alt="Expansion Rules" width="250px" />
      )}
      <img
        src={btnClose}
        alt="Close Modal"
        onClick={closeModal}
        className="modal_close_btn"
      ></img>
    </Modal>
  );
};
