class Product {
  constructor(
    readonly name: string,
    readonly price: number
  ) { }
}

class Inventory {
  constructor(private readonly products: Product[]) { }

  lookup(name: string): Product | undefined {
    return this.products.find((p) => p.name === name);
  }
}

class Account {
  constructor(
    readonly name: string,
    private balance: number
  ) { }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

class AccountStorage {
  constructor(private readonly accounts: Account[]) { }

  lookup(name: string) {
    return this.accounts.find((p) => p.name === name);
  }
}

class FacadeService {
  private constructor(private readonly inventory: Inventory, private readonly accStorage: AccountStorage) { }

  static getService(): FacadeService {
    const inventory = new Inventory([new Product('Apple', 2.5), new Product('Orange', 3.0)]);
    const accStorage = new AccountStorage([new Account('VIP', 1000), new Account('Economic', 300)]);
    return new FacadeService(inventory, accStorage);
  }

  buyProduct(name: string, accName: string) {
    const product = this.inventory.lookup(name);

    if (typeof product === 'undefined') throw Error('product not found');

    const account = this.accStorage.lookup(accName);

    if (typeof account === 'undefined') throw Error('account not found');

    if (account.getBalance() < product.price) throw Error('account not enough balance');

    account.withdraw(product.price);
  }

  deposit(accName: string, amount: number) {
    const account = this.accStorage.lookup(accName);

    if (typeof account === 'undefined') throw Error('account not found');

    account.deposit(amount);
  }
}

const service = FacadeService.getService();

service.buyProduct('Apple', 'VIP');

service.deposit('Economic', 1000);
