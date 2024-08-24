// How to write a simple calculator
// accept a string of expression like that "a + b" (with a,b are integers)
// return a string of result "a + b"
// case a: -> a (terminal)
// case a + b: -> a+b (compound)

interface Expression {
  interpret(): number;
}

class TerminalExpression implements Expression {
  constructor(private str: string) { }

  interpret(): number {
    return parseInt(this.str);
  }
}

class AddExpression implements Expression {
  constructor(private exp1: Expression, private exp2: Expression) { }

  interpret(): number {
    return (+ this.exp1.interpret()) + (+ this.exp2.interpret());
  }
}

class SubExpression implements Expression {
  constructor(private exp1: Expression, private exp2: Expression) { }

  interpret(): number {
    return this.exp1.interpret() - this.exp2.interpret();
  }
}

class Calculator {
  parse(str: string): Expression {
    const strs = str.split(" ");

    if (strs.length === 1) {
      return new TerminalExpression(str);
    }

    let numbStrings: string[] = [];
    let opsStrings: string[] = [];

    strs.forEach(s => {
      if (s === "+" || s === '-') {
        opsStrings = [...opsStrings, s];
      } else {
        numbStrings = [...numbStrings, s];
      }
    });

    let currentExp: Expression;

    for (let i = 0; i < opsStrings.length; i++) {
      if (i === 0) {
        currentExp = new TerminalExpression(numbStrings[0]);
      }

      if (opsStrings[i] === '+') {
        currentExp = new AddExpression(currentExp!, new TerminalExpression(numbStrings[i + 1]));
      }

      if (opsStrings[i] === '-') {
        currentExp = new SubExpression(currentExp!, new TerminalExpression(numbStrings[i + 1]));
      }
    }

    return currentExp!;
  }

  result(s: string): number {
    return this.parse(s).interpret();
  }
}

const calculator = new Calculator();

console.log("3 =", calculator.result("3"));
console.log("3 + 7 + 2 =", calculator.result("3 + 7 + 2"));
console.log("5 - 1 + 8 =", calculator.result("5 - 1 + 8"));
console.log("9 - 2 - 3 =", calculator.result("9 - 2 - 3"));
console.log("8 + 1 - 9 =", calculator.result("8 + 1 - 9"));