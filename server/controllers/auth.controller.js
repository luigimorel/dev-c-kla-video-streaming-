import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config";

const signIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status("401").json({ error: "User has not been found." });

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .json({ error: "Email and the password do not match" });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "Successfully signed out",
  });
};

const requireSignin = {};

const hasAuthorization = (req, res) => {};

export default { signIn, signOut, requireSignin, hasAuthorization };
