import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import usersDAO from'./api/dao/usersDAO.js';

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.ATLAS_URI).catch(error =>
  {console.error(error.stack)
  process.exit(1)}).then(async client => {
    await usersDAO.injectDB(client);
    app.listen(port, () => console.log(`listening on port ${port}`));
  })