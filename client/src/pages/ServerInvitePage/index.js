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

const ServerInvitePage = () => {
  return (
    <Container background={backgroundDrop}>
      <Card>
        <ServerInfo>
          <Header>
            <div></div>
            <p>You have been invited to join</p>
            <h3>Server Name</h3>
          </Header>
          <Members>
            <div>
              <div className="online" />
              <p>528 Online</p>
            </div>
            <div>
              <div className="offline" />
              <p>680 Members</p>
            </div>
          </Members>
        </ServerInfo>
        <AcceptButton>Accept Invite</AcceptButton>
      </Card>
    </Container>
  );
};

export default ServerInvitePage;
