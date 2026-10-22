
const totalBookings = 100000;
const bookingsArray = [];
const bookingsMap = new Map();

// Create 100,000 bookings and store them in both structures.
for (let i = 1; i <= totalBookings; i++) {
  const booking = {
    reference: `EVT-${String(i).padStart(6, "0")}`,
    customer: `Customer ${i}`
  };

  bookingsArray.push(booking);
  bookingsMap.set(booking.reference, booking);
}

// Search for the last booking to make Array.find scan the array.
const targetReference = "EVT-100000";
const repetitions = 1000;

console.log(`Total bookings: ${totalBookings}`);
console.log(`Lookups per test: ${repetitions}`);
console.log("");

// Benchmark Array.find().
console.time("Array.find");

for (let i = 0; i < repetitions; i++) {
  bookingsArray.find(
    booking => booking.reference === targetReference
  );
}

console.timeEnd("Array.find");

// Benchmark Map.get().
console.time("Map.get");

for (let i = 0; i < repetitions; i++) {
  bookingsMap.get(targetReference);
}

console.timeEnd("Map.get");

// Verify that both methods find the same booking.
const arrayResult = bookingsArray.find(
  booking => booking.reference === targetReference
);

const mapResult = bookingsMap.get(targetReference);

console.log("");
console.log("Array result:", arrayResult);
console.log("Map result:", mapResult);
console.log(
  "Results match:",
  arrayResult?.reference === mapResult?.reference
);
