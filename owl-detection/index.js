const colorDistance = require("color-difference");
const pallets = require("./pallet");

const compare = (hex) => {
  const matches = [];

  pallets.pallet.forEach((color) => {
    const distance = colorDistance.compare(hex, color.hex);
    matches.push({ distance, color });
  });

  return matches.sort((a, b) => {
    return a.distance - b.distance;
  })[0];
};

module.exports = compare