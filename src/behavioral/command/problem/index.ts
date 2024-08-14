class Value {
  constructor(private val: number) { };

  add(n: number) { this.val += n; }
  sub(n: number) { this.val -= n; }

  value(): number { return this.val; }
}

const v = new Value(10);
v.add(5);
v.add(7);
v.sub(2);
v.sub(3);