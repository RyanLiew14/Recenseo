import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const loggedIn = async (req, res, next) => {
  try {
    //console.log(req.headers.authorization);
    if (req.headers.authorization) {
      const userToken = req.headers.authorization.split(" ")[1]; //String in format bearer userToken
      //console.log(userToken);
      if (userToken) {
        const payload = await jwt.verify(userToken, process.env.SECRET);
        if (payload) {
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "Token not valid." });
        }
      } else {
        res
          .status(400)
          .json({ error: "Token cannot be read from authorization header." });
      }
    } else {
      res
        .status(400)
        .json({ error: "No authentication header existing in the request." });
    }
  } catch (error) {
    const errMessage = error.message;
    //console.log(error);
    res.status(400).json({ error: errMessage });
  }
};

export default loggedIn;
