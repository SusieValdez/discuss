import React, { useRef } from "react";
import Modal from "react-modal";
import {
  Container,
  Banner,
  Header,
  Content,
  RoleContainer,
  RoleDiv,
  Footer,
} from "./MiniUserProfile.styles";

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
          border: "none",
          borderRadius: "8px",
        },
      }}
      contentRef={(el) => (contentRef.current = el)}
      contentLabel="User Profile"
    >
      <Container style={{ width }}>
        <Banner style={{ width, backgroundColor: user.bannerColor }}></Banner>
        <img
          src={user.avatarUrl}
          style={{ backgroundColor: user.bannerColor }}
        />
        <Header>
          <h2>{user.name}</h2>
          <p>{user.legend}</p>
        </Header>
        <hr class="solid" />
        <Content>
          <h3>Roles</h3>
          <RoleContainer>
            <RoleDiv>🚀 Rookie 🚀</RoleDiv>
            <RoleDiv>🎆 Community star 🎆</RoleDiv>
            <RoleDiv>🚩 Founder 🚩</RoleDiv>
            <RoleDiv>🧠 Brainiac 🧠</RoleDiv>
            <RoleDiv>🍕 Foodie 🍕</RoleDiv>
          </RoleContainer>
          <h3>Note</h3>
          <textarea>Click to add a note</textarea>
          {/* {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map(
            (_, i) => (
              <p key={i}>hello</p>
            )
          )} */}
          {/* <button onClick={closeModal}>close</button> */}
        </Content>
        <Footer>
          <input placeholder={`Message @${user.name}`}></input>
        </Footer>
      </Container>
    </Modal>
  );
};

export default MiniUserProfileModal;
