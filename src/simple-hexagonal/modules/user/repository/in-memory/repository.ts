import { IUserRepository } from "../../model/interface";
import { User, UserConditionDTO, UserUpdateDTO } from "../../model/user";

let users: Array<User> = [
  new User('1', 'Viet', 'Tran', 'viettranx@gmail.com', '123456', '123456', 'user'),
];

export class UserInMemRepository implements IUserRepository {
  async getById(id: string): Promise<User | null> {
    const u = users.find(u => u.id === id);

    if (u) return u;
    return null;
  }

  async list(cond: UserConditionDTO): Promise<Array<User>> {
    return users;
  }

  async find(cond: UserConditionDTO): Promise<User | null> {
    const u = users.find(u => u.email === cond.email);

    if (u) return u;
    return null;
  }

  async insert(data: User): Promise<boolean> {
    users.push(data);

    return true;
  }

  async update(id: string, data: UserUpdateDTO): Promise<boolean> {
    return true;
  }

  async delete(id: string): Promise<boolean> {
    users = users.filter(u => u.id !== id);

    return true;
  }

}