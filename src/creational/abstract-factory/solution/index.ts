interface IDrink {
  drink(): void;
}

interface IFood {
  eat(): void;
}

class Cake implements IFood {
  eat(): void { }
}

class Coffee implements IDrink {
  drink(): void { }
}

class Beer implements IDrink {
  drink(): void { }
}

class GrilledOctopus implements IFood {
  eat(): void { }
}

class Voucher {
  // real constructor
  private constructor(
    readonly food: IFood,
    readonly drink: IDrink
  ) { }

  // Factory method or Virtual Constructor
  static getVoucher(campainName: string): Voucher {
    let factory: VoucherAbstractFactory;

    if (campainName === 'creative-morning') {
      factory = new CreativeMorningFactory();
    } else {
      factory = new DrinkEveningFactory();
    }

    return new Voucher(factory.getFood(), factory.getDrink());
  }
}

interface VoucherAbstractFactory {
  getDrink(): IDrink;
  getFood(): IFood;
}

class CreativeMorningFactory implements VoucherAbstractFactory {
  getDrink(): IDrink {
    return new Coffee();
  }
  getFood(): IFood {
    return new Cake();
  }
}

class DrinkEveningFactory implements VoucherAbstractFactory {
  getDrink(): IDrink {
    return new Beer();
  }
  getFood(): IFood {
    return new GrilledOctopus();
  }
}

const voucher = Voucher.getVoucher('creative-morning');
console.log(voucher);
