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
}

class SMSNotifier implements INotifier {
  send(message: string): void {
    console.log('Sending with SMS:', message);
  }
}

class SlackNotifier implements INotifier {
  send(message: string): void {
    console.log('Sending with Slack:', message);
  }
}

// Client code

enum NotifierType {
  EMAIL = 'email',
  SMS = 'sms',
  SLACK = 'slack',
}

export function run() {
  const notifier: INotifier = new EmailNotifier();

  // expect
  // const notifier2 = NotiferFactory.create(NotifierType.EMAIL);

  const service = new NotificationService(notifier); // Dependency Injection
  service.sendMessage('hello');
}
