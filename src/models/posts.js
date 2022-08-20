import FSDB from "file-system-db";
import { v4 as uuid } from "uuid";

const UsersModel = async () => {
  var db = new FSDB("./src/db.json", false);

  //return object
  var t = {};

  t.addPost = async (author, post, title) => {
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const uuidStr = uuid();
    const uuidProperty = uuidStr.replaceAll("-", "");
    const data = {
      author: author,
      createdAt: createdAt,
      title: title,
      post: post,
    }; 
    const targetName = "posts." + uuidProperty;
    await db.set(targetName, data);

    return true;
  };

  t.getById = async (id) => {
    const posts = await db.get("posts");

    for (const [key, value] of Object.entries(posts)) {
      console.log('id', id);
      console.log('key', key);
      
      let trimKey = key.trim();
      let trimId = id.trim();
      
      if (trimKey === trimId) {
        return { ...value, id: trimId };
      }
    }

    return null;
  };

  t.deleteByUuid = async (uuid) => {
    const status = await t.getByUuid(uuid);

    if (status) {
      db.delete("posts." + uuid);
      return true;
    }

    return false;
  };

  t.getAll = async () => {
    const posts = await db.get("posts");

    if (posts) {
      return posts;
    }

    return null;
  };

  t.test = () => {
    console.log("usersController model cl");
    return "model test";
  };

  return t;
};

export default UsersModel;
