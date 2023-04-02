console.log(join(['Fire', 'Air', 'Water']));
// Expected output: "Fire,Air,Water"

console.log(join(['Fire', 'Air', 'Water'], ''));
// Expected output: "FireAirWater"

console.log(join(['Fire', 'Air', 'Water'], '-'));
// Expected output: "Fire-Air-Water"

console.log(join(['Fire']));
// Expected output: "Firer"