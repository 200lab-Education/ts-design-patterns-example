interface IItem {
  cost(): number;
}

class RealItem implements IItem {
  constructor(
    readonly name: string,
    readonly price: number
  ) { }

  cost(): number {
    return this.price;
  }
}

class Box implements IItem {
  constructor(readonly items: Array<IItem>) { }

  cost(): number {
    let cost = 0;

    for (let i = 0; i < this.items.length; i++) {
      cost += this.items[i].cost();
    }

    return cost;
  }
}

function createPackage(): IItem {
  return new Box(
    [
      new RealItem('mouse', 10),
      new Box(
        [
          new RealItem('keyboard', 30),
          new RealItem('charger', 25)
        ]
      )
    ]
  );
}

console.log(createPackage().cost());

// T1 -> T2 -> T3
// T1 (Sub 1.1, 1.2) -> T2 (Sub 2.1, 2.2) -> T3

interface TaskHandler {
  execute(): Promise<boolean>;
}

class RealTask implements TaskHandler {
  async execute(): Promise<boolean> {
    return true;
  }
}

class TaskContainer implements TaskHandler {
  constructor(readonly tasks: Array<TaskHandler>) { }

  async execute(): Promise<boolean> {
    this.tasks.forEach(async (task) => {
      await task.execute();
    });

    return true;
  }
}

// Task 1 -> Task 2 -> Task 3 // Solution: Decorator
// Task 1 (Sub 1.1, 1.2) -> Task 2 (Sub 2.1) -> Task 3 // Solution: composite
