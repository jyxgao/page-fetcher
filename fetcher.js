const request = require('request');
const fs = require('fs');
const readline = require('readline');
const { createBrotliCompress } = require('zlib');

const url = process.argv[2];
const path = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body);


    fs.readFile(path, 'utf8', (err, data) => {
      let content = "";
      if (err) { 
        cb(err) 
      }
      content = cb(null, data)
      console.log(content)

      if (content.length > 0) {
        rl.question("File already exists, type Y to overwrite", (Yes) => {
          if (Yes === "Y"){
            // fetch the body from the request above, write it into path 
            fs.writeFile(path, body, (err) => {
              if (err) {         
                console.log('Failed to write to localPath: ', path);
              } else {
                console.log(`Downloaded and saved ${body.length} bytes to ${path}`); 
              }
            });
            rl.close()
          }
        })
      } else {
        fs.writeFile(path, body, (err) => {
          if (err) {         
            console.log('Failed to write to localPath: ', path);
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ${path}`); 
          }
        })
      }
    })
});


const cb = function(err, data) {
  if (err) { throw err };
  return data;
}