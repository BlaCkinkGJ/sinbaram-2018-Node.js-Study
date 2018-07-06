const http = require('http'); 

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let i = 0;
  let result = "";
    for(i = 0; i < 5; i++)
      result += "The number is " + i + "\n";
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})