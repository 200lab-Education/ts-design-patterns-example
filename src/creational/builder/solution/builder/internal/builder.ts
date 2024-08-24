import { ComplexService } from "./components";
import { IBuilder, ILogger, INotifier, IPubSub, IRepository, IService } from "./interface";

export class SimpleBuilder implements IBuilder {
  private name: string = "";
  private logger?: ILogger;
  private notifier?: INotifier;
  private repo?: IRepository;
  private pubsub?: IPubSub;

  reset(): void {
    this.name = '';
    this.logger = undefined;
    this.notifier = undefined;
    this.repo = undefined;
    this.pubsub = undefined;
  }

  setName(name: string): void {
    this.name = name;
  }

  buildLogger(logger: ILogger): void {
    this.logger = logger;
  }

  buildNotifier(notifier: INotifier): void {
    this.notifier = notifier;
  }

  buildRepository(repo: IRepository): void {
    this.repo = repo;
  }

  buildPubsub(pubsub: IPubSub): void {
    this.pubsub;
  }

  result(): IService {
    return new ComplexService(this.name, this.logger, this.notifier, this.repo, this.pubsub);
  }

}