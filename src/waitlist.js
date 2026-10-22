
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Waitlist {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(person) {
    const node = new Node(person);

    if (this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  dequeue() {
    if (this.head === null) {
      return null;
    }

    const person = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    this.length--;
    return person;
  }

  peek() {
    return this.head === null ? null : this.head.value;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }
}

module.exports = Waitlist;
