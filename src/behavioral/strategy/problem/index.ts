
class NotificationService {
  constructor(readonly type: string) { }

  sendMessage(msg: string): void {
    if (this.type === 'sms') {
      // .....
      console.log('send with sms');
    }

    if (this.type === 'email') {
      // .....
      console.log('send with email');
    }
    // else if ....
  }
}