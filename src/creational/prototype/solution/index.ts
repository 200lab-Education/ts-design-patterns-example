interface Prototype<T> {
  clone(): T;
}

class Point implements Prototype<Point> {
  constructor(public x: number, public y: number) { }

  clone(): Point {
    return new Point(this.x, this.y);
  }
}

class Node {
  children: Point[] = [];
  constructor(public point: Point) { }

  clone(): Node {
    const newNode = new Node(this.point.clone());

    newNode.children = this.children.map(n => n.clone());

    return newNode;
  }
}

const p1 = new Point(1, 2);
const p2 = new Point(2, 4);
const node = new Node(p1);
node.children = [p2];

const p3 = p1.clone();
p3.x = 10;

console.log(node);

const node2 = node.clone();
node2.children[0].y = 20;

console.log(':: Node 1:', node);
console.log(':: Node 2:', node2);

// Value Object
class Color {
  constructor(readonly red: number, readonly green: number, readonly blue: number) { }

  withRed(red: number): Color {
    return new Color(red, this.green, this.blue);
  }

  compare(c1: Color, c2: Color): boolean {
    return c1.blue == c2.blue && c1.green == c2.green && c1.red == c2.red;
  }
}
