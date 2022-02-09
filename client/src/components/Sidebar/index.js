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
import { isActiveChannel } from "../../utils";
import ChannelTitle from "./ChannelTitle";
import { useNavigate } from "react-router-dom";
// Utils
import Tooltip from "../../ui/Tooltip";

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
  onClickDeleteRole,
}) => {
  const navigate = useNavigate();

  const [headerMenuIsOpen, setHeaderMenuIsOpen] = useState(false);
  const headerMenu = useMenuState();
  const headerRef = useRef(null);

  const [statusMenuIsOpen, setStatusMenuIsOpen] = useState(false);
  const statusMenu = useMenuState();
  const statusRef = useRef(null);

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
        onClickDeleteRole={onClickDeleteRole}
      />
      <UserAccountModal
        closeModal={() => setUserAccountModalData(undefined)}
        data={userAccountModalData}
        user={localUser}
        onClickLogout={onClickLogout}
        onEditUserAccount={onEditUserAccount}
      />
      <div>
        <Header onClick={onClickHeader} ref={headerRef}>
          {server.name}
        </Header>
        <Menu
          state={headerMenu.state}
          endTransition={headerMenu.endTransition}
          anchorRef={headerRef}
          onClose={() => headerMenu.toggleMenu(false)}
          offsetY={10}
          offsetX={10}
        >
          <MenuItem onClick={() => setServerSettingsModalData({})}>
            Server Settings
          </MenuItem>
          <MenuItem onClick={() => setNewChannelModalData({})}>
            Create Channel
          </MenuItem>
          <MenuItem onClick={() => setNewCategoryModalData({})}>
            Create Category
          </MenuItem>
          <MenuItem onClick={onClickLeaveServer} color="red">
            Leave Server
          </MenuItem>
        </Menu>
        {loneChannels.map((channel) => (
          <ChannelTitle
            key={channel._id}
            {...channel}
            isActive={isActiveChannel(activeChannel)(channel)}
            onClickEditChannel={() => setEditChannelModalData({ channel })}
            onClickDeleteChannel={() => setDeleteChannelModalData({ channel })}
          />
        ))}
        {Object.values(channelsByCategory).map(({ category, channels }) => (
          <ChannelCategory
            key={category._id}
            name={category.name}
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
          <Menu
            state={statusMenu.state}
            endTransition={statusMenu.endTransition}
            anchorRef={statusRef}
            onClose={() => statusMenu.toggleMenu(false)}
            offsetY={15}
          >
            <MenuItem>Online</MenuItem>
            <MenuItem>Idle</MenuItem>
            <MenuItem>Do Not Disturb</MenuItem>
            <MenuItem>Invisible</MenuItem>
          </Menu>
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
