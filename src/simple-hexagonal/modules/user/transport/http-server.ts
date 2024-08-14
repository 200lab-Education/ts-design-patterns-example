import { Request, Response } from "express";
import { UserRegistrationDTO } from "../model/user";
import { IRegistrationHandler } from "../usecase/user-registration.cmd";

export class HTTPServer {
  constructor(private readonly regHandler: IRegistrationHandler) { };

  async register(request: Request, response: Response) {
    try {
      const dto = request.body as UserRegistrationDTO;

      const cmd = { dto };

      const result = await this.regHandler.execute(cmd);

      response.status(200).json({ data: result });
    } catch (e) {
      response.status(500).json({ error: (e as Error).message });
    }
  }
}