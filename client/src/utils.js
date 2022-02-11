export const arrayToMap = (array, key = "_id") => {
  const result = {};
  for (const item of array) {
    result[item[key]] = item;
  }
  return result;
};

export const updateIf = (array, pred, updateFn) =>
  array.map((item, i) => (pred(item, i) ? updateFn(item) : item));

export const deepUpdate = (obj, path, updateFn) => {
  if (path.length === 0) {
    return updateFn(obj);
  }
  const [head, ...tail] = path;
  if (obj instanceof Array) {
    const array = obj;
    switch (typeof head) {
      case "number":
        return updateIf(
          array,
          (_, i) => i === head,
          (item) => deepUpdate(item, tail, updateFn)
        );
      case "function":
        return updateIf(array, head, (item) =>
          deepUpdate(item, tail, updateFn)
        );
      default:
        throw Error(
          `Invalid path item '${head}'. When updating a child of an array, the path item must be a number, or function compatible with Array.find`
        );
    }
  } else {
    switch (typeof head) {
      case "string":
        return {
          ...obj,
          [head]: deepUpdate(obj[head], tail, updateFn),
        };
      case "function":
        const [key, nextObj] = Object.entries(obj).find(head);
        return {
          ...obj,
          [key]: deepUpdate(nextObj, tail, updateFn),
        };
      default:
        throw Error(
          `Invalid path item '${head}'. When updating a child of an array, the path item must be a number, or function compatible with Array.find`
        );
    }
  }
};

export const isActiveChannel = (activeChannel) => (channel) =>
  channel._id === activeChannel._id;

export const isUserInServer = (user, server) =>
  server.users.map(({ userId }) => userId).includes(user._id);

export const userHasRole = (user, role) => {
  return user.roles.map(({ _id }) => _id).includes(role._id);
};

export const topRoleColor = (user) => {
  return user.roles[0].color;
};

export const getEveryoneRole = (roles) => roles[roles.length - 1];
