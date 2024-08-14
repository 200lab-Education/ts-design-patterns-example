import express, { Express, Request, Response } from "express";
import { setupUserModule } from "./modules/user/module";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/v1", setupUserModule());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});