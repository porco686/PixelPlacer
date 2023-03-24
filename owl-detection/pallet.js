const pallet = {
  red: "#ff0000",
  orange: "#ff8000",
  yellow: "#fffb00",
  yellowishGreen: "#99ff00",
  brightGreen: "#55ff00",
  green: "#00FF00",
  limeGreen: "#09ff00",
  aquaticGreen: "#00ff8c",
  greenishCyan: "#00ffa2",
  cyan: "#00f2ff",
  lightBlue: "#009dff",
  blue: "#006aff",
  darkBlue: "#0800ff",
  purple: "#6200ff",
  brightPurple: "#8800ff",
  pink: "#ff00f2",
  redishPink: "#ff0059",
  pinkishRed: "#ff0033",
  white: "#ffffff",
  black: "#000000",
};

module.exports.objectifiedPallet = pallet;

module.exports.pallet = [
  ...Object.keys(pallet).map((key) => {
    const value = pallet[key];

    return { name: key, hex: value };
  }),
];
