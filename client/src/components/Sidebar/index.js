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

const Sidebar = ({
  serverName,
  categories,
  channels,
  activeChannel,
  localUser,
  onClickLogout,
  onClickNewChannel,
  onClickEditChannel,
  onClickDeleteChannel,
  onClickNewCategory,
  onClickDeleteCategory,
}) => {
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
        onClickEditChannel={onClickEditChannel}
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
      />
      <DeleteCategoryModal
        closeModal={() => setDeleteCategoryModalData(undefined)}
        data={deleteCategoryModalData}
        onClickDeleteCategory={onClickDeleteCategory}
      />
      <ServerSettingsModal
        closeModal={() => setServerSettingsModalData(undefined)}
        data={serverSettingsModalData}
      />
      <UserAccountModal
        closeModal={() => setUserAccountModalData(undefined)}
        data={userAccountModalData}
        onClickLogout={onClickLogout}
      />
      <div>
        <Header onClick={onClickHeader} ref={headerRef}>
          {serverName}
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
          <MenuItem onClick={() => setNewCategoryModalData({})}>
            New Category
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
            style={{ backgroundColor: localUser.bannerColor }}
            src={localUser.avatarUrl}
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
        <IconContainer onClick={() => setUserAccountModalData({})}>
          <img src={gearIcon} alt="settings" />
        </IconContainer>
      </UserPanel>
    </Container>
  );
};

export default Sidebar;
