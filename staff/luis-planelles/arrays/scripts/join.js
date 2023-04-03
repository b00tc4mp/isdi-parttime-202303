//
const join = (elements, slitItem = ",") => {
  let resultString = "";

  for (let i = 0; i < elements.length; i++) {
    if (i > 0) {
      resultString += slitItem;
    }
    resultString += elements[i];
  }
  return resultString;
};

const elements = ["Fire", "Air", "Water"];

console.log(join(elements));
// Expected output: "Fire,Air,Water"

console.log(join(elements, ""));
// Expected output: "FireAirWater"

console.log(join(elements, "-"));
// Expected output: "Fire-Air-Water"
