const fs = require("fs");
const processImage = require("./img_process.js");

// Specify the path to the image file you want to process
const imagePath = "./path/to/your/image.jpg";

// Check if the image file exists
fs.access(imagePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("Image file not found.");
    return;
  }

  // Call the processImage function
  processImage(imagePath);
});
