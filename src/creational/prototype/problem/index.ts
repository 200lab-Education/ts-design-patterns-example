class Point {
  constructor(public x: number, public y: number) { }
}

class Node {
  children: Point[] = [];
  constructor(public point: Point) { }
}

const p1 = new Point(1, 2);
const p2 = new Point(2, 4);
const node = new Node(p1);
node.children.push(p2);

console.log(node);

const p3 = p1; // ref
p3.x = 5;

console.log(node);

const node2 = { ...node };
p3.y = 10;

p2.y = 9;

console.log(node2);
