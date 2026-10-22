
const Waitlist = require("./waitlist");

const waitlist = new Waitlist();

waitlist.enqueue("Ada");
waitlist.enqueue("John");
waitlist.enqueue("Mary");

console.log("First in line:", waitlist.peek());
console.log("Person called:", waitlist.dequeue());
console.log("Next in line:", waitlist.peek());
console.log("People remaining:", waitlist.size());
