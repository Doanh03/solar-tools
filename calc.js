// Simple rooftop solar estimate. Pure function so it can run in the browser and in Node tests.
// kWh/month = bill / price; kWp = covered kWh / (sun hours x 30 days x performance ratio).
function estimate({ bill, price, sunHours, costPerKwp, coverPct, pr = 0.8 }) {
  if (!(bill > 0 && price > 0 && sunHours > 0)) return null;
  const cover = Math.min(100, Math.max(0, coverPct)) / 100;
  const kwhCovered = (bill / price) * cover;
  const kwp = kwhCovered / (sunHours * 30 * pr);
  const investment = kwp * costPerKwp;
  const yearlySavings = bill * cover * 12;
  const paybackYears = yearlySavings > 0 ? investment / yearlySavings : null;
  return { kwp, investment, yearlySavings, paybackYears, cover };
}

if (typeof module !== 'undefined') module.exports = { estimate };
