class Tool {
  constructor(public isUsing: boolean = false) { }
}

interface Component {
  name: string;
  allowUseTool(t: Tool): void;
}

interface IMediator {
  notify(sender: Component, event: Event): void;
}

enum Event {
  REGISTER = 'REGISTER',
  DONE = 'DONE'
}

class Worker implements Component {
  constructor(
    readonly name: string,
    private meditor: IMediator
  ) { }

  wantUseTool(): void {
    this.meditor.notify(this, Event.REGISTER);
  }

  allowUseTool(t: Tool): void {
    this.doSomething(t);
    setTimeout(() => this.meditor.notify(this, Event.DONE), 2000);
  }

  private doSomething(t: Tool): void {
    console.log(`worker ${this.name} is using tool...`);
  }
}

class ToolManager implements IMediator {
  private usingComponent?: Component;
  private waitingComponents: Array<Component> = [];

  constructor(private readonly tool: Tool) { }

  notify(sender: Component, event: string): void {
    if (event == Event.REGISTER) {
      if (typeof this.usingComponent === 'undefined') {
        this.allow(sender);
        return;
      }

      console.log(`${this.usingComponent.name} is using tool. ${sender.name} have to wait!`);
      this.enqueue(sender);

      return;
    }

    if (event == Event.DONE) {
      console.log(`${sender.name} is done`);

      this.tool.isUsing = false;
      this.usingComponent = undefined;

      this.processQueue();
    }
  }

  private enqueue(c: Component) {
    this.waitingComponents = [...this.waitingComponents, c];
  }

  private allow(c: Component) {
    this.tool.isUsing = true;
    this.usingComponent = c;
    c.allowUseTool(this.tool);
  }

  private processQueue() {
    if (this.waitingComponents.length > 0) {
      const pickComp = this.waitingComponents[0];
      this.waitingComponents = this.waitingComponents.filter((v, i) => i > 0);

      this.allow(pickComp);
    }
  }
}

const manager = new ToolManager(new Tool(false));

[
  new Worker('Viet', manager),
  new Worker('Ti', manager),
  new Worker('Teo', manager),
  new Worker('Nam', manager),
  new Worker('Thang', manager)
].forEach((v) => v.wantUseTool());

