const http = require('http');

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

const port = 3000;
app.listen(port);
console.log(`Server running at http://localhost:${port}/`);