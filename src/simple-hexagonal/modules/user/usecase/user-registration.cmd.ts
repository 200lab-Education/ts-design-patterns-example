import { ErrEmailUsed } from "../model/error";
import { IUserCommandRepository, IUserQueryRepository } from "../model/interface";
import { User, UserRegistrationDTO } from "../model/user";

export interface IRegistrationHandler {
  execute(cmd: RegistrationCommand): Promise<boolean>;
}

type RegistrationCommand = {
  dto: UserRegistrationDTO;
};

export class RegistrationCommandHandler implements IRegistrationHandler {
  constructor(
    readonly queryRepo: IUserQueryRepository,
    readonly cmdRepo: IUserCommandRepository,
  ) { }

  // business logic
  async execute(cmd: RegistrationCommand): Promise<boolean> {
    const user = await this.queryRepo.find({ email: cmd.dto.email });

    if (user) {
      throw ErrEmailUsed;
    }

    const salt = "182192832w4"; // hard code
    const hashedPassword = salt + cmd.dto.password; // bcrypt | agron2

    const newId = "1223123"; // uuid gen v7

    const newUser = new User(newId, cmd.dto.firstname, cmd.dto.lastName, cmd.dto.email, salt, hashedPassword, 'user');

    const result = await this.cmdRepo.insert(newUser);

    return result;
  }
}