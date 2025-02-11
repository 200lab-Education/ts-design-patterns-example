interface IFollower {
  receive(msg: string): void;
}

interface IFollowerIterator {
  next(): IFollower;
  hasNext(): boolean;
}

const sendMessage = (msg: string, iterator: IFollowerIterator) => {
  while (iterator.hasNext()) {
    iterator.next().receive(msg);
  }
};

class Profile implements IFollower {
  constructor(private name: string) { }

  receive(msg: string): void {
    console.log(`${this.name} has recieved message: ${msg}`);
  }
}

class FolloweArrayIterator implements IFollowerIterator {
  private currentIdx: number = 0;

  constructor(private arr: Array<IFollower>) { }

  next(): IFollower {
    const follower = this.arr[this.currentIdx];
    this.currentIdx += 1;

    return follower;
  }

  hasNext(): boolean {
    return this.arr.length > 0 && this.currentIdx < this.arr.length;
  }
}

type FollowerNode = {
  val: IFollower;
  next?: FollowerNode;
};

class FollowerLinkedListIterator implements IFollowerIterator {
  constructor(private node?: FollowerNode) { }

  next(): IFollower {
    const node = this.node?.val;
    this.node = this.node?.next;
    return node!;
  }

  hasNext(): boolean {
    return this.node !== undefined;
  }
}

type FollowerTreeNode = {
  val: IFollower;
  children: Array<FollowerTreeNode>;
};


class FollowerTreeStore {
  constructor(private node: FollowerTreeNode) { }

  private toArray(node: FollowerTreeNode): Array<IFollower> {
    let followers: Array<IFollower> = [node.val];

    node.children.forEach(n => {
      followers = [...followers, ... this.toArray(n)];
    });

    return followers;
  }

  iterator(): IFollowerIterator {
    return new FolloweArrayIterator(this.toArray(this.node));
  }
}

const arrFollowers: Array<IFollower> = [
  new Profile('Peter'),
  new Profile('Mary'),
  new Profile('Tom'),
  new Profile('Henry'),
];

const linkedListOfFollowers: FollowerNode = {
  val: new Profile('Peter'),
  next: {
    val: new Profile('Mary'),
    next: {
      val: new Profile('Tom'),
    }
  }
};

const treeOfFollowers: FollowerTreeNode = {
  val: new Profile('Peter'),
  children: [
    {
      val: new Profile('Mary'),
      children: [
        {
          val: new Profile('Henry'),
          children: [
            {
              val: new Profile('Viet'),
              children: []
            }
          ]
        }
      ]
    },
    {
      val: new Profile('Tom'),
      children: []
    }
  ]
};

let iterator: IFollowerIterator;
console.log("::: Array Iterator");
iterator = new FolloweArrayIterator(arrFollowers);
sendMessage('hello', iterator);

console.log("::: Linked-List Iterator");
iterator = new FollowerLinkedListIterator(linkedListOfFollowers);
sendMessage('hello', iterator);

console.log("::: Tree Iterator");
iterator = new FollowerTreeStore(treeOfFollowers).iterator();
sendMessage('hello', iterator);