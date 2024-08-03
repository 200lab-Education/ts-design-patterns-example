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
    console.log("Sending with EMAIL:", message);
  }
}

class SMSNotifier implements INotifier {
  send(message: string): void {
    console.log("Sending with SMS:", message);
  }
}

export function run() {
  const notifier: INotifier = new SMSNotifier();
  const service = new NotificationService(notifier); // Dependency Injection
  service.sendMessage("hello");
}

