interface Context {
  url: string;
  content?: string;
  data?: any;
}

type Handler = (c: Context) => Promise<boolean>;

const checkingUrlHandler = async (c: Context): Promise<boolean> => {
  console.log('Checking url', c.url);
  return true;
};

const fetchURLHandler = async (c: Context): Promise<boolean> => {
  console.log('Fetching url', c.url);
  c.content = '<strong>200Lab</strong>';
  return true;
};

const extractInfoHandler = async (c: Context): Promise<boolean> => {
  console.log('content:', c.content);
  c.data = 'Viet';
  return true;
};

class HandlerNode {
  private constructor(
    private hdl: Handler,
    private next?: HandlerNode
  ) { }

  async handle(ctx: Context): Promise<boolean> {
    await this.hdl(ctx);
    await this.next?.handle(ctx);

    return true;
  }

  // Linked-list example
  static setupCOR(...handlers: Array<Handler>): HandlerNode {
    if (!handlers || handlers.length == 0) throw new Error('handler cor must have at least one handler');

    const hdl = handlers[0];

    const node = new HandlerNode(hdl);

    let currentNode = node;

    if (handlers.length == 1) return node;

    for (let i = 1; i < handlers.length; i++) {
      currentNode.next = new HandlerNode(handlers[i]);
      currentNode = currentNode.next;
    }

    return node;
  }
}

class WebCrawler {
  constructor(private hdlNode: HandlerNode) { }

  async crawl(url: string) {
    let ctx: Context = { url };

    await this.hdlNode.handle(ctx);
  }
}

const cor = HandlerNode.setupCOR(checkingUrlHandler, fetchURLHandler, extractInfoHandler);
new WebCrawler(cor).crawl('http://some-url');
