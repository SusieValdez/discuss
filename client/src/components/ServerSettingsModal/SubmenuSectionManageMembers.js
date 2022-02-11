import { React, useState } from "react";
// Components
import MiniUserProfileModal from "../MiniUserProfileModal";
// Styles
import {
  Container,
  SearchSection,
  ButtonAddMembers,
  MembersList,
  MemberRow,
  MemberDetails,
} from "./ManageMembers.styles";
// Assets
import { ReactComponent as RemoveMember } from "../../assets/close-icon.svg";
import { userHasRole } from "../../utils";

const userNameMatchesSearch = (searchQuery) => (user) =>
  user.name.toLowerCase().match(searchQuery.toLowerCase()) !== null;

const SubmenuSectionManageMembers = ({ users, selectedRole }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userModalData, setUserModalData] = useState(undefined);

  const openUserModal = (user) => (e) => {
    setUserModalData({ clickedTarget: e.target, user });
  };

  const closeUserModal = () => {
    setUserModalData(undefined);
  };

  const filteredUsers = (
    selectedRole
      ? users.filter((user) => userHasRole(user, selectedRole))
      : users
  ).filter(userNameMatchesSearch(searchQuery));

  return (
    <Container>
      <SearchSection>
        <input
          type="text"
          placeholder="Search Members"
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <ButtonAddMembers>Add Members</ButtonAddMembers>
      </SearchSection>
      <MembersList>
        {filteredUsers.map((user) => (
          <MemberRow key={user._id}>
            <MemberDetails onClick={openUserModal(user)}>
              <img src={user.avatarUrl} alt="user avatar" />
              <h2>{user.name}</h2>
              <span>{user.legend}</span>
            </MemberDetails>
            <RemoveMember />
          </MemberRow>
        ))}
      </MembersList>
      <MiniUserProfileModal closeModal={closeUserModal} data={userModalData} />
    </Container>
  );
};

export default SubmenuSectionManageMembers;
