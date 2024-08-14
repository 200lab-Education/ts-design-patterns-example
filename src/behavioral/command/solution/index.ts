
class Value {
  constructor(private val: number) { };

  add(n: number) { this.val += n; }
  sub(n: number) { this.val -= n; }

  value(): number { return this.val; }
}

interface ICommand {
  execute(): void;
  undo(): void;
}

class CommandAdd implements ICommand {
  constructor(private v: Value, private param: number) { };

  execute(): void {
    this.v.add(this.param);
  }

  undo(): void {
    this.v.sub(this.param);
  }
}

class CommandSub implements ICommand {
  constructor(private v: Value, private param: number) { };

  execute(): void {
    this.v.sub(this.param);
  }

  undo(): void {
    this.v.add(this.param);
  }
}

class CommandNode {
  constructor(public cmd: ICommand, public next?: CommandNode) { }
}

class CommandStack {
  constructor(private current?: CommandNode) { }

  push(cmd: ICommand) {
    this.current = new CommandNode(cmd, this.current);
  }

  pop(): ICommand | void {
    if (this.current !== undefined) {
      const cmd = this.current.cmd;
      this.current = this.current.next;

      return cmd;
    }

    return;
  }
}

class UndoService {
  private cmdStack: CommandStack = new CommandStack();

  private constructor(
    private value: Value,
    private addCmd: ICommand,
    private subCmd: ICommand,
  ) {
  };

  doAdd() {
    this.addCmd.execute();
    this.cmdStack.push(this.addCmd);
  }

  doSub() {
    this.subCmd.execute();
    this.cmdStack.push(this.subCmd);
  }

  undo() {
    const cmd = this.cmdStack.pop();
    cmd && cmd.undo();
  }

  getValue(): number { return this.value.value(); }

  static getService(initValue: number, addPar: number, subPar: number): UndoService {
    const val = new Value(initValue);
    const addCmd = new CommandAdd(val, addPar);
    const subCmd = new CommandSub(val, subPar);

    return new UndoService(val, addCmd, subCmd);
  }
}

const service = UndoService.getService(10, 2, 1);

console.log(service.getValue()); // 10

service.doAdd();
service.doAdd();

console.log(service.getValue()); // 14

service.doSub();
console.log(service.getValue()); // 13

service.undo();
console.log(service.getValue()); // 14

service.undo();
service.undo();
console.log(service.getValue()); // 10

service.undo();
console.log(service.getValue()); // 10 (nothing changed)
