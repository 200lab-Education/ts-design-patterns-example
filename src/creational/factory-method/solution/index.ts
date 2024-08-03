interface INotifier {
  send(message: string): void;
}

interface MessageDTO {
  userId: string;
  message: string;
  phone?: string;
}

class NotificationService {
  constructor(readonly notifier: INotifier) { }

  sendMessage(msg: string): void {
    this.notifier.send(msg);
  }
}

class EmailNotifier implements INotifier {
  send(message: string): void {
    console.log("Sending with EMAIL:", message);
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
    console.log("Sending with SMS:", message);
  }

  private constructor() { }

  static getNotifier(): INotifier { return new SMSNotifier(); }
}

// God function/class
class NotifierFactory {
  static getNotifier(type: string): INotifier {
    if (type === 'sms') return SMSNotifier.getNotifier();

    return EmailNotifier.getNotifier();
  }
}

const notifier: INotifier = NotifierFactory.getNotifier('sms');
const service = new NotificationService(notifier); // Dependency Injection
service.sendMessage("hello");