class Editor {
  constructor(private content: string) { }

  typeMore(s: string) {
    this.content += s;
  }

  getContent(): string { return this.content; }
  save(): Memento { return { content: this.content }; }
  restore(m: Memento) { this.content = m.content; }
}

type Memento = {
  content: string;
};

class CareTaker {
  mementos: Memento[] = [];

  add(m: Memento): void {
    this.mementos.push(m);
  }

  size(): number { return this.mementos.length; }

  restore(editor: Editor, idx: number) { editor.restore(this.mementos[idx]); }
}

const editor = new Editor('');
const careTaker = new CareTaker();

editor.typeMore("hello");
editor.typeMore(" world");

console.log(':::: First content:', editor.getContent());

careTaker.add(editor.save());

editor.typeMore(". I am Memento");

careTaker.add(editor.save());

editor.typeMore(", a design pattern lets you save and ");
editor.typeMore("restore the previous state");

for (let i = 0; i < careTaker.size(); i++) {
  careTaker.restore(editor, i);
  console.log(`:::: Restore at idx = ${i}:`, editor.getContent());
}