interface Visitor {
  visit(p: Product): void;
  visit(u: User): void;
  visit(c: Category): void;
}

interface Visitable {
  visit(v: Visitor): void;
}

class Product implements Visitable {
  constructor(readonly name: string) { }

  visit(v: Visitor): void {
    v.visit(this);
  }
}

class User implements Visitable {
  constructor(readonly firstName: string, readonly lastName: string) { }

  visit(v: Visitor): void {
    v.visit(this);
  }
}

class Category implements Visitable {
  constructor(readonly title: string) { }

  visit(v: Visitor): void {
    v.visit(this);
  }
}

class JSONVisitor implements Visitor {
  visit(obj: Product | User | Category): void {
    switch (obj.constructor.name) {
      case 'Product': {
        const p = obj as Product;
        console.log({ name: p.name });
        break;
      }

      case 'User': {
        const u = obj as User;
        console.log({ firstName: u.firstName, lastName: u.lastName });
        break;
      }

      case 'Category': {
        const c = obj as Category;
        console.log({ title: c.title });
        break;
      }
    }
  }
}

class StringerVisitor implements Visitor {
  visit(obj: Product | User | Category): void {
    switch (obj.constructor.name) {
      case 'Product': {
        const p = obj as Product;
        console.log(`Name: ${p.name}`);
        break;
      }

      case 'User': {
        const u = obj as User;
        console.log(`Full name: ${u.firstName} ${u.lastName}`);
        break;
      }

      case 'Category': {
        const c = obj as Category;
        console.log(`Title: ${c.title}`);
        break;
      }
    }
  }
}

const elements: Visitable[] = [
  new User('Viet', 'Tran'),
  new Product('Solution Architect course'),
  new Category('Technology')
];

const jsVisitor = new JSONVisitor();
const strVisitor = new StringerVisitor();

elements.forEach(e => e.visit(jsVisitor));
elements.forEach(e => e.visit(strVisitor));

elements.forEach(e => console.log(e));