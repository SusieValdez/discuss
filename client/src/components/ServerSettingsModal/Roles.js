import React, { useCallback, useState } from "react";
// Components
import RoleEdit from "./RoleEdit";
// Styles
import {
  Container,
  Content,
  DefaultPermissions,
  CreateNewRole,
  ButtonCreateRole,
  RolesContainer,
  RolesTitles,
  RoleRow,
} from "./Roles.styles";
// Assets
import { ReactComponent as ChevronRightIcon } from "../../assets/chevron-right-solid.svg";
import { ReactComponent as UsersIcon } from "../../assets/user-friends-solid.svg";
import { ReactComponent as UserIcon } from "../../assets/single-user-solid.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-solid.svg";

const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

const substrings = (str, len) => {
  const substrings = [];
  for (let i = 0; i <= str.length - len; i++) {
    substrings.push(str.slice(i, i + len));
  }
  return substrings;
};

const minLevensteinDistanceOfSubstrings = (str1, substringLength, str2) =>
  Math.min(
    ...substrings(str1, substringLength).map((substring) =>
      levenshteinDistance(substring, str2)
    )
  );

const Roles = ({ users, roles, onClickAddRole, onClickDeleteRole }) => {
  const [selectedRole, setSelectedRole] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const roleCounts = {};
  for (const role of roles) {
    roleCounts[role._id] = 0;
  }
  for (const user of users) {
    for (const role of user.roles) {
      roleCounts[role._id]++;
    }
  }

  const onSelectRole = useCallback(
    (role) => () => {
      setSelectedRole(role);
    },
    [setSelectedRole]
  );

  const onDeselectRole = () => {
    setSelectedRole(undefined);
  };

  if (selectedRole) {
    return (
      <RoleEdit
        onSelectRole={onSelectRole}
        onClickBack={onDeselectRole}
        roles={roles}
        selectedRole={selectedRole}
        users={users}
        roleCounts={roleCounts}
        onClickAddRole={onClickAddRole}
        onClickDeleteRole={onClickDeleteRole}
      />
    );
  }

  const searchedRoles =
    searchQuery === ""
      ? roles
      : [...roles].sort((s1, s2) => {
          const queryLength = searchQuery.length;
          const query = searchQuery.toLowerCase();
          return (
            minLevensteinDistanceOfSubstrings(
              s1.name.toLowerCase(),
              queryLength,
              query
            ) -
            minLevensteinDistanceOfSubstrings(
              s2.name.toLowerCase(),
              queryLength,
              query
            )
          );
        });

  return (
    <Container>
      <Content>
        <h1>Roles</h1>
        <p>
          Use roles to organize your server members and customize their
          permissions
        </p>
        <DefaultPermissions>
          <UsersIcon />
          <div>
            <h3>Default Permissions</h3>
            <p>@everyone | applies to all server members</p>
          </div>
          <ChevronRightIcon />
        </DefaultPermissions>
        <CreateNewRole>
          <input
            type="text"
            placeholder="Search Roles"
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <SearchIcon />
          <ButtonCreateRole onClick={onClickAddRole}>
            Create Role
          </ButtonCreateRole>
        </CreateNewRole>
        <p>
          Members use the color of the highest role they have on this list. Drag
          roles to reorder them.
        </p>
        <RolesTitles>
          <h4>Roles</h4>
          <h4>Members</h4>
        </RolesTitles>
        <RolesContainer>
          {searchedRoles.map((role) => (
            <RoleRow key={role._id} onClick={onSelectRole(role)}>
              <h2>{role.name}</h2>
              <div>
                <span>
                  {roleCounts[role._id]} <UserIcon className="svg-icon" />
                </span>
              </div>
            </RoleRow>
          ))}
        </RolesContainer>
      </Content>
    </Container>
  );
};

export default Roles;
