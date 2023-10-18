const fs = require("fs");
const path = require("path");

// check if ktech command is installed
const { execSync } = require("child_process");
try {
  execSync("ktech --version");
} catch (err) {
  console.error("ktools command not found, please install it first");
  process.exit(1);
}

// check if convert command is installed
try {
  execSync("convert --version");
} catch (err) {
  console.error("imagemagick command not found, please install it first");
  process.exit(1);
}

function getFiles(dir, pattern) {
  const files = fs.readdirSync(dir);
  const result = [];
  for (const file of files) {
    if (file.match(pattern)) {
      result.push(path.join(dir, file));
    }
  }
  return result;
}

const inventoryImagesFiles = getFiles(
  path.join(__dirname, "assets"),
  /inventoryimages(\d+)?\.xml/
);

// read xml files
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
const xmlFiles = inventoryImagesFiles.map((file) => {
  const xml = fs.readFileSync(file, "utf8");
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
});

Promise.all(xmlFiles)
  .then((results) => {
    results.forEach((result) => {
      const texture = result.Atlas.Texture[0];
      console.log(texture.$.filename);

      const texFile = path.join(__dirname, "assets", texture.$.filename);
      const pngFile = path.join(
        __dirname,
        "assets",
        texture.$.filename.replace(".tex", ".png")
      );
      const ktechCommand = `ktech ${texFile} ${pngFile}`;

      if (!fs.existsSync(pngFile)) {
        console.log("convert tex to png");
        console.log(ktechCommand);
        execSync(ktechCommand);
      }

      const elements = result.Atlas.Elements[0].Element;
      elements.forEach((element) => {
        const name = element.$.name;
        const u1 = element.$.u1;
        const v1 = element.$.v1;
        const u2 = element.$.u2;
        const v2 = element.$.v2;

        // make sure the images folder are exists
        const outputDir = path.join(
          __dirname,
          "../dont-starve-airdrop-client/public/inventory"
        );
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir);
        }
        
        // the uv coordinates are in uniform space 0~1. we need to get image size first
        const size = execSync(`identify -format "%wx%h" ${pngFile}`).toString();
        const [width, height] = size.split("x");

        // calculate the pixel coordinates,
        const x1 = Math.round(u1 * width);
        const y1 = Math.round(v1 * height);
        const x2 = Math.round(u2 * width) + 1;
        const y2 = Math.round(v2 * height) + 1;

        // extract image
        const cropFile = path.join(outputDir, name.replace(".tex", ".png"));

        // skip if the image already exists
        if (!fs.existsSync(cropFile)) {
          const convertCommand = `convert ${pngFile} -crop ${x2 - x1}x${
            y2 - y1
          }+${x1 - 1}+${height - y2 + 1} ${cropFile}`;
          console.log(convertCommand);
          execSync(convertCommand);
        }
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
