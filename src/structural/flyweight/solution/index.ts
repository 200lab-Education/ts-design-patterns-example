
class Sender {
  constructor(readonly id: string, readonly firstName: string, readonly lastName: string, readonly desc: string) { };
}

class Message {
  private sender?: Sender;
  constructor(readonly senderId: string, readonly content: string) { }

  setSender(sender: Sender) { this.sender = sender; }
}

class ChatRoom {
  private cachedSender: Record<string, Sender> = {
    '1': new Sender('1', 'Viet', 'Tran', 'very long content'),
    '2': new Sender('2', 'Teo', 'Nguyen', 'very long content'),
    '3': new Sender('3', 'Nam', 'Le', 'very long content')
  };

  private messages: Message[] = [];

  getSender(id: string): Sender { return this.cachedSender[id]; }

  addMessage(m: Message) {
    m.setSender(this.getSender(m.senderId));
    this.messages.push(m);
  }

  getMessages() {
    return this.messages;
  }
}

const chatRoom = new ChatRoom();
chatRoom.addMessage(new Message('1', 'hello'));
chatRoom.addMessage(new Message('2', 'hi'));
chatRoom.addMessage(new Message('2', 'how are you'));
chatRoom.addMessage(new Message('1', 'I am good'));

console.log(chatRoom.getMessages());