import { React } from "react";
// Styles
import {
  Container,
  Card,
  ServerInfo,
  Header,
  Members,
  AcceptButton,
} from "./ServerInvitePage.styles";
import backgroundDrop from "../../assets/login-background.svg";
import { Navigate, useParams } from "react-router-dom";
import { isUserInServer } from "../../utils";

const ServerInvitePage = ({ servers, localUser, userMap, onAcceptInvite }) => {
  const { inviteCode } = useParams();

  const serverId = inviteCode;

  const server = servers.find((s) => s._id === serverId);
  if (!server) {
    return <Navigate to="/" replace={true} />;
  }

  const onClickAcceptInvite = () => {
    onAcceptInvite(server._id);
  };

  if (isUserInServer(localUser, server)) {
    return <Navigate to={`/servers/${server._id}`} replace={true} />;
  }

  const online = server.users
    .map(({ userId }) => userMap[userId])
    .filter(({ onlineStatus }) => onlineStatus === "online");
  const numUsers = server.users.length;

  return (
    <Container background={backgroundDrop}>
      <Card>
        <ServerInfo>
          <Header>
            <img
              className="server-icon"
              style={{ backgroundColor: server.bannerColor }}
              src={server.iconUrl || "/default-user-logo.svg"}
              alt="server icon"
            ></img>
            <p>You have been invited to join</p>
            <h3>{server.name}</h3>
          </Header>
          <Members>
            <div>
              <div className="online" />
              <p>{online.length} Online</p>
            </div>
            <div>
              <div className="offline" />
              <p>{numUsers} Members</p>
            </div>
          </Members>
        </ServerInfo>
        <AcceptButton onClick={onClickAcceptInvite}>Accept Invite</AcceptButton>
      </Card>
    </Container>
  );
};

export default ServerInvitePage;
