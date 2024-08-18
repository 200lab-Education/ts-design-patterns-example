type handler = () => void;
type msgHandler = (msg: string) => void;

function exec(hdl: handler) {
  hdl();
}

function handlerApdater(msgHdl: msgHandler, msg: string): handler {
  return () => {
    msgHdl(msg);
  };
}

const normalHdl = () => console.log('normal handler run');

exec(normalHdl);

const msgHdl = (msg: string) => console.log(`message handler run with msg: ${msg}`);


type anyHdl = (payload: any) => {};

function anyHdlApdater(anyHdl: anyHdl, payload: any): handler {
  return () => {
    anyHdl(payload);
  };
}

exec(handlerApdater(msgHdl, 'hello world'));
