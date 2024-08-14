import { Router } from "express";
import { UserInMemRepository } from "./repository/in-memory/repository";
import { HTTPServer } from "./transport/http-server";
import { RegistrationCommandHandler } from "./usecase/user-registration.cmd";

// setup dependencies (DI)
export function setupUserModule(): Router {
  const router = Router();

  const userRepo = new UserInMemRepository();

  const regHandler = new RegistrationCommandHandler(userRepo, userRepo);

  const service = new HTTPServer(regHandler);

  router.post('/register', service.register.bind(service));

  return router;
}