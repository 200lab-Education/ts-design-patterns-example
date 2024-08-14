import { User, UserConditionDTO, UserUpdateDTO } from "./user";

export interface IUserRepository extends IUserQueryRepository, IUserCommandRepository { }

export interface IUserQueryRepository {
  getById(id: string): Promise<User | null>;
  list(cond: UserConditionDTO): Promise<Array<User>>;
  find(cond: UserConditionDTO): Promise<User | null>;
}

export interface IUserCommandRepository {
  insert(data: User): Promise<boolean>;
  update(id: string, data: UserUpdateDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}