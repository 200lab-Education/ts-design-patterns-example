abstract class User {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  abstract getMoney(): number;
}

interface LenderBehavior {
  lend(br: BorrowerBehavior, amount: number): boolean;
  getMoneyBack(): boolean;
  getMoney(): number;
}

interface BorrowerBehavior {
  borrow(lender: LenderBehavior, amount: number): boolean;
  returnMoney(amount: number): boolean;
  getMoney(): number;
}

class Lender extends User implements LenderBehavior {
  money: number;
  borrower?: BorrowerBehavior;
  lendAmount: number = 0;

  constructor(firstName: string, lastName: string, money: number) {
    super(firstName, lastName);
    this.money = money;
  }

  getMoney(): number {
    return this.money;
  }

  lend(br: BorrowerBehavior, amount: number): boolean {
    if (this.borrower != null || this.money < amount) return false;

    this.borrower = br;
    this.lendAmount = amount;
    this.money -= amount;

    return true;
  }

  getMoneyBack(): boolean {
    if (this.borrower != null && !this.borrower.returnMoney(this.lendAmount)) return false;

    this.money += this.lendAmount;
    this.lendAmount = 0;
    this.borrower = undefined;

    return true;
  }
}

class Borrower extends User implements BorrowerBehavior {
  cash: number;
  lender?: LenderBehavior;

  static GetBorrower(firstName: string, lastName: string, cash: number): BorrowerBehavior {
    return new Borrower(firstName, lastName, cash);
  }

  private constructor(firstName: string, lastName: string, cash: number) {
    super(firstName, lastName);
    this.cash = cash;
  }

  getMoney(): number {
    return this.cash;
  }

  borrow(lender: LenderBehavior, amount: number): boolean {
    if (this.lender != null || !lender.lend(this, amount)) {
      return false;
    }

    this.lender = lender;
    this.cash += amount;

    return true;
  }

  returnMoney(amount: number): boolean {
    if (this.lender == null || this.cash < amount) return false;

    this.cash -= amount;
    this.lender = undefined;

    return true;
  }
}


let johny = Borrower.GetBorrower("Johny", "Poor", 50);
let peter = new Lender("Peter", "Rich", 3000);

// Johny wants to lend some money from Peter 
// peter.money -= 1000
// johny.cash += 1000

// Johny wants to lend some money from Peter 
console.log(johny.getMoney(), peter.getMoney());
main(johny, peter, 1000);

class Company implements BorrowerBehavior {
  constructor(private money: number) { }

  borrow(lender: LenderBehavior, amount: number): boolean {
    throw new Error("Method not implemented.");
  }
  returnMoney(amount: number): boolean {
    throw new Error("Method not implemented.");
  }

  getMoney(): number {
    return this.money;
  }
}

class BorrowerFactory {
  idx: number = 0;
  borrowerPool: BorrowerBehavior[] = [
    Borrower.GetBorrower("Johny", "Poor", 50),
    Borrower.GetBorrower("Tony", "Poor", 40),
    Borrower.GetBorrower("Sam", "Poor", 30),
    Borrower.GetBorrower("Alex", "Poor", 20),
    Borrower.GetBorrower("Bill", "Poor", 10),
  ];

  static instance: BorrowerFactory = new BorrowerFactory();

  static getBorrower(isUser: boolean): BorrowerBehavior {
    // const borrower = this.instance.borrowerPool[this.instance.idx];

    // this.instance.idx = (this.instance.idx + 1) % this.instance.borrowerPool.length

    return isUser ? Borrower.GetBorrower("Johny", "Poor", 50) : new Company(3000);
  }
}


class Bank implements LenderBehavior, BorrowerBehavior {
  lend(br: BorrowerBehavior, amount: number): boolean {
    throw new Error("Method not implemented.");
  }
  
  getMoneyBack(): boolean {
    throw new Error("Method not implemented.");
  }

  borrow(lender: LenderBehavior, amount: number): boolean {
    throw new Error("Method not implemented.");
  }
  returnMoney(amount: number): boolean {
    throw new Error("Method not implemented.");
  }
  getMoney(): number {
    throw new Error("Method not implemented.");
  }
}

const bank1 = new Bank();
const bank2 = new Bank();

main(bank1, bank2, 1000);


function main(br: BorrowerBehavior, ld: LenderBehavior, amount: number) {
  br.borrow(ld, amount);
  ld.getMoneyBack();
}