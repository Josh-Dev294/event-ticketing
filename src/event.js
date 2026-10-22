
class Event {
  constructor(name, capacity) {
    if (!name || capacity <= 0) {
      throw new Error("Event name and positive capacity are required.");
    }

    this.name = name;
    this.capacity = capacity;
    this.tiers = new Map();
    this.bookedTickets = 0;
  }

  addTicketTier(name, price, capacity) {
    if (!name || price < 0 || capacity <= 0) {
      throw new Error("Invalid ticket tier details.");
    }

    if (this.tiers.has(name)) {
      throw new Error("This ticket tier already exists.");
    }

    const totalTierCapacity = [...this.tiers.values()]
      .reduce((total, tier) => total + tier.capacity, 0);

    if (totalTierCapacity + capacity > this.capacity) {
      throw new Error("Ticket tiers exceed event capacity.");
    }

    this.tiers.set(name, {
      name,
      price,
      capacity,
      sold: 0
    });
  }

  bookTicket(tierName) {
    const tier = this.tiers.get(tierName);

    if (!tier) {
      throw new Error("Ticket tier not found.");
    }

    if (this.bookedTickets >= this.capacity) {
      throw new Error("Event is sold out.");
    }

    if (tier.sold >= tier.capacity) {
      throw new Error(`${tierName} tickets are sold out.`);
    }

    tier.sold++;
    this.bookedTickets++;

    return {
      event: this.name,
      tier: tier.name,
      price: tier.price
    };
  }

  releaseTicket(tierName) {
    const tier = this.tiers.get(tierName);

    if (!tier || tier.sold === 0) {
      throw new Error("No booked ticket to release.");
    }

    tier.sold--;
    this.bookedTickets--;
  }

  availableTickets(tierName) {
    const tier = this.tiers.get(tierName);

    if (!tier) {
      throw new Error("Ticket tier not found.");
    }

    return Math.min(
      tier.capacity - tier.sold,
      this.capacity - this.bookedTickets
    );
  }
}

module.exports = Event;
