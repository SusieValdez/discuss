import React, { useState } from "react";
import Modal from "react-modal";
import {
  Container,
  Header,
  Content,
  // PrivateSwitch,
  Footer,
} from "./NewChannelModal.styles";
// import Switch from "@mui/material/Switch";

const NewChannelModal = ({ closeModal, data, onClickNewChannel }) => {
  const [newChannelName, setNewChannelName] = useState("");

  if (!data) {
    return <></>;
  }

  const { category } = data;

  const onChangeNewChannelName = (e) => {
    setNewChannelName(e.target.value);
  };

  const onClickConfirm = () => {
    if (newChannelName.length === 0) {
      return;
    }
    setNewChannelName("");
    onClickNewChannel(category?._id, newChannelName);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(6, 5, 8, 0.918)",
        },
        content: {
          padding: 0,
          borderRadius: "8px",
          width: "440px",
          border: "none",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <Container>
        <Content>
          <Header>
            <h3>Create Channel</h3>
            {category && <div>In {category.name}</div>}
          </Header>
          <div>
            <h5>Channel name</h5>
            <input
              autoFocus
              value={newChannelName}
              onChange={onChangeNewChannelName}
            />
          </div>
          {/* <div>
            <PrivateSwitch>
              <h5>Private Channel</h5>
              <Switch />
            </PrivateSwitch>
            <p>
              By making a channel private, only select members and roles will be
              able to view this channel.
            </p>
          </div> */}
        </Content>
        <Footer>
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
          <button
            className={`create-button ${
              newChannelName.length > 0 ? "active" : "disabled"
            }`}
            onClick={onClickConfirm}
          >
            Create Channel
          </button>
        </Footer>
      </Container>
    </Modal>
  );
};

export default NewChannelModal;
