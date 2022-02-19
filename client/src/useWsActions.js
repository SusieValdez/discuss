import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const useWsActions = (
  onEvent,
  { state, cookie, setLoginCode, setLoginCodeStatus, setCookie }
) => {
  const { sendJsonMessage: send, readyState: wsReadyState } = useWebSocket(
    `ws://${window.location.hostname}:8080`,
    {
      shouldReconnect: () => true,
      onMessage: ({ data }) => {
        const event = JSON.parse(data);
        console.log(event);
        if (event.kind === "SET_LOGIN_CODE") {
          setLoginCode(event.payload.loginCode);
          return;
        }
        if (event.kind === "SET_LOGIN_CODE_STATUS") {
          setLoginCodeStatus(event.payload.status);
          return;
        }
        if (!cookie && event.kind === "SET_STATE") {
          localStorage.setItem("cookie", event.payload.cookie);
          setCookie(event.payload.cookie);
        }
        // This is defends against such superfluous messages which might crash the app.
        // TODO: Prevent server from sending events to users who don't care about such messages
        //       For example, loggout out users, or users who aren't in servers receiving text messages
        if (!state && event.kind !== "SET_STATE") {
          return;
        }
        onEvent(event);
      },
    }
  );

  useEffect(() => {
    if (wsReadyState !== ReadyState.OPEN) {
      return;
    }
    if (!cookie) {
      send({
        kind: "REQUEST_LOGIN_CODE",
        payload: {},
      });
    } else {
      send({
        kind: "VERIFY_COOKIE",
        payload: {
          cookie,
        },
      });
    }
  }, [cookie, wsReadyState, send]);

  return {
    onClickRegister: (payload) => {
      send({
        kind: "REGISTER",
        payload,
      });
    },

    onClickLogin: (payload) => {
      send({
        kind: "LOGIN",
        payload,
      });
    },

    confirmLoginCode: (loginCode) => () => {
      setLoginCodeStatus("pending");
      send({
        kind: "CONFIRM_LOGIN_CODE",
        payload: { loginCode },
      });
    },

    onEditUserAccount: (updatedUser) => {
      send({
        kind: "EDIT_USER",
        payload: { updatedUser },
      });
    },

    onNewServer: (name) => {
      send({
        kind: "NEW_SERVER",
        payload: { name },
      });
    },

    onEditServerSettings: (serverId, updatedServer) => {
      send({
        kind: "EDIT_SERVER",
        payload: {
          serverId,
          updatedServer,
        },
      });
    },

    onClickDeleteServer: (serverId) => () => {
      send({
        kind: "DELETE_SERVER",
        payload: {
          serverId,
        },
      });
    },

    onNewMessage: (serverId, channelId) => (text) => {
      send({
        kind: "NEW_MESSAGE",
        payload: { text, serverId, channelId },
      });
    },

    onMessageEdit: (serverId, channelId) => (messageId) => (text) => {
      send({
        kind: "EDIT_MESSAGE",
        payload: { serverId, channelId, messageId, text },
      });
    },

    onClickDeleteMessage: (serverId, channelId) => (messageId) => () => {
      send({
        kind: "DELETE_MESSAGE",
        payload: { serverId, channelId, messageId },
      });
    },

    onTypingIndicatorChanged: (serverId, channelId) => (typingStatus) => {
      send({
        kind: "TYPING_INDICATOR_CHANGED",
        payload: { serverId, channelId, typingStatus },
      });
    },

    onUserJoinedServer: (serverId) => {
      send({
        kind: "USER_JOINED_SERVER",
        payload: { serverId },
      });
    },

    onUserLeftServer: (serverId) => () => {
      send({
        kind: "USER_LEFT_SERVER",
        payload: { serverId },
      });
    },

    onClickKick: (serverId) => (userId) => () => {
      send({
        kind: "KICK_USER",
        payload: { serverId, userId },
      });
    },

    onClickNewCategory: (serverId) => (name) => {
      send({
        kind: "ADD_CATEGORY",
        payload: { serverId, name },
      });
    },

    onEditCategory: (serverId) => (categoryId, updatedCategory) => {
      send({
        kind: "EDIT_CATEGORY",
        payload: { serverId, categoryId, updatedCategory },
      });
    },

    onClickDeleteCategory: (serverId) => (categoryId) => {
      send({
        kind: "DELETE_CATEGORY",
        payload: { serverId, categoryId },
      });
    },

    onClickNewChannel: (serverId) => (categoryId, name) => {
      send({
        kind: "ADD_CHANNEL",
        payload: { serverId, categoryId, name },
      });
    },

    onEditChannel: (serverId) => (channelId, updatedChannel) => {
      send({
        kind: "EDIT_CHANNEL",
        payload: { serverId, channelId, updatedChannel },
      });
    },

    onClickDeleteChannel: (serverId) => (channelId) => {
      send({
        kind: "DELETE_CHANNEL",
        payload: { serverId, channelId },
      });
    },

    onClickAddRole: (serverId) => () => {
      send({
        kind: "ADD_ROLE",
        payload: { serverId },
      });
    },

    onEditRole: (serverId) => (roleId, updatedRole) => {
      send({
        kind: "EDIT_ROLE",
        payload: { serverId, roleId, updatedRole },
      });
    },

    onClickDeleteRole: (serverId) => (roleId) => {
      send({
        kind: "DELETE_ROLE",
        payload: { serverId, roleId },
      });
    },

    onAddNewRoleToUser: (serverId) => (userId, roleId) => {
      send({
        kind: "ADD_ROLE_TO_USER",
        payload: { serverId, userId, roleId },
      });
    },

    onRemoveRoleFromUser: (serverId) => (userId, roleId) => {
      send({
        kind: "REMOVE_ROLE_FROM_USER",
        payload: { serverId, userId, roleId },
      });
    },

    onChangeOnlineStatus: (userId) => (desiredOnlineStatus) => {
      send({
        kind: "SET_ONLINE_STATUS",
        payload: { userId, desiredOnlineStatus },
      });
    },
  };
};

export default useWsActions;
