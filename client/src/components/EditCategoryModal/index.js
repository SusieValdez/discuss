import { React, useState } from "react";
import Modal from "react-modal";
// Styles
import {
  Container,
  OptionSidebar,
  OptionSidebarContainer,
  OptionSidebarHeader,
  Divider,
  DeleteButton,
  IconContainer,
  Content,
} from "./EditCategoryModal.styles";
// Assets
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";

const EditCategoryModal = ({ closeModal, data, onEditCategory }) => {
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const onChangeEditCategoryName = (e) => {
    setEditedCategoryName(e.target.value);
  };

  const onKeyPressEditCategoryName = (e) => {
    if (editedCategoryName.length > 0 && e.key === "Enter") {
      onEditCategory(data.category._id, { name: editedCategoryName });
      closeModal();
    }
  };

  if (!data) {
    return <></>;
  }
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
          width: "100%",
          height: "100vh",
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
        <OptionSidebar>
          <OptionSidebarContainer>
            <OptionSidebarHeader>
              <h3>Text Channels</h3>
            </OptionSidebarHeader>
            <div>
              <p>Overview</p>
              <p>Permissions</p>
            </div>
            <Divider />
            <DeleteButton>
              <p>Delete Category</p>
            </DeleteButton>
          </OptionSidebarContainer>
        </OptionSidebar>
        <Content>
          <h2>Overview</h2>
          <h5>Category Name</h5>
          <input
            autoFocus
            placeholder="Text Channels"
            value={editedCategoryName}
            onChange={onChangeEditCategoryName}
            onKeyPress={onKeyPressEditCategoryName}
          />
        </Content>
        <IconContainer>
          <CloseIcon onClick={closeModal} />
        </IconContainer>
      </Container>
    </Modal>
  );
};

export default EditCategoryModal;
