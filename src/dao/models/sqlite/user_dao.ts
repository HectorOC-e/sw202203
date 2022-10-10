import { IUser } from "@server/dao/models/entities/user";
import { AbstractDao } from "@server/dao/models/sqlite/abstract_dao";
import sqlite from "sqlite";


export class user_dao extends AbstractDao<IUser> {

    public constructor(db: sqlite.Database) {
        super('USER', db as sqlite.Database);
        super.exec('CREATE TABLE IF NOT EXISTS USER ('
            + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
            + ' identity TEXT,'
            + ' name TEXT,'
            + ' lastName TEXT,'
            + ' age NUMERIC,'
            + ' addres TEXT,'
            + ' email TEXT,'
            + ' phone NUMERIC);').then().catch(e => console.error(e));
    }

    public async getUsers() {
        return super.findAll()
    }

    public async getUserById(identifier: Partial<IUser>) {
        try {
            const result = await super.findByID(identifier);
            return result;
        } catch (ex: unknown) {
            console.log("UserDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async insertNewUser(newUser: IUser) {
        try {
            const result = await super.createOne(newUser);
            return result;
        } catch (ex: unknown) {
            console.log("UserDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async updateNewUser(updateUser: IUser) {
        try {
            const { _id, ...updateObject } = updateUser;
            const result = await super.update({ _id }, updateObject);
            return result;

        } catch (ex: unknown) {
            console.log("UserDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deleteUser(deleteUsuario: Partial<IUser>) {
        try {
            const { _id } = deleteUsuario;
            const result = await super.delete({ _id });
            return result;
        } catch (ex: unknown) {
            console.log("UserDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

}