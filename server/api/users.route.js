import express from "express"
import UsersController from "./users.ctrl.js"

const router = express.Router();

router.route("/").get(UsersController.apiGetUsers);

export default router;