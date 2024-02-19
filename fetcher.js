const net = require('net');
// for network connection
let fs = require('fs');
// for node.fs to create write files
const request = require('request');
// for request
const process = require('process');
// for process.argv

const conn = net.createConnection({
  host: 'example.edu',
  port: 80
});
conn.setEncoding('UTF8');


const fetcher = (URL, localPath) => {

  request(URL, (error, response, body) => {
    // don't need response only body
    if (error) {
      console.error(error);
      return;
    }
    fs.writeFile(localPath, body, err => {
      // only concerned with info from the body text of the webpage
      // follow steps from https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
    });
  
  });
 
};

fetcher(process.argv[2], process.argv[3]);
// uses the input from command line as URL and localPath in function