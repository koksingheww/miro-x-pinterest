"use client";

function Button(board: any) {
  const { id } = board.board;

  const openModal = async () => {
    await window.miro.board.ui.openModal({
      url: `/import/${id}`,
      width: 1024,
      height: 720,
    });
  };

  return (
    <button className="button button-primary" type="button" onClick={openModal}>
      View Pins
    </button>
  );
}

export default Button;
