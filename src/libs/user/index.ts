import { getConnection } from "@models/sqlite/sqlite_conn";
import { user_dao } from "@models/sqlite/user_dao";

export interface IUser {

    identity: string;
    name: string;
    lastName: string;
    age: number;
    addres: string;
    email: string;
    phone: number;
}

export class User {

    private dao: user_dao;
  
    public constructor() {
      getConnection()
      .then(conn=>{
        this.dao = new user_dao(conn);
      })
      .catch(ex=>console.error(ex));
    }
  
    // Consultas
    public getAllUsers() {
      return this.dao.getUsers();
    }
    public getUserByIndex( index:number) {
        return this.dao.getUserById({_id:index});
    }
    public addUser( usuario:IUser) {
      return this.dao.insertNewUser(usuario);
    }
    public updateUser( index:number, usuario:IUser){
     return this.dao.update({_id:index}, usuario);
    }
    public deleteUser( index:number) {
      return this.dao.deleteUser({_id:index});
    }
  
  }