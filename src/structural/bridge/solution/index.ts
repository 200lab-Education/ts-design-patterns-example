// asbtraction or high level module
class AppData { }

interface DataParser {
  parse(data: string): Promise<AppData>;
}

interface DataPersistent {
  save(data: AppData): Promise<boolean>;
}

class DataPlatform {
  constructor(private readonly parser: DataParser, private readonly persistent: DataPersistent) { }

  async process(data: string): Promise<boolean> {
    const appData = await this.parser.parse(data);

    // do some business login with appData

    return await this.persistent.save(appData);
  }
}

class AdvancedDataPlatform extends DataPlatform { }

// implementation or low level module

class JSONParser implements DataParser {
  async parse(data: string): Promise<AppData> {
    // do json parsing
    return new AppData();
  }
}

class XMLParser implements DataParser {
  async parse(data: string): Promise<AppData> {
    // do xml parsing
    return new AppData();
  }
}

class MysqlPersistent implements DataPersistent {
  async save(data: AppData): Promise<boolean> {
    // do mysql saving
    return true;
  }
}

class PostgresPersistent implements DataPersistent {
  async save(data: AppData): Promise<boolean> {
    // do postgres saving
    return true;
  }
}

const pl = new DataPlatform(new JSONParser(), new MysqlPersistent());
pl.process("this is data");