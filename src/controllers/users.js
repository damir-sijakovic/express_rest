import UsersModel from "../models/users.js";
import registerValidator from "../validators/register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UsersController = async () => {
  //private
  var model = await UsersModel();

  //return object
  var t = {};

  t.register = async (req, res) => {
    //email, password {"email":"alpha@gmail.com", "password":"12345678"}
    const data = req.body;
    const validateStatus = registerValidator(data);
    if (validateStatus) return res.status(400).json({ error: validateStatus });

    const emailExists = await model.getByEmail(data.email);
    if (emailExists)
      return res.status(409).json({ error: "Email already exists!" });

    const hashPassword = await bcrypt.hash(data.password, 10);
    const addUserStatus = await model.addUser(data.email, hashPassword);

    if (addUserStatus) {
      return res.status(200).json({ success: "User registrated!" });
    } else {
      return res.status(500).json({ error: "Can't add user!" });
    }
  };

  t.getAll = async (req, res) => {
    //email, password {"email":"alpha@gmail.com", "password":"12345678"}
    const data = await model.getAll();
    if (!data) {
      return res.status(500).json({ error: "Server error!" });
    }

    return res.status(200).json({ success: data });
  };

  t.login = async (req, res) => {
    const data = req.body;
    const validateStatus = registerValidator(data);
    if (validateStatus) return res.status(400).json({ error: validateStatus });

    const dbData = await model.getByEmail(data.email);

    if (dbData) {
      //id, email, password
      const isPasswordValid = await bcrypt.compare(
        data.password,
        dbData.password
      );
      if (isPasswordValid) {
        const jwtExpiry = parseInt(process.env.JWT_EXPIRY);
        //const jwtExpiry = process.env.JWT_EXPIRY;
        const jwtKey = process.env.JWT_KEY;

        const token = jwt.sign({ id: dbData.id }, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpiry,
        });

        return res.status(200).json({
          success: "User logged on!",
          token: token,
        });
      } else {
        return res.status(401).json({ error: "Bad password!" });
      }
    }

    return res.status(404).json({ error: "User not found!" });
  };

  return t;
};

export default UsersController;
