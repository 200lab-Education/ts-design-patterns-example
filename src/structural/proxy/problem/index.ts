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

(async () => {
  const ds = new DataStore();
  const service = new Service(ds);
  const value = await service.fetchData();
  console.log(value);

  // the data store is very slow, how to cache??
})()

