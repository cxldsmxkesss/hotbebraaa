const path = require('path');

module.exports = {
  moduleNameMapper: {
    "\\.css$": path.join(__dirname, "/test/jest/__mocks__/styleMock.js"),
    "\\.(pdf|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": path.join(__dirname, "/test/jest/__mocks__/fileMock.js")
  }
}