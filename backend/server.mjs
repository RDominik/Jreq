import http from 'node:http';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url == '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', service: 'jreq-backend' }));
  }
  if (req.url == '/api/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Hello from Jreq API' }));
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, service: 'jreq-backend', path: req.url }));
});
server.listen(port, () => console.log(`[jreq-backend] listening on :${port}`));
