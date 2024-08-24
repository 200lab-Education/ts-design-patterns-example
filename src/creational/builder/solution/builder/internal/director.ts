import { EmailNotification, LocalPubSub, MySQLRepo, StdLogger } from "./components";
import { IBuilder, IBuilderDirector, IService } from "./interface";

export class BuilderDirector implements IBuilderDirector {
  constructor(private builder: IBuilder) { }

  setBuilder(builder: IBuilder) { this.builder = builder; }

  buildService(): IService {
    this.builder.reset();
    this.builder.setName("Complex");
    this.builder.buildLogger(new StdLogger());
    this.builder.buildNotifier(new EmailNotification());
    this.builder.buildRepository(new MySQLRepo());
    this.builder.buildPubsub(new LocalPubSub());

    return this.builder.result();
  }
}