import { React, useRef, useState } from "react";
//Components
import ChannelCategory from "./ChannelCategory";
// Styles
import {
  Container,
  Header,
  UserPanel,
  IconContainer,
  UserTag,
  OnlineStatusIndicatorIcon,
} from "./Sidebar.styles";
// Assets
import gearIcon from "../../assets/cog-solid.svg";
import { Menu } from "../../ui/Menus";
import { MenuItem, useMenuState } from "@szhsin/react-menu";
import NewChannelModal from "../NewChannelModal";
import EditChannelModal from "../EditChannelModal";
import DeleteChannelModal from "../DeleteChannelModal";
import NewCategoryModal from "../NewCategoryModal";
import EditCategoryModal from "../EditCategoryModal";
import DeleteCategoryModal from "../DeleteCategoryModal";
import ServerSettingsModal from "../ServerSettingsModal";
import UserAccountModal from "../UserAccountModal";
import { isActiveChannel, userHasPermission } from "../../utils";
import ChannelTitle from "./ChannelTitle";
import { useNavigate } from "react-router-dom";
// Utils
import Tooltip from "../../ui/Tooltip";
import UserLegendModal from "../UserLegendModal";

const Sidebar = ({
  server,
  serverUsers,
  categories,
  channels,
  activeChannel,
  localUser,
  onUserLeftServer,
  onEditUserAccount,
  onEditServerSettings,
  onClickDeleteServer,
  onClickLogout,
  onClickNewChannel,
  onEditChannel,
  onClickDeleteChannel,
  onClickNewCategory,
  onEditCategory,
  onClickDeleteCategory,
  onClickAddRole,
  onEditRole,
  onClickDeleteRole,
  onAddNewRoleToUser,
  onRemoveRoleFromUser,
  onChangeOnlineStatus,
}) => {
  const navigate = useNavigate();

  const [headerMenuIsOpen, setHeaderMenuIsOpen] = useState(false);
  const headerMenu = useMenuState();
  const headerRef = useRef(null);

  const [statusMenuIsOpen, setStatusMenuIsOpen] = useState(false);
  const statusMenu = useMenuState();
  const statusRef = useRef(null);

  const [copiedTooltipIsOpen, setCopiedTooltipOpen] = useState(false);

  const [userAccountModalData, setUserAccountModalData] = useState(undefined);
  const [serverSettingsModalData, setServerSettingsModalData] =
    useState(undefined);

  const [newChannelModalData, setNewChannelModalData] = useState(undefined);
  const [editChannelModalData, setEditChannelModalData] = useState(undefined);
  const [deleteChannelModalData, setDeleteChannelModalData] =
    useState(undefined);
  const [newCategoryModalData, setNewCategoryModalData] = useState(undefined);
  const [editCategoryModalData, setEditCategoryModalData] = useState(undefined);
  const [deleteCategoryModalData, setDeleteCategoryModalData] =
    useState(undefined);

  const [userLegendModalOpen, setUserLegendModalOpen] = useState(false);

  const onClickHeader = () => {
    setHeaderMenuIsOpen(!headerMenuIsOpen);
    headerMenu.toggleMenu(!headerMenuIsOpen);
  };

  const onClickStatusProfilePic = () => {
    setStatusMenuIsOpen(!statusMenuIsOpen);
    statusMenu.toggleMenu(!statusMenuIsOpen);
  };

  const onClickLeaveServer = () => {
    onUserLeftServer();
    navigate("/", { replace: true });
  };

  const loneChannels = [];
  const channelsByCategory = {};
  for (const category of categories) {
    channelsByCategory[category._id] = {
      category,
      channels: [],
    };
  }
  for (const channel of channels) {
    if (channel.categoryId) {
      channelsByCategory[channel.categoryId].channels.push(channel);
    } else {
      loneChannels.push(channel);
    }
  }

  const onClickInvitePeople = () => {
    setCopiedTooltipOpen(true);
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CLIENT_URL}/invite/${server._id}`
    );
  };

  return (
    <Container>
      <NewChannelModal
        closeModal={() => setNewChannelModalData(undefined)}
        data={newChannelModalData}
        onClickNewChannel={onClickNewChannel}
      />
      <EditChannelModal
        closeModal={() => setEditChannelModalData(undefined)}
        data={editChannelModalData}
        onEditChannel={onEditChannel}
      />
      <DeleteChannelModal
        closeModal={() => setDeleteChannelModalData(undefined)}
        data={deleteChannelModalData}
        onClickDeleteChannel={onClickDeleteChannel}
      />
      <NewCategoryModal
        closeModal={() => setNewCategoryModalData(undefined)}
        data={newCategoryModalData}
        onClickNewCategory={onClickNewCategory}
      />
      <EditCategoryModal
        closeModal={() => setEditCategoryModalData(undefined)}
        data={editCategoryModalData}
        onEditCategory={onEditCategory}
      />
      <DeleteCategoryModal
        closeModal={() => setDeleteCategoryModalData(undefined)}
        data={deleteCategoryModalData}
        onClickDeleteCategory={onClickDeleteCategory}
      />
      <ServerSettingsModal
        closeModal={() => setServerSettingsModalData(undefined)}
        data={serverSettingsModalData}
        server={server}
        serverUsers={serverUsers}
        onEditServerSettings={onEditServerSettings}
        onClickDeleteServer={onClickDeleteServer}
        onClickAddRole={onClickAddRole}
        onEditRole={onEditRole}
        onClickDeleteRole={onClickDeleteRole}
        onAddNewRoleToUser={onAddNewRoleToUser}
        onRemoveRoleFromUser={onRemoveRoleFromUser}
      />
      <UserAccountModal
        closeModal={() => setUserAccountModalData(undefined)}
        data={userAccountModalData}
        user={localUser}
        onClickLogout={onClickLogout}
        onEditUserAccount={onEditUserAccount}
      />
      <div>
        <Tooltip
          open={copiedTooltipIsOpen}
          title="Copied!"
          placement="bottom-end"
          arrow={false}
        >
          <Header onClick={onClickHeader} ref={headerRef}>
            {server.name}
          </Header>
        </Tooltip>
        <Menu
          state={headerMenu.state}
          endTransition={headerMenu.endTransition}
          anchorRef={headerRef}
          onClose={() => {
            setTimeout(() => {
              setCopiedTooltipOpen(false);
            }, 1000);
            setHeaderMenuIsOpen(false);
            headerMenu.toggleMenu(false);
          }}
          offsetY={10}
          offsetX={10}
        >
          <MenuItem onClick={onClickInvitePeople}>Invite People</MenuItem>
          {userHasPermission(localUser, server, "manage-server") && (
            <>
              <MenuItem onClick={() => setServerSettingsModalData({})}>
                Server Settings
              </MenuItem>
            </>
          )}
          {userHasPermission(localUser, server, "manage-channels") && (
            <>
              <MenuItem onClick={() => setNewChannelModalData({})}>
                Create Channel
              </MenuItem>
              <MenuItem onClick={() => setNewCategoryModalData({})}>
                Create Category
              </MenuItem>
            </>
          )}
          <MenuItem onClick={onClickLeaveServer} color="red">
            Leave Server
          </MenuItem>
        </Menu>
        {loneChannels.map((channel) => (
          <ChannelTitle
            key={channel._id}
            {...channel}
            localUser={localUser}
            server={server}
            isActive={isActiveChannel(activeChannel)(channel)}
            onClickEditChannel={() => setEditChannelModalData({ channel })}
            onClickDeleteChannel={() => setDeleteChannelModalData({ channel })}
          />
        ))}
        {Object.values(channelsByCategory).map(({ category, channels }) => (
          <ChannelCategory
            key={category._id}
            name={category.name}
            localUser={localUser}
            server={server}
            channels={channels}
            activeChannel={activeChannel}
            onClickNewChannel={() => setNewChannelModalData({ category })}
            onClickEditChannel={(channel) =>
              setEditChannelModalData({ channel })
            }
            onClickDeleteChannel={(channel) =>
              setDeleteChannelModalData({ channel })
            }
            onClickEditCategory={() => setEditCategoryModalData({ category })}
            onClickDeleteCategory={() =>
              setDeleteCategoryModalData({ category })
            }
          />
        ))}
      </div>
      <UserPanel>
        <UserTag>
          <img
            style={{
              backgroundColor: localUser.avatarUrl
                ? "none"
                : localUser.bannerColor,
            }}
            src={localUser.avatarUrl || "/default-user-logo.svg"}
            alt="profile pic"
            ref={statusRef}
            onClick={onClickStatusProfilePic}
          />
          <Tooltip title={localUser.onlineStatus}>
            <OnlineStatusIndicatorIcon className={localUser.onlineStatus} />
          </Tooltip>
          <Menu
            state={statusMenu.state}
            endTransition={statusMenu.endTransition}
            anchorRef={statusRef}
            onClose={() => {
              setStatusMenuIsOpen(false);
              statusMenu.toggleMenu(false);
            }}
            offsetY={15}
          >
            <MenuItem
              className="user-status"
              onClick={() => onChangeOnlineStatus("online")}
            >
              <div
                style={{
                  backgroundColor: "#3ba55d",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  marginRight: "10px",
                }}
              />
              <div>Online</div>
            </MenuItem>
            <MenuItem
              className="user-status"
              onClick={() => onChangeOnlineStatus("idle")}
            >
              <div
                style={{
                  backgroundColor: "#faa81a",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  marginRight: "10px",
                }}
              />
              <div>Idle</div>
            </MenuItem>
            <MenuItem
              className="user-status"
              onClick={() => onChangeOnlineStatus("do-not-disturb")}
            >
              <div
                style={{
                  backgroundColor: "#ed4245",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  marginRight: "10px",
                }}
              />
              <div>Do not disturb</div>
            </MenuItem>
            <MenuItem
              className="user-status"
              onClick={() => onChangeOnlineStatus("invisible")}
            >
              <div
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  border: "3px solid #b9bbbe",
                  width: "10px",
                  height: "10px",
                  marginRight: "10px",
                }}
              />
              <div>Invisible</div>
            </MenuItem>
            <MenuItem
              className="user-status"
              onClick={() => setUserLegendModalOpen(true)}
            >
              😀 Set a custom legend
            </MenuItem>
          </Menu>
          <UserLegendModal
            localUser={localUser}
            isOpen={userLegendModalOpen}
            closeModal={() => setUserLegendModalOpen(false)}
            onEditUserAccount={onEditUserAccount}
          />
          <div>
            <h3>{localUser.name}</h3>
            <p>{localUser.legend}</p>
          </div>
        </UserTag>
        <Tooltip title="User settings" placement="top">
          <IconContainer onClick={() => setUserAccountModalData({})}>
            <img src={gearIcon} alt="settings" />
          </IconContainer>
        </Tooltip>
      </UserPanel>
    </Container>
  );
};

export default Sidebar;
