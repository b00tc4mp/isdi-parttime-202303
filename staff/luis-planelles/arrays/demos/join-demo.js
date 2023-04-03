//
const elements = ["Fire", "Air", "Water"];

console.log(join(elements));
// Expected output: "Fire,Air,Water"

console.log(join(elements, ""));
// Expected output: "FireAirWater"

console.log(join(elements, "-"));
// Expected output: "Fire-Air-Water"
