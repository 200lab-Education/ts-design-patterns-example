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
  private state: BaseOrderState;

  constructor() {
    this.state = new CreatedState();
    this.state.setOrder(this);
  }

  transit(state: BaseOrderState) {
    console.log(`order transits from ${this.state.state()} to ${state.state()}`);
    this.state = state;
    this.state.setOrder(this);
  }

  getState(): OrderState {
    return this.state.state();
  }

  cancel(): void {
    this.state.cancel();
  }

  pay(): void {
    this.state.pay();
  }

  deliver(): void {
    this.state.deliver();
  }

  finish(): void {
    this.state.finish();
  }
}

abstract class BaseOrderState {
  protected order?: Order;

  setOrder(order: Order) {
    this.order = order;
  }

  cancel(): void {
    throw errInvalidAction;
  }

  pay(): void {
    throw errInvalidAction;
  }

  deliver(): void {
    throw errInvalidAction;
  }

  finish(): void {
    throw errInvalidAction;
  }

  abstract state(): OrderState;
}

class CancelledState extends BaseOrderState {
  state(): OrderState {
    return OrderState.Cancelled;
  }
}

class FinishedState extends BaseOrderState {
  state(): OrderState {
    return OrderState.Finished;
  }
}

class CreatedState extends BaseOrderState {
  cancel(): void {
    this.order?.transit(new CancelledState());
  }

  pay(): void {
    this.order?.transit(new PaidState());
  }

  state(): OrderState {
    return OrderState.Created;
  }
}

class PaidState extends BaseOrderState {
  state(): OrderState {
    return OrderState.Paid;
  }

  deliver(): void {
    this.order?.transit(new DeliveredState());
  }
}

class DeliveredState extends BaseOrderState {
  state(): OrderState {
    return OrderState.Delivered;
  }

  finish(): void {
    this.order?.transit(new FinishedState());
  }
}

console.log('Demo invalid action');

try {
  const order = new Order();
  order.cancel();
  console.log(order.getState() === OrderState.Cancelled);

  order.finish(); // throw errInvalidAction
} catch (e) { console.log((e as Error).message); }

console.log('Demo valid actions');

try {
  const order = new Order();
  order.pay();
  order.deliver();
  order.finish();

  console.log('Done');
} catch (e) { console.log((e as Error).message); }

