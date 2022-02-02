import React, { useRef, useState } from "react";
import Modal from "react-modal";
import {
  Container,
  Header,
  Content,
  PrivateCategory,
  Footer,
} from "./NewCategoryModal.styles";
import Switch from "@mui/material/Switch";

const NewCategoryModal = ({ closeModal, data, onClickNewCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const inputRef = useRef(null);

  const onChangeNewCategoryName = (e) => {
    setNewCategoryName(e.target.value);
  };

  const onClickConfirm = () => {
    if (newCategoryName.length === 0) {
      return;
    }
    onClickNewCategory(newCategoryName);
    closeModal();
  };

  if (!data) {
    return <></>;
  }
  return (
    <Modal
      isOpen={true}
      onAfterOpen={() => inputRef.current.focus()}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(6, 5, 8, 0.918)",
        },
        content: {
          padding: 0,
          borderRadius: "8px",
          width: "440px",
          height: "360px",
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
        <Header>
          <h3>Create Category</h3>
        </Header>
        <Content>
          <div>
            <h5>Category name</h5>
            <input value={newCategoryName} onChange={onChangeNewCategoryName} />
          </div>
          <div>
            <PrivateCategory>
              <h5>Private Category</h5>
              <Switch />
            </PrivateCategory>
            <p>
              By making a category private, only select members and roles will
              be able to view this category. Synced channels in this category
              will automatically match to this setting.
            </p>
          </div>
        </Content>
        <Footer>
          <button className="cancel-button">Cancel</button>
          <button
            className={`create-category-button ${
              newCategoryName.length > 0 ? "active" : "disabled"
            }`}
            onClick={onClickConfirm}
          >
            Create Category
          </button>
        </Footer>
      </Container>
    </Modal>
  );
};

export default NewCategoryModal;
