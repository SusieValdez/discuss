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

// const hasSubstring = (str1, str2) => str1.search(str2) !== -1;

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

const ServerDiscoveryPage = ({
  localUser,
  servers,
  onUserJoinedServer,
  userMap,
}) => {
  const navigate = useNavigate();
  const [serverModalData, setServerModalData] = useState(undefined);
  const closeModal = () => setServerModalData(undefined);

  const [searchQuery, setSearchQuery] = useState("");

  const categoriseOnlineStatus = (serverUsers) => {
    const startValue = {
      online: [],
      offline: [],
    };
    return serverUsers
      .map(({ userId }) => userMap[userId])
      .reduce((result, user) => {
        const status = user.onlineStatus;
        return {
          ...result,
          [status]: [...result[status], user],
        };
      }, startValue);
  };

  const searchedServers =
    searchQuery === ""
      ? servers
      : [...servers].sort((s1, s2) => {
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
        <input
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="text"
          placeholder="Search servers"
        />
      </DiscoveryHeroImage>
      <h1>Featured communities</h1>
      <CardContainer>
        {searchedServers.map((server) => {
          const { online, offline } = categoriseOnlineStatus(server.users);
          return (
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
                  {online.length} {online.length > 1 ? "Members" : "Member"}{" "}
                  online
                </div>
                <div>
                  <div className="offline" />
                  {offline.length} {offline.length > 1 ? "Members" : "Member"}{" "}
                  offline
                </div>
              </Members>
            </ServerCard>
          );
        })}
      </CardContainer>
    </Container>
  );
};

export default ServerDiscoveryPage;
