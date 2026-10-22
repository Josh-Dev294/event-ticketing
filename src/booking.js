
const Waitlist = require("./waitlist");

class BookingSystem {
  constructor(event) {
    this.event = event;
    this.bookings = new Map();
    this.waitlist = new Waitlist();
    this.nextReference = 1;
  }

  createBooking(name, tierName) {
    if (typeof name !== "string" || !name.trim()) {
      throw new Error("Customer name is required.");
    }
    name = name.trim();

    // Check whether this ticket tier has availability.
    if (this.event.availableTickets(tierName) <= 0) {
      throw new Error("No tickets available for " + tierName + ".");
    }

    const ticket = this.event.bookTicket(tierName);

    const reference =
      "EVT-" + String(this.nextReference++).padStart(4, "0");

    const booking = {
      reference,
      name,
      event: ticket.event,
      tier: ticket.tier,
      price: ticket.price,
      status: "confirmed"
    };

    this.bookings.set(reference, booking);

    return booking;
  }

  addToWaitlist(name, tierName) {
    if (typeof name !== "string" || !name.trim()) {
      throw new Error("Customer name is required.");
    }
    name = name.trim();

    // Validate the requested ticket tier.
    if (!this.event.tiers.has(tierName)) {
      throw new Error("Ticket tier not found.");
    }

    const person = {
      name,
      tierName
    };

    this.waitlist.enqueue(person);

    return person;
  }

  findBooking(reference) {
    return this.bookings.get(reference) || null;
  }

  cancelBooking(reference) {
    const booking = this.findBooking(reference);

    if (!booking) {
      throw new Error("Booking reference not found.");
    }

    if (booking.status !== "confirmed") {
      throw new Error("This booking is already cancelled.");
    }

    this.event.releaseTicket(booking.tier);
    booking.status = "cancelled";

    // Serve only the person at the front of the queue.
    const person = this.waitlist.peek();

    if (
      person &&
      this.event.availableTickets(person.tierName) > 0
    ) {
      this.waitlist.dequeue();

      const newBooking = this.createBooking(
        person.name,
        person.tierName
      );

      return {
        cancelled: booking,
        promoted: newBooking
      };
    }

    return {
      cancelled: booking,
      promoted: null
    };
  }
}

module.exports = BookingSystem;
