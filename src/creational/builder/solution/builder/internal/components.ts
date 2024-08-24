import { ILogger, INotifier, IPubSub, IRepository, IService, SubHdl, UnSubscribeHdl } from "./interface";

export class StdLogger implements ILogger {
  log(v: any): void {
    console.log('Log with console:', v);
  }
}

export class FileLogger implements ILogger {
  log(v: any): void {
    console.log('Log with file logger:', v);
  }
}

export class EmailNotification implements INotifier {
  send(message: string): void {
    console.log('Send notification with email:', message);
  }
}

export class SMSNotification implements INotifier {
  send(message: string): void {
    console.log('Send notification with sms:', message);
  }
}

export class MySQLRepo implements IRepository {
  save(data: any): void {
    console.log('save data with mysql:', data);
  }
}

export class MongoRepo implements IRepository {
  save(data: any): void {
    console.log('save data with mongodb:', data);
  }
}

export class LocalPubSub implements IPubSub {
  private subscribers: Record<string, Array<SubHdl>> = {};

  publish(topic: string, payload: any): void {
    console.log('publish with local pubsub:', topic, payload);

    const subs = this.subscribers[topic];

    subs.forEach(s => s(topic, payload));
  }

  subscribe(topic: string, hld: SubHdl): UnSubscribeHdl {
    console.log('register sub with local pubsub:', topic);

    const subs = this.subscribers[topic];

    this.subscribers[topic] = subs ? [...subs, hld] : [hld];

    return () => {
      this.subscribers[topic] = this.subscribers[topic].filter((s) => s !== hld);
    };
  }
}

export class ComplexService implements IService {
  constructor(
    private name: string,
    private logger?: ILogger,
    private notifier?: INotifier,
    private repo?: IRepository,
    private pubsub?: IPubSub,
  ) {
    // complex code
  }

  doBusiness(): void {

  }
  ;
}