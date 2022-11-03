let users

export default class UsersDAO {
  static async injectDB(conn){
    if (users){
      return
    }

    try {
      users = await conn.db(process.env.MONGO_DB_NAME).collection("users")
    } catch (e){
      console.error(
        "error"
      )
    }
  }

  static async getUsers(){
    try{
      const usersList = await users.find({}).toArray();
      return {usersList}
    } catch (e) {
      console.error("error")
      return {usersList: []}
    }
  }

}


