import React, { useRef } from "react";
import Modal from "react-modal";
import {
  Container,
  Banner,
  Header,
  Content,
  RoleContainer,
  RoleDiv,
  RoleDot,
  AboutMe,
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

  const rolesWithoutEveryone = user.roles?.filter(
    ({ name }) => name !== "everyone"
  );

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
        <Banner
          style={{
            width,
            background: user.bannerImageUrl
              ? `url(${user.bannerImageUrl})`
              : user.bannerColor,
          }}
        ></Banner>
        <img
          src={user.avatarUrl || "/default-user-logo.svg"}
          style={{
            backgroundColor: user.avatarUrl ? "#18191c" : user.bannerColor,
          }}
          alt="user avatar"
        />
        <Header>
          <h2>{user.name}</h2>
          <p>{user.legend}</p>
        </Header>
        <hr className="solid" />
        <Content>
          {user.aboutMe && <h3>About Me</h3>}
          <AboutMe>
            {user.aboutMe?.split("\n").map((row, i) => (
              <p key={i}>{row}</p>
            ))}
          </AboutMe>
          <h3>
            {rolesWithoutEveryone
              ? rolesWithoutEveryone.length === 0
                ? "No Roles"
                : "Roles"
              : ""}
          </h3>
          <RoleContainer>
            {rolesWithoutEveryone?.map((role) => (
              <span>
                <RoleDiv key={role._id}>
                  <RoleDot color={role.color} />
                  {role.name}
                </RoleDiv>
              </span>
            ))}
          </RoleContainer>
          {/* <h3>Note</h3>
          <textarea placeholder="Click to add a note" /> */}
          {/* {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map(
            (_, i) => (
              <p key={i}>hello</p>
            )
          )} */}
          {/* <button onClick={closeModal}>close</button> */}
        </Content>
        {/* <Footer>
          <input placeholder={`Message @${user.name}`} />
        </Footer> */}
      </Container>
    </Modal>
  );
};

export default MiniUserProfileModal;
