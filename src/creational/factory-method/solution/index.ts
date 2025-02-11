interface INotifier {
  send(message: string): void;
}
class NotificationService {
  constructor(readonly notifier: INotifier) { }

  sendMessage(msg: string): void {
    this.notifier.send(msg);
  }
}

class EmailNotifier implements INotifier {
  send(message: string): void {
    console.log('Sending with EMAIL:', message);
  }

  static notifier: INotifier;

  private constructor() { }

  static getNotifier(): INotifier {
    if (!this.notifier) this.notifier = new EmailNotifier();

    return this.notifier;
  }
}

class SMSNotifier implements INotifier {
  send(message: string): void {
    console.log('Sending with SMS:', message);
  }

  private constructor() { }

  static getNotifier(): INotifier {
    return new SMSNotifier();
  }
}

// God function/class
class NotifierFactory {
  static getNotifier(type: string): INotifier {
    if (type === 'sms') return SMSNotifier.getNotifier();

    return EmailNotifier.getNotifier();
  }
}


// Client code
const notifier: INotifier = NotifierFactory.getNotifier('sms');
const service = new NotificationService(notifier); // Dependency Injection
service.sendMessage('hello');



// Logger
// Log mình chỉ có 2 loại mà thôi,
// khi chạy dev thì mình log ra console,
// khi chạy prod thì mình log ra file

// LogFactory.getLogger()

interface ILogger {
  log(message: any): void;
}

class ConsoleLogger implements ILogger {
  private constructor() { }

  static getLogger(): ILogger {
    return new ConsoleLogger();
  }

  log(message: any): void {
    console.log('log to console', message);
  }
}

class FileLogger implements ILogger {
  private constructor() { }

  static getLogger(): ILogger {
    return new FileLogger();
  }

  log(message: any): void {
    console.log('log to file', message);
  }
}

class LoggerFactory {
  static getLogger(): ILogger {
    return (process.env.NODE_ENV === 'dev') ? ConsoleLogger.getLogger() : FileLogger.getLogger();
  }
}

// Client code
const logger: ILogger = LoggerFactory.getLogger();
logger.log('hello');
