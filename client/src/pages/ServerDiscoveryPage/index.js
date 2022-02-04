import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { isUserInServer } from "../../utils";
import {
  Container,
  DiscoveryHeroImage,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalFooter,
  CardContainer,
  ServerCard,
  ImageHolder,
  Members,
} from "./ServerDiscoveryPage.styles";
// Assets
import HeroImage from "../../assets/login-background.svg";

const ServerDiscoveryPage = ({ localUser, servers, onUserJoinedServer }) => {
  const navigate = useNavigate();
  const [serverModalData, setServerModalData] = useState(undefined);
  const closeModal = () => setServerModalData(undefined);

  const onClickJoin = () => {
    if (isUserInServer(localUser, serverModalData.server)) {
      return;
    }
    const serverId = serverModalData.server._id;
    onUserJoinedServer(serverId);
    setTimeout(() => {
      navigate(`/servers/${serverId}`, { replace: true });
    }, 300);
  };

  return (
    <Container>
      <Modal
        isOpen={serverModalData !== undefined}
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
        {serverModalData && (
          <ModalContainer>
            <ModalHeader>
              <h3>Join "{serverModalData.server.name}"</h3>
            </ModalHeader>
            <ModalContent></ModalContent>
            <ModalFooter>
              <button onClick={closeModal} className="cancel-button">
                Cancel
              </button>
              <button
                onClick={onClickJoin}
                className={`join-button ${
                  isUserInServer(localUser, serverModalData.server)
                    ? "disabled"
                    : "active"
                }`}
              >
                Join Server
              </button>
            </ModalFooter>
          </ModalContainer>
        )}
      </Modal>
      <DiscoveryHeroImage background={HeroImage}>
        <input type="text" placeholder="Search servers" />
      </DiscoveryHeroImage>
      <h1>Featured communities</h1>
      <CardContainer>
        {servers.map((server) => (
          <ServerCard
            key={server._id}
            onClick={() => setServerModalData({ server })}
          >
            {" "}
            <div className="server-banner-color" />
            <ImageHolder>
              <img src={server.iconUrl} alt="server icon" />
            </ImageHolder>
            <div>
              <h4>{server.name}</h4>
            </div>
            <div>
              <p>Server description</p>
            </div>
            <Members>
              <div>
                <div className="online" />
                {server.users.length}{" "}
                {server.users.length > 1 ? "Members" : "Member"} online
              </div>
              <div>
                <div className="offline" />
                Members offline
              </div>
            </Members>
          </ServerCard>
        ))}
      </CardContainer>
    </Container>
  );
};

export default ServerDiscoveryPage;
