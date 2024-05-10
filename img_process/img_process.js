const cv = require("opencv4nodejs");
function imgProcess(imagePath) {
  // Load the pre-trained face detection model
  const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT);

  // Read the image
  const image = cv.imread(imagePath);

  // Convert the image to grayscale
  const grayImage = image.bgrToGray();

  // Detect faces in the image
  const faces = classifier.detectMultiScale(grayImage).objects;

  // Check if a human face is detected
  if (faces.length > 0) {
    // Shadow all detected faces
    for (const face of faces) {
      const { x, y, width, height } = face;
      const rectColor = new cv.Vec(0, 0, 0); // Black color
      image.drawRectangle(
        new cv.Point2(x, y),
        new cv.Point2(x + width, y + height),
        rectColor,
        -1
      );
    }
  }

  // Save the processed image
  const processedImagePath = imagePath.replace(/\.[^.]+$/, "_processed1$&");
  cv.imwrite(processedImagePath, image);

  console.log("Image processed successfully.");
}

// Define the processImage function
function processImage(imagePath) {
  // Load the image using OpenCV
  const src = cv.imread(imagePath);

  // Convert the image to grayscale for face detection
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // Load the pre-trained face detection model
  const faceCascade = new cv.CascadeClassifier();
  faceCascade.load("haarcascade_frontalface_default.xml");

  // Detect faces in the image
  const faces = new cv.RectVector();
  const faceSize = new cv.Size(0, 0);
  faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, faceSize, faceSize);

  // Check if a human face is detected
  if (faces.size() > 0) {
    // Shadow all detected faces
    for (let i = 0; i < faces.size(); i++) {
      const face = faces.get(i);
      const { x, y, width, height } = face;
      cv.rectangle(
        src,
        new cv.Point(x, y),
        new cv.Point(x + width, y + height),
        [0, 0, 0, 255],
        -1
      );
    }
  }

  // Save the processed image
  const processedImagePath = imagePath.replace(/\.[^.]+$/, "_processed0$&");
  cv.imwrite(processedImagePath, src);

  // Clean up memory
  src.delete();
  gray.delete();
  faceCascade.delete();
  faces.delete();

  console.log("Image processed successfully.");
}

// Export the processImage function
module.exports = { processImage, imgProcess };
