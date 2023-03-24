#!usr/bin/env node

const path = require("path");
const sourcebin = require("sourcebin");
const jimp = require("jimp");
const rgbHex = require("rgb-hex");
const { chunk } = require("lodash");
const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const hexToName = require("./owl-detection");
const figlet = require("figlet");
const chalkRainbow = require("chalk-rainbow");
const { EventEmitter } = require("events");

let width = 0;
const output = [];
const eventRiver = new EventEmitter({ captureRejections: true });

const wallets = {
  btc: "bc1qj90djjnyh7jj56snq0fhz7ju3ty99qr0vrc8wl",
  eth: "0xc8Af52B865c825426D5B8764802A8e6e25B844d8",
  ltc: "LhM96aQGwawGKmZumqMNT5vxMQC4975wLM",
  doge: "DTqRdGTMdWzCbRNaZMEsZcdNX8D9icZ3WL",
};

const PixelPlacerConfig = require("./PixelPlacerConfig.json");

const colorPallet = PixelPlacerConfig["color-pallet"];

const collectImageData = (imageLoc, scale) => {
  return new Promise((resolve, reject) => {
    jimp.read(imageLoc, async (err, image) => {
      if (err) {
        reject(err);
        throw err;
      }

      const scaleType = 0 < scale ? "multiply" : "devide";

      scale = Math.abs(scale) || 1;

      width = Math.floor(
        scaleType === "devide"
          ? image.bitmap.width / scale
          : image.bitmap.width * scale
      );
      const height = Math.floor(
        scaleType === "devide"
          ? image.bitmap.width / scale
          : image.bitmap.width * scale
      );

      image.resize(Math.floor(width), Math.floor(height));

      console.log(
        `${chalk.green(`Collecting Image(${width}/${height}) Data....`)}`
      );

      for (let y = 0; y < height; y++) {
        if (y === height - 1) resolve();
        for (let x = 0; x < width; x++) {
          try {
            const rawcolor = image.getPixelColor(x, y);
            const rgba = jimp.intToRGBA(rawcolor);
            const hex = rgbHex(rgba.r, rgba.g, rgba.b);
            const {
              color: { name },
            } = hexToName(hex);
            output.push(colorPallet[name]);
            !colorPallet[name] ? console.log(name) : 0;
          } catch (e) {
            console.log(chalk.red(`Error at pixel ${x}: \n ${e}`));
          }
        }
      }
    });
  });
};

const renderRealtimeOutput = async (outputName) => {
  if (fs.existsSync(`./${output}.txt`)) fs.unlinkSync(`./${output}.txt`);

  const heightSegments = output.length / width;
  const segments = chunk(output, heightSegments);

  segments.map((segment, segmentIndex) => {
    if (segmentIndex === segment.length - 1) {
      console.log(chalk.green("Done."));
      eventRiver.emit("done");
    }

    segment.map((pixel, index) => {
      if (!fs.existsSync(`./${outputName}.txt`))
        fs.appendFileSync(`./${outputName}.txt`, "");

      const oldText = fs.readFileSync(`./${outputName}.txt`).toString();
      const lineBreak = index === segment.length - 1;
      fs.writeFileSync(
        `./${outputName}.txt`,
        `${oldText}${pixel}${lineBreak ? "\n" : ""}`
      );
    });
  });
};

const renderPrebuiltOutput = (outputName) => {
  let builtOutput = "";

  if (fs.existsSync(`./${outputName}.txt`))
    fs.unlinkSync(`./${outputName}.txt`);

  const heightSegments = output.length / width;
  const segments = chunk(output, heightSegments);

  segments.map((segment, segmentIndex) => {
    segment.map((pixel, index) => {
      if (!fs.existsSync(`./${outputName}.txt`))
        fs.appendFileSync(`./${outputName}.txt`, "");

      fs.writeFileSync(`./${outputName}.txt`, "");

      const lineBreak = index === segment.length - 1;

      builtOutput += `${pixel}${lineBreak ? "\n" : ""}`;
    });

    if (segmentIndex === segments.length - 1) {
      fs.writeFileSync(`./${outputName}.txt`, builtOutput);
      console.log(chalk.green(`Done.`));
      eventRiver.emit("done");
    }
  });
};

const imageFilesChoices = fs
  .readdirSync("./")
  .filter((e) => ["png", "jpg", "jpeg", "jfif"].includes(e.split(".")[1]))
  .map((file) => {
    return { name: file, value: file };
  });

const options = inquirer.prompt([
  {
    name: "image",
    choices: imageFilesChoices,
    type: "rawlist",
    required: true,
  },
  {
    name: "scale",
    type: "input",
    validate: (input) => {
      const isNumber = Number(input);

      return isNumber ? true : false;
    },
    required: true,
  },
  {
    name: "output Name",
    type: "input",
    validate: (name) => name.length > 1,
  },
]);

const formatFile = (image) => {
  const splittedPath = image.split("\\");
  const fileName = splittedPath[splittedPath.length - 1];
  const jpgFileName = path.join(__dirname, `${fileName.split(".")[0]}.jpg`);
  if (fs.existsSync(image)) fs.renameSync(image, jpgFileName);
  return jpgFileName;
};

const onDone = async (outputName) => {
  const donateMe = () => {
    console.log(`
${chalk.white(chalk.bold("Donate To Me:"))}
- BTC: ${chalk.yellow(wallets.btc)}
- ETH: ${chalk.blueBright(wallets.eth)}
- LTC: ${chalk.grey(wallets.ltc)}
- DOGE: ${chalk.yellowBright(wallets.doge)}

Thank You For Using My Tool!
   `);
  };

  figlet("Enjoy !", (err, data) => {
    if (err) throw err;
    console.log(chalkRainbow(data));
    donateMe();
  });

  setTimeout(() => {
    process.exit(0);
  }, 15000);
};

options.then((data) => {
  let image = path.join(__dirname, `./${data.image}`);
  if (!fs.existsSync(image)) console.log(chalk.red("Image Error"));
  const scale = data.scale;
  const outputName = data["output Name"];
  console.log(
    `${chalk.green(
      "Process Awake"
    )}, image: ${image}, scale: ${scale}, output: ${outputName}`
  );

  image = formatFile(image);

  collectImageData(image, scale).then(() => {
    if (PixelPlacerConfig["build-type"] === "realtime-build") {
      renderRealtimeOutput(outputName);
    } else if (PixelPlacerConfig["build-type"] === "pre-build") {
      renderPrebuiltOutput(outputName);
    } else {
      renderPrebuiltOutput(outputName);
    }
  });

  if (!PixelPlacerConfig["auto-close"]) {
    setTimeout(() => {
      onDone(outputName);
    }, require("ms")(PixelPlacerConfig.timeout));
  } else {
    eventRiver.on("done", () => onDone(outputName));
  }
});
