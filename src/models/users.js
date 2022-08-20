import FSDB from "file-system-db";
import { v4 as uuid } from "uuid";

const UsersModel = async () => {
  var db = new FSDB("./src/db.json", false);

  //return object
  var t = {};

  //methods
  t.addUser = async (email, password) => {
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const uuidStr = uuid();
    const uuidProperty = uuidStr.replaceAll("-", "");
    const data = { createdAt: createdAt, email: email, password: password };
    const targetName = "users." + uuidProperty;
    await db.set(targetName, data);

    return true;
  };

  t.getByUuid = async (uuid) => {
    const users = await db.get("users");

    for (const [key, value] of Object.entries(users)) {
      if (key === uuid) {
        return { ...value, id: uuid };
      }
    }

    return null;
  };

  t.getByEmail = async (email) => {
    const users = await db.get("users");

    for (const [key, value] of Object.entries(users)) {
      if (value.email === email) {
        return { ...value, id: key };
      }
    }

    return null;
  };

  t.deleteByUuid = async (uuid) => {
    const status = await t.getByUuid(uuid);

    if (status) {
      db.delete("users." + uuid);
      return true;
    }

    return false;
  };

  t.getAll = async () => {
    const users = await db.get("users");

    if (users) {
      return users;
    }

    return null;
  };


  return t;
};

export default UsersModel;
