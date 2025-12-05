<h1>Node JS</h1>

<h6>Table of Contents</h6>

- [What is NodeJS](#what-is-nodejs)

# What is NodeJS

https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

- JavaScript was designed to run only in browsers.
- NodeJS is a **asynchronous event driven runtime** that allows us to build server-side applications.

```js
import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
