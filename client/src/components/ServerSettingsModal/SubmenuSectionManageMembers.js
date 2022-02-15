import { React } from "react";
// Components
// Styles
import {
  Container,
  MembersList,
  MemberRow,
  MemberDetails,
} from "./ManageMembers.styles";
// Assets
import { ReactComponent as RemoveIcon } from "../../assets/close-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/plus-circle-solid.svg";
import { userHasRole } from "../../utils";

const SubmenuSectionManageMembers = ({
  users,
  selectedRole,
  onAddNewRoleToUser,
  onRemoveRoleFromUser,
}) => {
  return (
    <Container>
      {/* <SearchSection>
        <input
          type="text"
          placeholder="Search Members"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <ButtonAddMembers>Add Members</ButtonAddMembers>
      </SearchSection> */}
      <MembersList>
        {users.map((user) => (
          <MemberRow key={user._id}>
            <MemberDetails>
              <img src={user.avatarUrl} alt="user avatar" />
              <h2>{user.name}</h2>
              <span>{user.legend}</span>
            </MemberDetails>
            <div>
              {userHasRole(user, selectedRole) ? (
                <RemoveIcon
                  onClick={() =>
                    onRemoveRoleFromUser(user._id, selectedRole._id)
                  }
                />
              ) : (
                <AddIcon
                  onClick={() => onAddNewRoleToUser(user._id, selectedRole._id)}
                />
              )}
            </div>
          </MemberRow>
        ))}
      </MembersList>
    </Container>
  );
};

export default SubmenuSectionManageMembers;
