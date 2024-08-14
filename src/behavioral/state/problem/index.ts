//[Start] --> Created --> Cancelled --> [End]
//					      |
//					      |
//					     Paid  --> Delivered --> Finished --> [End]


enum OrderState {
  Created = 'created',
  Cancelled = 'cancelled',
  Paid = 'paid',
  Delivered = 'delivered',
  Finished = 'finished'
}

const errInvalidAction = new Error('invalid action');

class Order {
  private state = OrderState.Created;

  private transit(newState: OrderState) {
    this.state = newState;
  }

  cancel() {
    if (this.state != OrderState.Created)
      throw errInvalidAction;

    this.transit(OrderState.Cancelled);
  }

  pay() {
    if (this.state != OrderState.Created)
      throw errInvalidAction;

    this.transit(OrderState.Paid);
  }

  deliver() {
    if (this.state != OrderState.Paid)
      throw errInvalidAction;

    this.transit(OrderState.Delivered);
  }

  finish() {
    if (this.state != OrderState.Delivered)
      throw errInvalidAction;

    this.transit(OrderState.Finished);
  }
}
