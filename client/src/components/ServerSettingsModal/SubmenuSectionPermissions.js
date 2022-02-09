import React from "react";
import Switch from "@mui/material/Switch";
// Styles
import { Permission, Container } from "./Permissions.styles";

const SubmenuSectionPermissions = () => {
  return (
    <Container>
      <h5>General Server Permissions</h5>
      <Permission>
        <div>
          <h4>View Channels</h4>
          <Switch />
        </div>
        <p>
          Allows members to view channels by default (excluding private
          channels).
        </p>
        <div className="line-break" />
      </Permission>
      <Permission>
        <div>
          <h4>Manage Channels</h4>
          <Switch />
        </div>
        <p>Allows members to create, edit, or delete channels.</p>
        <div className="line-break" />
      </Permission>
      <Permission>
        <div>
          <h4>Manage Roles</h4>
          <Switch />
        </div>
        <p>
          Allows members to create new roles and edit or delete roles lower than
          their highest role. Also allows members to change permissions of
          individual channels that they have access to.
        </p>
        <div className="line-break" />
      </Permission>
      <Permission>
        <div>
          <h4>Manage Server</h4>
          <Switch />
        </div>
        <p>
          Allows members to change this server’s name, switch regions, and add
          bots to this server.
        </p>
        <div className="line-break" />
      </Permission>
      <h5>Membership Permissions</h5>
      <Permission>
        <div>
          <h4>Create invite</h4>
          <Switch />
        </div>
        <p>Allows members to invite new people to this server.</p>
        <div className="line-break" />
      </Permission>
      <Permission>
        <div>
          <h4>Kick members</h4>
          <Switch />
        </div>
        <p>
          Allows members to remove other members from this server. Kicked
          members will be able to rejoin if they have another invite.
        </p>
        <div className="line-break" />
      </Permission>
      <Permission>
        <div>
          <h4>Ban members</h4>
          <Switch />
        </div>
        <p>Allows members to permanently ban other members from this server.</p>
        <div className="line-break" />
      </Permission>
      <Permission>
        <div>
          <h4>Ban members</h4>
          <Switch />
        </div>
        <p>Allows members to send messages in text channels.</p>
        <div className="line-break" />
      </Permission>
    </Container>
  );
};

export default SubmenuSectionPermissions;
