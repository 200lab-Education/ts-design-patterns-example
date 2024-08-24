export interface ILogger {
  log(v: any): void;
}

export interface INotifier {
  send(message: string): void;
}

export interface IRepository {
  save(data: any): void;
}

export type SubHdl = (topic: string, payload: any) => void;
export type UnSubscribeHdl = () => void;

export interface IPubSub {
  publish(topic: string, payload: any): void;
  subscribe(topic: string, hld: SubHdl): UnSubscribeHdl;
}

export interface IService {
  doBusiness(): void;
}

export interface IBuilderDirector {
  buildService(): IService;
}

export interface IBuilder {
  reset(): void;
  setName(name: string): void;
  buildLogger(logger: ILogger): void;
  buildNotifier(notifier: INotifier): void;
  buildRepository(repo: IRepository): void;
  buildPubsub(pubsub: IPubSub): void;
  result(): IService;
}
