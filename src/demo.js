
const Event = require("./event");
const BookingSystem = require("./booking");

const event = new Event("JavaScript Live", 3);

event.addTicketTier("VIP", 10000, 1);
event.addTicketTier("Regular", 5000, 2);

const system = new BookingSystem(event);

console.log("\n=== EVENT TICKETING DEMO ===");
console.log("Event:", event.name);
console.log("Capacity:", event.capacity);

console.log("\n1. Booking tickets");

const ada = system.createBooking("Ada", "VIP");
const john = system.createBooking("John", "Regular");
const mary = system.createBooking("Mary", "Regular");

console.log("Confirmed:", ada.reference, ada.name);
console.log("Confirmed:", john.reference, john.name);
console.log("Confirmed:", mary.reference, mary.name);

console.log("\n2. Event sells out");

try {
  system.createBooking("Peter", "Regular");
} catch (error) {
  console.log("Booking refused:", error.message);
}

console.log("\n3. Customers join the waitlist");

system.addToWaitlist("Peter", "Regular");
system.addToWaitlist("Grace", "Regular");

console.log("First in line:", system.waitlist.peek().name);
console.log("People waiting:", system.waitlist.size());

console.log("\n4. Cancel a booking");

const result = system.cancelBooking(john.reference);

console.log("Cancelled:", result.cancelled.name);
console.log(
  "Next person confirmed:",
  result.promoted ? result.promoted.name : "Nobody"
);

console.log("New booking reference:",
  result.promoted ? result.promoted.reference : "N/A");

console.log("People still waiting:", system.waitlist.size());

console.log("\n5. Look up a booking");

const found = system.findBooking(ada.reference);

console.log("Lookup:", found.reference, found.name, found.status);

console.log("\n=== DEMO COMPLETE ===");
