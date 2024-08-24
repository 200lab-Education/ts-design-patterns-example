interface ILogger {
  log(v: any): void;
}

interface INotifier {
  send(message: string): void;
}

interface IRepository {
  save(data: any): void;
}

type SubHdl = (topic: string, payload: any) => void;
type UnSubscribeHdl = () => void;

interface IPubSub {
  publish(topic: string, payload: any): void;
  subscribe(topic: string, hld: SubHdl): UnSubscribeHdl;
}

class StdLogger implements ILogger {
  log(v: any): void {
    console.log('Log with console:', v);
  }
}

class FileLogger implements ILogger {
  log(v: any): void {
    console.log('Log with file logger:', v);
  }
}

class EmailNotification implements INotifier {
  send(message: string): void {
    console.log('Send notification with email:', message);
  }
}

class SMSNotification implements INotifier {
  send(message: string): void {
    console.log('Send notification with sms:', message);
  }
}

class MySQLRepo implements IRepository {
  save(data: any): void {
    console.log('save data with mysql:', data);
  }
}

class MongoRepo implements IRepository {
  save(data: any): void {
    console.log('save data with mongodb:', data);
  }
}

class LocalPubSub implements IPubSub {
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

type ServiceOpt = (s: ComplexService) => void;

export const withName = (name: string): ServiceOpt => {
  return (s: ComplexService) => { s.setName(name); };
};

export const withStdLogger = (): ServiceOpt => {
  return (s: ComplexService) => { s.setLogger(new StdLogger()); };
};

export const withSMSNotifier = (): ServiceOpt => {
  return (s: ComplexService) => { s.setNotifier(new SMSNotification()); };
};

export const withMysqlRepo = (): ServiceOpt => {
  return (s: ComplexService) => { s.setRepo(new MySQLRepo()); };
};

export const withLocalPubsub = (): ServiceOpt => {
  return (s: ComplexService) => { s.setPubsub(new LocalPubSub()); };
};

export class ComplexService {
  private name: string = "Complex";
  private logger?: ILogger;
  private notifier?: INotifier;
  private repo?: IRepository;
  private pubsub?: IPubSub;

  constructor(...opts: ServiceOpt[]) {
    this.logger = new StdLogger();
    this.notifier = new EmailNotification();
    this.repo = new MongoRepo();
    this.pubsub = new LocalPubSub();

    opts.forEach(o => o(this));
  };

  setName(name: string) { this.name = name; }
  setLogger(logger: ILogger) { this.logger = logger; }
  setNotifier(notifier: INotifier) { this.notifier = notifier; }
  setRepo(repo: IRepository) { this.repo = repo; }
  setPubsub(ps: IPubSub) { this.pubsub = ps; }

  doBusiness() { }
}

const service = new ComplexService(withStdLogger(), withSMSNotifier());
service.doBusiness();
