import { setTimeout } from 'timers/promises';

interface IRepository {
  getData(): Promise<number>;
}

class Service {
  constructor(private repo: IRepository) { }

  async fetchData(): Promise<number> {
    const value = await this.repo.getData();

    return value;
  }
}

class DataStore implements IRepository {
  async getData(): Promise<number> {
    await setTimeout(3000);
    return 100;
  }
}

class ProxyDataStore implements IRepository {
  cachedValue?: number;

  constructor(private originDataStore: DataStore) { }

  async getData(): Promise<number> {
    if (!this.cachedValue) {
      this.cachedValue = await this.originDataStore.getData();
    }

    return this.cachedValue;
  }
}

(async () => {
  const ds = new ProxyDataStore(new DataStore());
  const service = new Service(ds);

  console.log(await service.fetchData());
  console.log(await service.fetchData());
  console.log(await service.fetchData());
})()

