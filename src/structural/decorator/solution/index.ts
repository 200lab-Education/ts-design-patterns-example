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

class TelegramNotifier implements INotifier {
  send(message: string): void {
    console.log('Sending with Telegram:', message);
  }
}

// class TelegramSMSNotifier implements INotifier {
//   constructor(readonly sms: SMSNotifier, readonly tel: TelegramNotifier) { }

//   send(message: string): void {
//     this.sms.send(message);
//     this.tel.send(message);
//   }
// }

class DecoratorNotifer implements INotifier {
  constructor(
    readonly notifier: INotifier,
    readonly core?: DecoratorNotifer
  ) { }

  send(message: string): void {
    this.notifier.send(message);
    this.core?.send(message);
  }

  decorate(notifier: INotifier): DecoratorNotifer {
    return new DecoratorNotifer(notifier, this);
  }
}

const emailNotif = new EmailNotifier();
const smsNotif = new SMSNotifier();
const telegramNotif = new TelegramNotifier();

const notifier = new DecoratorNotifer(emailNotif).decorate(smsNotif).decorate(telegramNotif);
const service = new NotificationService(notifier);
service.sendMessage('hello Viet');

// (Bao Bi (Tran Chau Trang (Tran Chau Den (Milk Tea))))

class AppError extends Error {
  constructor(
    readonly msg: string,
    readonly rootCause?: Error
  ) {
    super(msg);
  }

  getRootCause(): Error {
    if (this.rootCause) {
      if (this.rootCause instanceof AppError) {
        return (this.rootCause! as AppError).getRootCause();
      }

      return this.rootCause;
    }

    return this;
  }
}

// try {
//   const dbErr = new Error('invalid column name')
//   const bizError = new AppError('cannot process this time', dbErr)
//   const transportErr = new AppError('transport error', bizError)
//   throw transportErr
// } catch (e) {
//   const appErr = e as AppError

//   console.log({
//     message: appErr.message,
//     root: appErr.getRootCause().message
//   })
// }
