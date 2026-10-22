
const Event = require("./event");

const concert = new Event("JavaScript Live", 3);

concert.addTicketTier("VIP", 10000, 1);
concert.addTicketTier("Regular", 5000, 2);

console.log("Event:", concert.name);

console.log("VIP tickets available:",
  concert.availableTickets("VIP"));

console.log("Booking 1:", concert.bookTicket("VIP"));
console.log("Booking 2:", concert.bookTicket("Regular"));
console.log("Booking 3:", concert.bookTicket("Regular"));

console.log("Remaining tickets:",
  concert.availableTickets("Regular"));

try {
  concert.bookTicket("Regular");
} catch (error) {
  console.log("Booking refused:", error.message);
}
