import React, { useRef } from "react";
import Modal from "react-modal";

const width = 300;
const userSidebarCutoff = 400;
const modalMargin = 10;

Modal.setAppElement("#root");

const MiniUserProfileModal = ({ closeModal, data }) => {
  const contentRef = useRef(null);

  if (!data) {
    return <></>;
  }
  const { clickedTarget, user } = data;
  const targetBounds = clickedTarget.getBoundingClientRect();

  const left =
    targetBounds.left > userSidebarCutoff
      ? targetBounds.left - width - modalMargin
      : targetBounds.right + modalMargin;

  const onAfterOpen = () => {
    const bounds = contentRef.current.getBoundingClientRect();
    const top = bounds.top <= 0 ? "0px" : "auto";
    const bottom = Math.max(
      window.innerHeight - (targetBounds.top + bounds.height),
      0
    );
    contentRef.current.style.inset = `${top} auto ${bottom}px ${left}px`;
    if (top === "0px") {
      contentRef.current.style.overflow = "hidden";
      contentRef.current.style.overflowY = "scroll";
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      onAfterOpen={onAfterOpen}
      style={{
        overlay: {
          backgroundColor: "none",
        },
        content: {
          padding: 0,
          top: "auto",
          left,
          right: "auto",
        },
      }}
      contentRef={(el) => (contentRef.current = el)}
      contentLabel="User Profile"
    >
      <div style={{ width, padding: 20, background: "red" }}>
        <h2>{user.name}</h2>
        <button onClick={closeModal}>close</button>
        {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map(
          (_, i) => (
            <p key={i}>hello</p>
          )
        )}
      </div>
    </Modal>
  );
};

export default MiniUserProfileModal;
