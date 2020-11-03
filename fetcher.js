const request = require('request');
const fs = require('fs')


const args = (process.argv.length > 3) ? process.argv.slice(2) : '';

if (args === '') {
  console.log('No PATH or FILE provided');
  return;
}

const PATH = process.argv.length > 3 ? args[0] : '';
const FILE = process.argv.length > 3 ? args[1] : '';

// Calculate the size of the file saved
function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
}


// initiating request and send it 
// the response body will be written to file provided
// if file exsits will be overriden

request(PATH, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    fs.writeFile(FILE, body, function (err) {
      if (err) {
        console.log(err);
      } else {
        let size = getFilesizeInBytes(FILE);
        console.log(`Downloaded and saved ${size} bytes to .${FILE}.`);
      }

    });
  }
});

