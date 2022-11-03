import UsersDAO from "./dao/usersDAO.js";

export default class UsersController {
  static async apiGetUsers(req, res){
    const {usersList} = await UsersDAO.getUsers();

    let response = {
      users: usersList
    }

    res.json(response)
  }
  
}